//
//  SiniestrosMainView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/5/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI
import Resolver
import Combine
import Kingfisher

struct Item: Hashable {
    var name: String
    var imageName: String
}

enum ViewStatus {
    case allowed
    case loading
    case notAllowed
}

class SiniestrosCategoriesViewModel: ObservableObject {
    @Injected var auth: AuthManager
    
    @Injected var getSiniestrosGroupInteractor: GetSiniestroGroupListInteractor
        
    @Injected private var router: DeepRouter

    @Published var state = ViewStatus.loading
    
    @Published var groups = [SiniestroGroup]()
    
    @Published var workAround = true
    
    @Published var selectedItem: Int?
    
    private var subscriptions = Set<AnyCancellable>()
    
    var currentUserId = ""
    
    var deepSelection: SiniestroInfo?
    
    var compensation: CGFloat {
        if #available(iOS 14.0, *) {
            return 0
        } else {
            return self.workAround ? (UIScreen.main.bounds.height > 667 ? 44 : 0) : 0
        }
    }
    
    init() {
        self.auth.$currentUser
            .receive(on: RunLoop.main)
            .sink { [weak self] (u) in
            guard let user = u, let id = user.id else { self?.state = .notAllowed; return }
            self?.state = user.type != .none ? .allowed : .notAllowed
            if self?.state == .allowed {
                self?.currentUserId = String(id)
                self?.getSiniestrosGroupList(for: String(id))
            }
        }
        .store(in: &self.subscriptions)
        
        self.router.modalClosed.sink { [weak self] (_) in
            self?.workAround = false
        }
        .store(in: &self.subscriptions)
        
        self.router.showSinister.sink { [weak self] (info) in
            self?.deepSelection = info
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                self?.selectedItem = info.risk.groupId
            }
        }
        .store(in: &self.subscriptions)
    }
    
    private func getSiniestrosGroupList(for userId: UserID) {
        self.getSiniestrosGroupInteractor.execute(for: userId).sink(receiveCompletion: { (completion) in
            print ("\(SiniestrosCategoriesViewModel.self) - \(#function) completion: \(completion)")
        }) { [weak self] (vals) in
            self?.groups = vals
        }
        .store(in: &self.subscriptions)
    }
    
    func buildModel(at index: Int) -> SiniestroListViewModel {
        let selection = self.deepSelection
        self.deepSelection = nil
        return SiniestroListViewModel(title: self.groups[index].name, url: self.groups[index].imageUrl, userId: self.currentUserId, groupId: self.groups[index].id, selection: selection != nil ? selection!.siniestroId : nil)
    }
}

struct SiniestroCategories: View {
    @ObservedObject var model: SiniestrosCategoriesViewModel
    
    func item(index: Int) -> some View {
        ZStack {
            Color.white
                .frame(height: 170)
                .cornerRadius(16)
                .shadow(color: Color(hex: "5F626C").opacity(0.1), radius: 8, x: 0, y: 2)
            
            VStack {
                KFImage(self.model.groups[index].imageUrl)
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: 112, height: 112)
                    .clipShape(Circle())
                
                Text(self.model.groups[index].name)
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
                ForEach(0 ..< model.groups.count) { index in
                    NavigationLink(destination: LazyLoadedView(SiniestroListView(model: self.model.buildModel(at: index))), tag: self.model.groups[index].id, selection: self.$model.selectedItem, label: {
                        self.item(index: index)
                    })
                    .buttonStyle(PlainButtonStyle())
                }
            }
        }
    }


    var customGrid: some View {
        CustomGridStack(numberOfItems: self.model.groups.count, columns: 2, horizontalSpacing: 12, verticalSpacing: 15) { (index, width) in
            NavigationLink(destination: LazyLoadedView(SiniestroListView(model: self.model.buildModel(at: index))), tag: self.model.groups[index].id, selection: self.$model.selectedItem, label: {
                self.item(index: index)
                    .frame(width: width)
            })
                .buttonStyle(PlainButtonStyle())
        }
    }
    
    var body: some View {
        NavigationView {
            VStack(spacing: 22) {
                HeaderView(title: "Siniestros")
                
                if self.model.state == .none {
                    WhiteLoader()
                } else if self.model.state == .allowed {
                    if self.model.groups.count > 0 {
                        Group {
                            if #available(iOS 14.0, *) {
                                AnyView(grid)
                            } else {
                                AnyView(customGrid)
                            }
                        }
                        .padding(.horizontal, 15)
                        
                    } else {
                        ZStack {
                            Color.white
                            Text("No se encontró información")
                        }
                    }
                } else if self.model.state == .notAllowed {
                    EmptyStateNotAllowed()
                }                
            }
            .offset(y: self.model.compensation)
            .LPNavigationBar(showsLogo: true)
            .navigationBarTitle("", displayMode: .inline)
        }
    }
}

struct SiniestrosMainView_Previews: PreviewProvider {
    static var previews: some View {
        SiniestroCategories(model: SiniestrosCategoriesViewModel())
    }
}
