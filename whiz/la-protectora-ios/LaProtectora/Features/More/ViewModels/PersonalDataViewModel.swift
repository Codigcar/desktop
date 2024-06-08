//
//  ViewModels.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/31/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver
import SwiftUI

class PersonalDataViewModel: ObservableObject {
    @Published var selectedItem = 0
    @Published var department: UbigeoData?
    @Published var province: UbigeoData?
    @Published var district: UbigeoData?
    @Published var address = ""
    @Published var homePhone = ""
    @Published var newPassword = ""
    @Published var currentPassword = ""
    @Published var passwordConfirmation = ""
    @Published var canEdit = false
    @Published var firstName = ""
    @Published var lastName = ""
    @Published var businessUnitName = ""
    @Published var cellPhone = ""
    @Published var userType = ""
    @Published var dni = ""
    @Published var birthDate = ""
    @Published var email = ""
    @Published var businessUnitId = 1
    
    @Published var departments = [UbigeoData]()
    @Published var provinces = [UbigeoData]()
    @Published var districts = [UbigeoData]()
    @Published var isLoading = false
    @Published var isKeyobardOpen = false
    
    @Published var showPasswordAlert = false
    @Published var showDataAlert = false
    
    @Injected var auth: AuthManager
    @Injected var getUbigeoData: GetUbigeoDataUseCase
    
    @Published var isActionButtonDisabled = false
    
    var alertTitle: String = ""
    var alertMessage: String = ""
    
    var isActionButtonDisabledPublisher: AnyPublisher<Bool, Never> {
        Publishers.CombineLatest4(self.$newPassword, self.$passwordConfirmation, self.$province, self.$district)
            .map({ (pass, confirm, province, district) -> Bool in
                let validation = (pass != "" || confirm != "") ? !(pass == confirm && province != nil && district != nil) : !(province != nil && district != nil)

                return validation
            })
            .eraseToAnyPublisher()
    }
    
    private var subscriptions = Set<AnyCancellable>()
    
    init() {
        self.prepareUbigeoObservers()
        self.setupUserData()
        self.getDepartments()
        
        Publishers.Merge(
            NotificationCenter.default
                .publisher(for: UIResponder.keyboardWillShowNotification)
                .map { _ in true },
            NotificationCenter.default
                .publisher(for: UIResponder.keyboardWillHideNotification)
                .map { _ in false }
        )
            .eraseToAnyPublisher()
            .sink { [weak self] (val) in
                self?.isKeyobardOpen = val
        }
        .store(in: &self.subscriptions)
        
        self.isActionButtonDisabledPublisher.sink { [weak self] (val) in
            self?.isActionButtonDisabled = val
        }
        .store(in: &self.subscriptions)
    }
    
    func setupUserData() {
        self.auth.$currentUser.sink { [weak self] (u) in
            guard let user = u, let address = user.address else { return }
            self?.department = UbigeoData(codigo: address.departmentId, descrip: address.department)
            self?.province = UbigeoData(codigo: address.departmentId + address.provinceId, descrip: address.province)
            self?.district = UbigeoData(codigo: address.departmentId + address.provinceId + address.districtId, descrip: address.district)

            self?.address = address.street
            if let phones = user.phones, phones.count > 0 {
                let phone = phones[0]
                self?.homePhone = phone
            }
            
            if let bu = user.businessUnit {
                self?.canEdit = bu.id == 1
                self?.businessUnitName = bu.name ?? ""
                self?.businessUnitId = bu.id
            }
            
            self?.firstName = user.firstName
            self?.lastName = user.middleName + user.lastName
            self?.email = user.email
            self?.dni = user.document?.number ?? ""
            self?.userType = user.type.rawValue
            self?.cellPhone = user.cellPhone ?? ""
            
            guard let date = user.birthDate else { return }
            let formatter = DateFormatter()
            formatter.dateFormat = "MM/dd/yyyy"
            self?.birthDate = formatter.string(from: date)
        }
        .store(in: &self.subscriptions)
    }
    
    func prepareUbigeoObservers() {
        self.$department.sink { [weak self] (data) in
            guard let d = data else { return }
            self?.province = nil
            self?.district = nil
            self?.getProvinces(for: d.codigo)
        }
        .store(in: &self.subscriptions)
        
        self.$province.sink { [weak self] (data) in
            guard let d = data else { return }
            self?.district = nil
            self?.getDistricts(for: d.codigo)
        }
        .store(in: &self.subscriptions)
    }
    
    func getDepartments() {
        self.getUbigeoData.getDepartments().sink(receiveCompletion: { (completion) in
            print("\(PersonalDataViewModel.self) \(#function) completion: \(completion)")
        }) { (data) in
            var result = data
            result.removeAll { (val) -> Bool in
                val.descrip.contains("[")
            }
            self.departments = result
        }
        .store(in: &self.subscriptions)
    }
    
    func getProvinces(for code: String) {
        self.getUbigeoData.getProvinces(for: code).sink(receiveCompletion: { (completion) in
            print("\(PersonalDataViewModel.self) \(#function) completion: \(completion)")
        }) { (data) in
            var result = data
            result.removeAll { (val) -> Bool in
                val.descrip.contains("[")
            }
            self.provinces = result
        }
        .store(in: &self.subscriptions)
    }
    
    func getDistricts(for code: String) {
        self.getUbigeoData.getDistricts(for: code).sink(receiveCompletion: { (completion) in
            print("\(PersonalDataViewModel.self) \(#function) completion: \(completion)")
        }) { (data) in
            var result = data
            result.removeAll { (val) -> Bool in
                val.descrip.contains("[")
            }
            self.districts = result
        }
        .store(in: &self.subscriptions)
    }
    
    func updateUserData() {
        UIApplication.shared.endEditing()
        guard let user = self.auth.currentUser, let id = user.id else { return }
        self.isLoading = true
        let departmentCode = self.department?.codigo ?? ""
        let provinceCode = self.province?.codigo.dropFirst(2) ?? ""
        let districtCode = self.district?.codigo.dropFirst(4) ?? ""
        var birthdateString = ""
        
        if let date = self.auth.currentUser?.birthDate {
            let dateFormatter = DateFormatter()
            dateFormatter.dateStyle = .short
            dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
            dateFormatter.locale = Locale(identifier: "en_US_POSIX")
            dateFormatter.timeZone = TimeZone(abbreviation: "UTC-05")
            birthdateString = dateFormatter.string(from: date)
        }
        
        let data: [String: Any] =
            [ "DEPARTAMENTO": departmentCode,
              "PROVINCIA": String(provinceCode),
              "DISTRITO": String(districtCode),
              "DIRECCION": self.address,
              "TELEFONO": self.homePhone,
              "CELULAR": self.cellPhone,
              "EMAIL": self.email,
              "FECHA_NACIMIENTO": birthdateString,
              "COD_CLIENTE": String(id)]
        
        let address = User.Address(department: self.department?.descrip ?? "", departmentId: departmentCode, province: self.province?.descrip ?? "", provinceId: String(provinceCode), district: self.district?.descrip ?? "", districtId: String(districtCode), street: self.address)
        
        self.auth.updateUser(with: data).sink(receiveCompletion: { [weak self] (completion) in
            print("\(PersonalDataViewModel.self) \(#function) completion \(completion)")
            self?.isLoading = false
            if case .failure(let error) = completion {
                if case NetworkAPIClient.ClientError.requestFailed(message: let message) = error {
                    self?.alertTitle = "Actualización Exitosa"
                    self?.alertMessage = message
                    self?.auth.updateUserLocal(with: address, phones: [self?.homePhone ?? ""], cellphone: self?.cellPhone ?? "", email: self?.email ?? "")
                } else {
                    self?.alertTitle = "Error"
                    self?.alertMessage = error.localizedDescription
                }
                self?.showDataAlert = true
            }
        }) { (_) in
        }
        .store(in: &self.subscriptions)
        
        if self.newPassword != "" && self.passwordConfirmation != "" && self.currentPassword != "", let documentNumber = user.document?.number {
            self.isLoading = true
            self.auth.updatePassword(documentNumber: documentNumber, currentPassword: currentPassword, newPassword: newPassword).sink(receiveCompletion: { [weak self] (completion) in
                print("\(PersonalDataViewModel.self) \(#function) completion \(completion)")
                self?.isLoading = false
                self?.passwordConfirmation = ""
                self?.currentPassword = ""
                self?.newPassword = ""
                
                if case .failure(let error) = completion {
                    self?.alertTitle = "Error"
                    self?.alertMessage = error.localizedDescription
                    self?.showPasswordAlert = true
                }
                
            }) { [weak self] (_) in
                self?.alertTitle = "Actualización Exitosa"
                self?.alertMessage = "Contraseña actualizada con éxito."
                self?.showPasswordAlert = true
            }
            .store(in: &self.subscriptions)
        }
    }
}
