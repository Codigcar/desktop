//
//  LoginViewViewModel.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 7/31/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver
import UIKit

class LoginViewViewModel: ObservableObject {
    
    @Published var dni = ""
    
    @Published var password = ""
    
    @Published var name = ""
    
    @Published var lastName = ""
    
    @Published var email = ""
    
    @Published var phoneNumber = ""
    
    @Published var valCode = ""
    
    @Published var termsAceppted = false
    
    @Published var index = 1
    
    @Published var isLoading = false
    
    @Published var validationRequested = false
    
    @Published var isCodeValid = false
    
    @Published var shouldShowAlert = false
    
    @Published var isLoginButtonEnabled = false
    
    @Published var isRegisterButtonEnabled = false
    
    @Published var isValidationButtonEnabled = false
    
    @Published var isRecoverButtonEnabled = false
    
    @Published var isShowingEmptyFieldsAlert = false
        
    @Injected private var authManager: AuthManager
    
    private var subscriptions = Set<AnyCancellable>()
    
    private var isDNIValidPublisher: AnyPublisher<Bool, Never> {
        self.$dni.map { $0.count != 0  }
            .eraseToAnyPublisher()
    }
    
    private var isPhoneNumberValidPublisher: AnyPublisher<Bool, Never> {
        self.$phoneNumber.map { $0.count == 9  }
            .eraseToAnyPublisher()
    }
    
    private var isValidationCodeValidPublisher: AnyPublisher<Bool, Never> {
        self.$valCode.map { $0.count == 6  }
            .eraseToAnyPublisher()
    }
    
    private var isEmailValidPublisher: AnyPublisher<Bool, Never> {
        self.$email.map { (str) -> Bool in
            let regex = try! NSRegularExpression(pattern: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$", options: .caseInsensitive)
            return regex.firstMatch(in: str, options: [], range: NSRange(location: 0, length: str.count)) != nil
        }
        .eraseToAnyPublisher()
    }
    
    private var actionButtonCancellable: AnyCancellable?
    
    var message = ""
    
    init() {
        self.$index.sink { [weak self] (index) in
            if index < 2 {
                self?.cleanData()
            }
        }
        .store(in: &self.subscriptions)
        
        self.authManager.$error
            .receive(on: RunLoop.main)
            .sink { [weak self] (err) in
                if let error = err as? NetworkAPIClient.ClientError {
                    if case NetworkAPIClient.ClientError.requestFailed(let message) = error {
                        self?.message = message
                    } else {
                        self?.message = error.localizedDescription
                    }
                    self?.shouldShowAlert = true
                }
        }
        .store(in: &self.subscriptions)
        
        self.authManager.$message.sink { [weak self] (message) in
            guard let mess = message else { return }
            self?.message = mess
            self?.shouldShowAlert = true
        }
        .store(in: &self.subscriptions)
        
        self.authManager.$isLoading
            .receive(on: RunLoop.main)
            .sink { [weak self] (loading) in
            self?.isLoading = loading
        }
        .store(in: &self.subscriptions)
        
        isDNIValidPublisher.sink { [weak self] (val) in
            self?.isLoginButtonEnabled = val
        }
        .store(in: &self.subscriptions)
        
        isDNIValidPublisher
            .combineLatest(isEmailValidPublisher, $termsAceppted)
            .map { $0 && $1 && $2 }
            .eraseToAnyPublisher()
            .sink(receiveValue: { [weak self] (val) in
                self?.isRegisterButtonEnabled = val
            })
            .store(in: &self.subscriptions)
        
        isPhoneNumberValidPublisher.sink { [weak self] (val) in
            if self?.validationRequested == false {
            self?.isValidationButtonEnabled = val
            }
        }
        .store(in: &self.subscriptions)
        
        isValidationCodeValidPublisher.sink { [weak self] (val) in
            if self?.validationRequested  == true {
                self?.isValidationButtonEnabled = val
            }
        }
        .store(in: &self.subscriptions)
        
        self.isEmailValidPublisher.sink { [weak self] (val) in
            self?.isRecoverButtonEnabled = val
        }
        .store(in: &self.subscriptions)
    }
    
    func login() {
        UIApplication.shared.endEditing()
        
        if self.dni.count > 0 && self.password.count > 0 {
            authManager.login(id: self.dni, password: self.password)
        } else {
            let generator = UINotificationFeedbackGenerator()
            
            generator.prepare()
            
            generator.notificationOccurred(.warning)
            
            self.isShowingEmptyFieldsAlert = true 
        }
    }
    
    func register() {
        self.index = 3
    }
    
    func requestNewPassword() {
        self.authManager.recoverPassowrd(for: self.email)
        self.cleanData()
    }
    
    func getValidationCode() {
        self.isLoading.toggle()
        self.authManager.validatePhone(self.phoneNumber).sink(receiveCompletion: { (completion) in
            print ("\(LoginViewViewModel.self) - \(#function) completion \(completion)")
        }) { [weak self] (_) in
            self?.validationRequested.toggle()
            self?.isLoading.toggle()
        }
        .store(in: &self.subscriptions)
    }
    
    func sendVerificationCode() {
        let user = User.Shortened(id: self.dni, name: self.name, lastName: self.lastName, phone: self.phoneNumber, email: self.email, password: self.password)
        self.authManager.sendValidationCode(for: user, with: self.valCode)
    }
    
    func cleanData() {
        self.dni = ""
        self.password = ""
        self.name = ""
        self.lastName = ""
        self.email = ""
    }
    
}
