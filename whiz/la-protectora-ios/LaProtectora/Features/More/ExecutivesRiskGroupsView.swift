//
//  ExecutivesRiskGroupsView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 9/1/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI
import Resolver
import Combine
import Kingfisher

class ExecutivesRiskGroupsViewModel: ObservableObject {
    @Injected var auth: AuthManager
    
    @Injected var getExecutivesRiskGroups: GetExecutivesRiskGroupUseCase
    
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
            .sink { [weak self] (u) in
                guard let user = u, let id = user.id else { self?.state = .notAllowed; return }
                self?.state = user.type != .none ? .allowed : .notAllowed
                self?.currentUserId = String(id)
                self?.getRiskGroups()
        }
        .store(in: &self.subscriptions)
    }
    
    private func getRiskGroups() {
        self.getExecutivesRiskGroups.execute(for: self.currentUserId).sink(receiveCompletion: { (completion) in
            print ("\(RiskGroupListViewViewModel.self) - \(#function) completion: \(completion)")
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

struct ExecutivesRiskGroupsView: View {
    @ObservedObject var viewModel: ExecutivesRiskGroupsViewModel
    
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
                    NavigationLink(destination: LazyLoadedView(ExecutivesList(title: "Ejecutivos de Cuenta", model: ExecutivesListViewModel(groupId: String(self.viewModel.risks[index].id)))), tag: index, selection: self.$viewModel.currentSelection) {
                        self.item(index: index)
                    }
                    .buttonStyle(PlainButtonStyle())
                }
            }
        }
    }
    
    var customGrid: some View {
        CustomGridStack(numberOfItems: 3, columns: 2, horizontalSpacing: 12, verticalSpacing: 15) { (index, width) in
            NavigationLink(destination: LazyLoadedView(ExecutivesList(title: "Ejecutivos de Cuenta", model: ExecutivesListViewModel(groupId: String(self.viewModel.risks[index].id)))), tag: index, selection: self.$viewModel.currentSelection) {
                self.item(index: index)
                    .frame(width: width)
            }
            .buttonStyle(PlainButtonStyle())
        }
    }
    
    var body: some View {
        VStack(spacing: 22) {
            HeaderView(title: "Ejecutivos de Cuenta")
            
            if self.viewModel.state == .loading {
                WhiteLoader()
            } else if self.viewModel.state == .allowed {
                if self.viewModel.risks.count > 0 {
                    Group {
                        if #available(iOS 14.0, *) {
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
        .navigationBarTitle(self.viewModel.currentSelection != nil ? " " : "Ejecutivos", displayMode: .inline)
//        .LPNavigationBar(showsLogo: false)
    }
}
