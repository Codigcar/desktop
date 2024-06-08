//
//  InsuranceTypesView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/5/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI
import Resolver
import Combine
import Kingfisher

protocol RiskGroupListViewModelProtocol: ObservableObject {
    var auth: AuthManager { get }
    
    var getInsuranceTypeInteractor: GetRiskGroupUseCase { get }
    
    var state: ViewStatus { get set }
    
    var risks: [RiskGroup] { get set }
    
    var currentSelection: Int? { get set }
    
    func refreshUserStatus()
    
    func getRiskGroups()
    
    func buildViewModel(for index: Int) -> InsuranceListViewModel

}

class RiskGroupListViewViewModel: RiskGroupListViewModelProtocol {
    @Injected var auth: AuthManager
    
    @Injected var getInsuranceTypeInteractor: GetRiskGroupUseCase
    
    @Published var state = ViewStatus.loading
    
    @Published var risks = [RiskGroup]()
    
    @Published var currentSelection: Int? = nil

    
    private var subscriptions = Set<AnyCancellable>()
    
    private var insuranceListViewModel: InsuranceListViewModel!
    
    init() {
        self.refreshUserStatus()
    }
    
    var currentUserId: String = ""
    
    func refreshUserStatus() {
        self.auth.$currentUser
            .receive(on: RunLoop.main)
            .sink { [weak self] (u) in
                guard let user = u, let id = user.id else { self?.state = .notAllowed; return }
                self?.state = user.type != .none ? .allowed : .notAllowed
                self?.currentUserId = String(id)
                self?.getRiskGroups()
        }
        .store(in: &self.subscriptions)
    }
    
    func getRiskGroups() {
        self.getInsuranceTypeInteractor.execute(for: self.currentUserId).sink(receiveCompletion: { [weak self] (completion) in
            print ("\(RiskGroupListViewViewModel.self) - \(#function) completion: \(completion)")
            self?.state = .allowed
        }) { [weak self] (vals) in
            self?.risks = vals
        }
        .store(in: &self.subscriptions)
    }
    
    func buildViewModel(for index: Int) -> InsuranceListViewModel {
        self.insuranceListViewModel = InsuranceListViewModel(riskGroup: self.risks[index])
        return insuranceListViewModel
    }
}

struct RiskGroupListView: View {
    @ObservedObject var viewModel: RiskGroupListViewViewModel
    
    func item(index: Int) -> some View {
        ZStack {
            Color.white
                .frame(height: 170)
                .cornerRadius(16)
                .shadow(color: Color(hex: "5F626C").opacity(0.1), radius: 8, x: 0, y: 2)
            
            VStack {
                KFImage(self.viewModel.risks[index].imageUrl)
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: 112, height: 112)
                    .clipShape(Circle())
                    
                Text(self.viewModel.risks[index].name)
                    .font(.system(size: 14))
                    .foregroundColor(.black)
            }
        }
    }
    
    @available(iOS 14.0, *)
    var grid: some View {
        let columns: [GridItem] = Array(repeating: .init(.flexible()), count: 2)
        
        return ScrollView {
            LazyVGrid(columns: columns) {
                ForEach(0 ..< viewModel.risks.count) { index in
                    NavigationLink(destination: LazyLoadedView(InsuranceListView(viewModel: self.viewModel.buildViewModel(for: index))), tag: index, selection: self.$viewModel.currentSelection) {
                        self.item(index: index)
                    }
                    .buttonStyle(PlainButtonStyle())
                }
            }
        }
    }
    
    var customGrid: some View {
        return CustomGridStack(numberOfItems: self.viewModel.risks.count, columns: 2, horizontalSpacing: 12, verticalSpacing: 15) { (index, width) in
            NavigationLink(destination: LazyLoadedView(InsuranceListView(viewModel: self.viewModel.buildViewModel(for: index))), tag: index, selection: self.$viewModel.currentSelection) {
                self.item(index: index)
                    .frame(width: width)
            }
            .buttonStyle(PlainButtonStyle())
        }
    }
    
    
    var body: some View {
        return NavigationView {
            VStack(spacing: 22) {
                HeaderView(title: "Tus Pólizas")
                
                if self.viewModel.state == .loading {
                    WhiteLoader()
                } else if self.viewModel.state == .allowed {
                    if self.viewModel.risks.count > 0 {
                        Group {
                            if #available(iOS 14, *) {
                                AnyView(grid)
                            } else {
                                AnyView(customGrid)
                            }
                        }
                        .padding(.horizontal, 15)
                    } else {
                        ZStack {
                            Color.white
                            
                            Text("No se encontró información.")
                        }
                    }
                } else if self.viewModel.state == .notAllowed {
                    EmptyStateNotAllowed()
                }
            }
            .LPNavigationBar(showsLogo: true)
            .navigationBarTitle("", displayMode: .inline)
        }
    }    
}

struct EmbededRiskGroupListView: View {
    @ObservedObject var viewModel: RiskGroupListViewViewModel
    
    func item(index: Int) -> some View {
        ZStack {
            Color.white
                .frame(height: 170)
                .cornerRadius(16)
                .shadow(color: Color(hex: "5F626C").opacity(0.1), radius: 8, x: 0, y: 2)
            
            VStack {
                KFImage(self.viewModel.risks[index].imageUrl)
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: 112, height: 112)
                    .clipShape(Circle())
                
                Text(self.viewModel.risks[index].name)
                    .font(.system(size: 14))
                    .foregroundColor(.black)
            }
        }
    }
    
    @available(iOS 14.0, *)
    var grid: some View {
        let columns: [GridItem] = Array(repeating: .init(.flexible()), count: 2)
        
        return ScrollView {
            LazyVGrid(columns: columns) {
                ForEach(0 ..< viewModel.risks.count) { index in
                    NavigationLink(destination: LazyLoadedView(InsuranceListView(viewModel: self.viewModel.buildViewModel(for: index))), tag: index, selection: self.$viewModel.currentSelection) {
                        self.item(index: index)
                    }
                    .buttonStyle(PlainButtonStyle())
                }
            }
        }
    }
    
    var customGrid: some View {
        CustomGridStack(numberOfItems: self.viewModel.risks.count, columns: 2, horizontalSpacing: 12, verticalSpacing: 15) { (index, width) in
            NavigationLink(destination: LazyLoadedView(InsuranceListView(viewModel: self.viewModel.buildViewModel(for: index))), tag: index, selection: self.$viewModel.currentSelection) {
                self.item(index: index)
                    .frame(width: width)
            }
            .buttonStyle(PlainButtonStyle())
        }
    }
    
    var body: some View {
        Group {
            if self.viewModel.state == .loading {
                WhiteLoader()
            } else if self.viewModel.state == .allowed {
                if self.viewModel.risks.count > 0 {
                    Group {
                        if #available(iOS 14, *) {
                            AnyView(grid)
                        } else {
                            AnyView(customGrid)
                        }
                    }
                    .padding(.horizontal, 15)
                } else {
                    WhiteLoader()
                }
            } else if self.viewModel.state == .notAllowed {
                EmptyStateNotAllowed()
            }
        }
    }
}

final class DesignRiskGroupListViewModel: RiskGroupListViewModelProtocol {
    var auth: AuthManager = AuthManager()
    
    var getInsuranceTypeInteractor: GetRiskGroupUseCase = GetRiskGroupInteractor()
    
    @Published var state: ViewStatus = .allowed
    
    @Published var risks: [RiskGroup] = []
    
    @Published var currentSelection: Int?
    
    init() {
        
    }
    
    func refreshUserStatus() {
        
    }
    
    func getRiskGroups() {
        
    }
    
    func buildViewModel(for index: Int) -> InsuranceListViewModel {
        InsuranceListViewModel(riskGroup: risks[0])
    }
}

struct InsurancesView_Previews: PreviewProvider {
    static var previews: some View {
        RiskGroupListView(viewModel: RiskGroupListViewViewModel())
    }
}


