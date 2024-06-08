//
//  AuthManager.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/17/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

enum AuthStatus {
    case unknown
    case authenticated
    case notAuthenticated
}

enum AuthError: Error {
    case couldNotLoadCurrentUser
}

struct Token: Codable {
    let val: String
    let expirationDate: Date
}

final class AuthTokenManager: Codable {
    private(set) var accessToken: Token?
    private(set) var refreshToken: Token?

    init() {
        restore()
    }
    
    func invalidate() {
        self.accessToken = nil
        self.refreshToken = nil
        UserDefaults.standard.removeObject(forKey: "accessToken")
        UserDefaults.standard.removeObject(forKey: "pronostikLink")
    }
    
    func setActive(accessToken: Token, refreshToken: Token) {
        self.accessToken = accessToken
        self.refreshToken = refreshToken
        
        let dic = self.dictionary()
        UserDefaults.standard.setValue(dic, forKey: "accessToken")
    }
    
    private func restore() {
        guard let dic = UserDefaults.standard.object(forKey: "accessToken") as? [String: Any], let authToken = AuthTokenManager(dictionary: dic) else { return }
        self.accessToken = authToken.accessToken
        self.refreshToken = authToken.refreshToken
    }
}

class AuthManager {
    @Published var status = AuthStatus.unknown
       
    @Published var currentUser: User?
    
    @Published var error: Error?
    
    @Published var message: String?
    
    @Published var isLoading = false
    
    @Injected private var authTokenManager: AuthTokenManager
    
    @Injected var requestManager: RequestManager
    
    private let localNotificationManager = LocalNotificationManager()
    
    private var subscriptions = Set<AnyCancellable>()
    
    init() {
        self.recoverAuthTokenState()
    }
    
    func recoverAuthTokenState() {
        if let accessToken = self.authTokenManager.accessToken, let refreshToken = self.authTokenManager.refreshToken {
            let distance = Date().distance(to: accessToken.expirationDate)
            if distance < 60*60*24 {
                self.refreshAuthToken(with: accessToken, refreshToken: refreshToken)
            } else {
                self.updateAuthStatus()
            }
        } else {
            self.handleLoggedOutUser()
        }
    }
    
    func refreshAuthToken(with accessToken: Token, refreshToken: Token) {
        requestManager.refresh(accessToken: accessToken, refreshToken: refreshToken)
            .receive(on: RunLoop.main)
            .sink { [weak self] (completion) in
            print ("\(AuthManager.self) - \(#function) completion: \(completion)")
            if case .failure(let error) = completion {
                self?.error = error
                self?.handleLoggedOutUser()
            }
        } receiveValue: { [weak self] (_) in
            self?.updateAuthStatus()
        }
        .store(in: &self.subscriptions)
    }
    
    func updateAuthStatus() {
        if let dic = UserDefaults.standard.object(forKey: "loggedInUser") as? [String: Any], let user = User(dictionary: dic) {
            self.currentUser = user
            self.status = .authenticated
        } else {
            self.status = .notAuthenticated
        }
    }
    
    func login(id: String, password: String) {
        self.isLoading = true
        self.requestManager.login(id: id, pass: password)
            .receive(on: RunLoop.main)
            .sink(receiveCompletion: { [weak self] (completion) in
                print ("\(AuthManager.self) - \(#function) completion: \(completion)")
                if case .failure(let error) = completion {
                    self?.error = error
                }
            self?.isLoading = false
        }) {  [weak self] (user) in
            self?.handle(user: user)
        }
        .store(in: &self.subscriptions)
    }
    
    func logout() {
        self.isLoading = true
        
        requestManager.logout(id: self.currentUser?.userCode ?? "")
            .receive(on: RunLoop.main)
            .sink { [weak self] (completion) in
            print ("\(AuthManager.self) - \(#function) completion: \(completion)")
            if case .failure(let error) = completion {
                self?.error = error
            }
            self?.isLoading = false
            
        } receiveValue: {(_) in
            self.handleLoggedOutUser()

        }
        .store(in: &self.subscriptions)
    }
    
    private func handleLoggedOutUser() {
        UserDefaults.standard.removeObject(forKey: "loggedInUser")
        
        if let id = self.currentUser?.id {
            let notId = String(id)
            self.localNotificationManager.removeScheduledNotification(with: notId)
        }
        
        self.status = .notAuthenticated
        
        self.currentUser = nil
        
        self.authTokenManager.invalidate()
    }
    
    func validatePhone(_ phone: Phone) -> AnyPublisher<Void, Error> {
        self.requestManager.verifyPhoneNumber(phone).receive(on: RunLoop.main).eraseToAnyPublisher()
    }
    
    private func signup(user: User.Shortened) {
        self.isLoading.toggle()
        self.requestManager.signUp(with: user)
            .receive(on: RunLoop.main)
            .sink(receiveCompletion: { [weak self] (completion) in
                print ("\(AuthManager.self) - \(#function) completion \(completion)")
                if case .failure(let error) = completion {
                    self?.error = error
                }
                self?.isLoading.toggle()
            }) { [weak self] (user) in
                self?.handle(user: user)
        }
        .store(in: &self.subscriptions)

    }
    
    func sendValidationCode(for user: User.Shortened, with code: VerificationCode) {
        self.isLoading.toggle()
        self.requestManager.sendVerificationCode(for: user.phone, with: code)
            .receive(on: RunLoop.main)
            .sink(receiveCompletion: { [weak self] (completion) in
                print ("\(AuthManager.self) - \(#function) completion \(completion)")
                if case .failure(let error) = completion {
                    self?.error = error
                }
                self?.isLoading.toggle()
            }) { [weak self] (_) in
                print("Successfully authenticated number \(user.phone)")
                self?.signup(user: user)
        }
        .store(in: &self.subscriptions)
    }
    
    func recoverPassowrd(for email: String) {
        self.isLoading.toggle()
        self.requestManager.recoverPassword(for: email)
            .receive(on: RunLoop.main)
            .sink(receiveCompletion: { [weak self] (completion) in
                print ("\(AuthManager.self) - \(#function) completion \(completion)")
                self?.isLoading.toggle()
        }) { () in
            self.message = "Se envió correo con nueva contraseña"
        }
        .store(in: &self.subscriptions)
    }
    
    func handle(user: User) {
        self.currentUser = user
        UserDefaults.standard.set(user.dictionary()!, forKey: "loggedInUser")
        self.status = .authenticated
        print ("\(AuthManager.self) - \(#function) successfully logged in user \(user.fullName)")
        
        guard let birthdate = user.birthDate else { return }
        
        let day = Calendar.current.component(.day, from: birthdate)
        
        let month = Calendar.current.component(.month, from: birthdate)
        
        guard let greetingsDay = Calendar.current.date(from: DateComponents(month: month, day: day, hour: 12)) else { return }
        
        let id = user.id != nil ? String(user.id!) : UUID().uuidString
        
        let diff = Date().distance(to: greetingsDay)
        print("Fecha de cumple: ", day, "/", month)
        if diff > 0 {
            localNotificationManager.scheduleNotification(with: id, title: "¡Feliz Cumpleaños!", message: "\(user.firstName), te deseamos un feliz cumpleaños de parte de todo el equipo de La Protectora.", timeInterval: diff).sink { (completion) in
                print("Couldn't schedule birthday notiifcation")
            } receiveValue: { (_) in
                print("Successfully scheduled birthday notification")
            }
            .store(in: &self.subscriptions)
        }
    }
    
    func updateUserLocal(with address: User.Address, phones: [String], cellphone: String, email: String) {
        self.currentUser?.address = address
        self.currentUser?.phones = phones
        self.currentUser?.cellPhone = cellphone
        self.currentUser?.email = email
        guard let u = self.currentUser else { return }
        UserDefaults.standard.set(u.dictionary()!, forKey: "loggedInUser")
        
    }
    
    func updateUser(with data: [String: Any]) -> AnyPublisher<Void, Error> {
        self.requestManager.updateUser(with: data).receive(on: RunLoop.main).eraseToAnyPublisher()
    }
    
    func updatePassword(documentNumber: String, currentPassword: String, newPassword: String) -> AnyPublisher<Void, Error> {
        self.requestManager.updatePassword(documentNumber: documentNumber, currentPassword: currentPassword, newPassword: newPassword).receive(on: RunLoop.main).eraseToAnyPublisher()
    }
}

