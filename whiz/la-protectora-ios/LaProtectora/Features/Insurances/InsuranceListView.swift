//
//  InsuranceListView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/5/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI
import Resolver
import Combine

class InsuranceListViewModel: ObservableObject {
    @Published var insurances = [Insurance]()
    
    @Published var source = [Insurance]()
    
    @Published var filter = ""
    
    @Published var isLoading = false
    
    @Published var currentSelection: Int? = nil
        
    @Injected var getInsurancesInteractor: GetInsurancesInteractor
    
    @Injected var auth: AuthManager
    
    private var currentUserId: String = ""
    
    private var subscriptions = Set<AnyCancellable>()
    
    private var model: InsuranceViewModel!
    
    private let id = UUID().uuidString
    
    let riskGroup: RiskGroup
    
    init(riskGroup: RiskGroup) {
        print("Initializing InsuranceListViewViewModel...\(id)")
        self.riskGroup = riskGroup
        
        self.auth.$currentUser.sink { [weak self] (user) in
            guard let u = user, let id = u.id else { return }
            self?.currentUserId = String(id)
        }
        .store(in: &self.subscriptions)
        
        $filter.map { [unowned self] (query) -> [Insurance] in
            if query != "" {
                return self.source.filter {
                    self.isTermIncluded(in: $0.number, query: query)
                }
            }
            return self.source
        }
        .eraseToAnyPublisher()
        .sink { [weak self] (filtered) in
            if self?.insurances != filtered {
                self?.insurances = filtered
            }
        }
        .store(in: &self.subscriptions)

        
    }
    
    deinit {
        print("Deinitializing InsuranceListViewViewModel... \(self.riskGroup.type) with id: \(id)")
    }
    
    func isTermIncluded(in base: String, query: String) -> Bool {
        let valid = base.capitalized.contains(query.capitalized)
        return valid
    }
    
    func getInsurances() {
        if self.insurances.count == 0 {
            self.isLoading = true
        }
        self.auth.$currentUser
            .filter({ (u) -> Bool in
                u != nil
            })
            .setFailureType(to: Error.self)
            .flatMap { [unowned self] (user) -> AnyPublisher<[Insurance], Error> in
                self.getInsurancesInteractor.execute(for: String(user!.id!), with: String(self.riskGroup.id))
        }
        .sink(receiveCompletion: { [weak self] (completion) in
            print ("\(InsuranceListViewModel.self) - \(#function) completion: \(completion)")
            self?.isLoading = false
        }) { [weak self] (insurances) in
            self?.source = insurances
            self?.insurances = insurances
            self?.isLoading = false
        }
        .store(in: &self.subscriptions)
    }
    
    func buildModel(with val: Insurance) -> InsuranceViewModel {
        self.model = InsuranceViewModel(id: String(val.id), detail: InsuranceView.DetailData(insuranceNumber: val.number, insuranceCompanyName: val.insuranceCompany.name, featuredColor: val.insuranceCompany.insuranceCompanyColor, risk: val.riskGroup.name, businessUnit: val.businessUnit.name!, availability: val.validity, executiveName: val.executive.name), type: val.riskGroup.type)
        
        return model
    }
}

struct InsuranceListView: View {
    @ObservedObject var viewModel: InsuranceListViewModel
    
    var body: some View {
        ZStack(alignment: .top) {
            Color.white.edgesIgnoringSafeArea(.all)
            
            VStack(spacing: 15) {
                HeaderView(imageUrl: self.viewModel.riskGroup.imageUrl, title: self.viewModel.riskGroup.name, description: "Selecciona la póliza que deseas revisar")
                
                SearchBar(text: self.$viewModel.filter)
                
                if self.viewModel.isLoading == false {
                    if self.viewModel.insurances.count > 0 {
                        ScrollView(.vertical) {
                            VStack(spacing: 15) {
                                ForEach(self.viewModel.insurances) { val in
                                    NavigationLink(destination: LazyLoadedView(InsuranceView(model: self.viewModel.buildModel(with: val))), tag: val.id, selection: self.$viewModel.currentSelection) {
                                        InsuranceCardView(insurance: val)
                                            .padding(.horizontal, 14)
                                    }
                                    .buttonStyle(PlainButtonStyle())
                                }
                            }
                        }
                    } else {
                        ZStack {
                            Color.white
                            Text(
                                """
                                No se encontraron resultados.
                                Toque aquí para intentar de nuevo
                                """)
                                .font(.system(size: 15))
                                .multilineTextAlignment(.center)
                        }
                        .onTapGesture {
                            self.viewModel.getInsurances()
                        }
                    }
                } else {
                    WhiteLoader()
                }
            }
            .onAppear(perform: {
                self.viewModel.getInsurances()
            })
        }
        .overlay(
            Rectangle()
                .foregroundColor(Color(hex: "D71920"))
                .frame(height: 2), alignment: .top)
            .LPNavigationBar(showsLogo: false)
            .navigationBarTitle(self.viewModel.currentSelection != nil ? " " : "Pólizas", displayMode: .inline)
    }
}

struct InsuranceListView_Previews: PreviewProvider {
    static var previews: some View {
        InsuranceListView(viewModel: InsuranceListViewModel(riskGroup: RiskGroup(id: 0, name: "Riesgos Generales", imageUrl: URL(string: "https://app.laprotectora.com.pe/IVOClientes/Styles/imagenes/poliza-patrimonial.jpg"), type: .general)))
    }
}
