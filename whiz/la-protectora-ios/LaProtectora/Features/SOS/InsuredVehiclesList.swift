//
//  VehicularAccidentView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/4/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI
import Combine
import Resolver

class InsuredVehicleListModel: ObservableObject {
    
    @Published var vehicles = [InsuredVehicle]()
    
    @Published var isLoading = false
    
    @Injected private var getInsuredVehiclesInteractor: GetInsuredVehiclesListUseCase
    
    @Injected private var auth: AuthManager
    
    private var subscriptions = Set<AnyCancellable>()
    
    init() {
        self.auth.$currentUser
            .filter { $0 != nil }
            .sink { [weak self] (user) in
                guard let id = user?.id else { return }
                self?.getInsuredVehicles(for: String(id))
        }
        .store(in: &self.subscriptions)
    }
    
    deinit {
        self.subscriptions.removeAll()
    }
    
    func getInsuredVehicles(for userId: UserID) {
        self.isLoading.toggle()
        
        getInsuredVehiclesInteractor.execute(for: userId).sink(receiveCompletion: { (completion) in
            print("\(InsuredVehicleListModel.self) \(#function) completion: ", completion)
            self.isLoading.toggle()
        }) { [weak self] (values) in
            self?.vehicles = values
        }
        .store(in: &self.subscriptions)
    }
}

struct InsuredVehiclesList: View {
    @ObservedObject var model: InsuredVehicleListModel
    
    @State var selectedItem: Int?
    
    var titles = ["ART-567", "AUR-512", "AAB-245"]
    
    var insurances = ["rimac_logo", "positiva_logo", "mapfre_logo"]
    
    var body: some View {
        VStack {
            HeaderView(title: "Siniestro Vehicular")
            VStack(spacing: 16) {
                
                if self.model.isLoading {
                    WhiteLoader()
                } else if !self.model.isLoading && self.model.vehicles.count > 0 {
                    ForEach(0 ..< model.vehicles.count) { (index)  in
                        NavigationLink(destination: LazyLoadedView(SiniestroVehicularView(model: SiniestroVehicularViewModel(vehiclePlate: self.model.vehicles[index].plate, ciaPhoneNumber: self.model.vehicles[index].insuranceCompany.phoneNumber))), tag: index, selection: self.$selectedItem) {
                            FloatingRow(imageName: "vehicle_image", title: self.model.vehicles[index].plate, description: nil, remoteLogoUrl: self.model.vehicles[index].insuranceCompany.logoUrl, type: .disclosure)
                        }
                        .buttonStyle(PlainButtonStyle())
                    }
                } else {
                    ZStack {
                        Color.white
                        
                        Text("No se encontraron vehículos registrados.")
                    }
                }
            }
            
            Spacer()
        }
        .LPNavigationBar(showsLogo: false)
        .navigationBarTitle(self.selectedItem != nil ? " " : "S.O.S", displayMode: .inline)

    }
}

struct VehicularAccidentView_Previews: PreviewProvider {
    static var previews: some View {
        InsuredVehiclesList(model: InsuredVehicleListModel())
    }
}

class SiniestroVehicularViewModel: ObservableObject {
    @Published var siniestros = [SiniestroType]()
    
    @Published var isLoading = false
    
    @Published var isRegistering = false
    
    @Published var showsAlertMessage = false
    
    var alertTitle = ""
    
    var alertMessage = ""
    
    var canCallCia = false
    
    @Injected private var interactor: GetSiniestroTypeListUseCase
    
    @Injected private var registrationInteractor: RegisterSinisterUseCase
    
    @Injected private var auth: AuthManager
    
    private var currentUserId: String = ""
    
    private var subscriptions = Set<AnyCancellable>()
    
    let vehiclePlate: String
    
    let ciaPhoneNumber: String?
    
    init(vehiclePlate: String, ciaPhoneNumber: String?) {
        self.vehiclePlate = vehiclePlate
        self.ciaPhoneNumber = ciaPhoneNumber
        
        self.auth.$currentUser.sink { (user) in
            guard let u = user, let id = u.id else { return }
            self.currentUserId = String(id)
        }
        .store(in: &self.subscriptions)
    }
    
    deinit {
        self.subscriptions.removeAll()
    }
    
    func getSiniestroTypeList() {
        self.isLoading.toggle()
        self.interactor.execute().sink(receiveCompletion: { (completion) in
            print("\(SiniestroVehicularViewModel.self) - \(#function) completion: ", completion)
            self.isLoading.toggle()
        }) { (values) in
            self.siniestros = values
        }
        .store(in: &self.subscriptions)
    }
    
    func registerSinister(with id: String) {
        self.isRegistering = true
        self.canCallCia = true
        self.registrationInteractor.execute(clientId: self.currentUserId, sinisterTypeId: id, vehiclePlate: self.vehiclePlate).sink(receiveCompletion: { [weak self] (completion) in
            print("\(SiniestroVehicularViewModel.self) - \(#function) completion: ", completion)
            
            if case .failure(let error) = completion {
                self?.isRegistering = false
                self?.alertMessage = error.localizedDescription
                self?.alertTitle = "Error"
                self?.showsAlertMessage = true
            }
        }) { (result) in
            self.isRegistering = false
            self.alertMessage = result.transaction_message
            self.alertTitle = "Registro exitoso"
            self.showsAlertMessage = true
            self.canCallCia = true
        }
        .store(in: &self.subscriptions)
        
        self.checkForCall()
    }
    
    func checkForCall() {
        guard let number = self.ciaPhoneNumber, let url = URL(string: "tel://\(number)"),
            UIApplication.shared.canOpenURL(url) else { return }
        UIApplication.shared.open(url)
    }
}

struct SiniestroVehicularView: View {
    @ObservedObject var model: SiniestroVehicularViewModel
    
    var body: some View {
        ZStack {
            VStack {
                HeaderView(title: self.model.vehiclePlate)
                VStack(spacing: 16) {
                    if self.model.isLoading {
                        WhiteLoader()
                    } else if !self.model.isLoading && self.model.siniestros.count > 0 {
                        ForEach(0 ..< self.model.siniestros.count) { (index)  in
                            FloatingRow(remoteImageUrl: self.model.siniestros[index].imageUrl, title: self.model.siniestros[index].name, type: .call)
                                .onTapGesture {
                                    self.model.registerSinister(with: self.model.siniestros[index].id)
                            }
                        }
                        
                    } else {
                        ZStack {
                            Color.white
                            
                            Text("No se encontraron resultados.")
                        }
                    }
                }
                .onAppear(perform: self.model.getSiniestroTypeList)
                .alert(isPresented: self.$model.showsAlertMessage) {
                    Alert(title: Text(self.model.alertTitle), message: Text(self.model.alertMessage), dismissButton: .default(Text("Aceptar"), action: {
                        self.model.showsAlertMessage = false
                    }))
                }
                
                Spacer()
            }
            
            if self.model.isRegistering {
                Loader()
            }
        }
        .LPNavigationBar(showsLogo: false)
        .navigationBarTitle("S.O.S", displayMode: .inline)
        
    }
}

struct SiniestroView_View: PreviewProvider {
    static var previews: some View {
        SiniestroVehicularView(model: SiniestroVehicularViewModel(vehiclePlate: "AER-342", ciaPhoneNumber: "014555665"))
    }
}


