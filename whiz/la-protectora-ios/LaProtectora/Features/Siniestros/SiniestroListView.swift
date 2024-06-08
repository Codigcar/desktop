//
//  SiniestroList.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/5/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI
import Resolver
import Combine

class SiniestroListViewModel: ObservableObject {
    
    @Published var source = [SiniestroCardModel]()
    
    @Published var cardModels = [SiniestroCardModel]()
    
    @Published var isLoading = false
    
    @Published var selectedItem: Int?
    
    @Injected private var auth: AuthManager
    
    @Injected private var getSiniestroCardModelListInteractor: GetSiniestroCardModelListInteractor
    
    let url: URL?
    
    let title: String
    
    let userId: String
    
    let groupId: Int
    
    @Published var cachedSelectedItem: Int?
    
    @Published var filter = ""
    
    private var subscriptions = Set<AnyCancellable>()
    
    init(title: String, url: URL?, userId: String, groupId: Int, selection: Int? = nil) {
        self.title = title
        self.url = url
        self.userId = userId
        self.groupId = groupId
        self.cachedSelectedItem = selection
        self.getModels(for: userId, groupId: groupId)
        
        $filter.map { [unowned self] (query) -> [SiniestroCardModel] in
            if query != "" {
                return self.source.filter {
                    self.isTermIncluded(in: String($0.id), query: query)
                }
            }
            return self.source
        }
        .eraseToAnyPublisher()
        .sink { [weak self] (filtered) in
            if self?.cardModels != filtered {
                self?.cardModels = filtered
            }
        }
        .store(in: &self.subscriptions)
    }
    
    private func getModels(for userId: String, groupId: Int) {
        self.isLoading = true
        self.getSiniestroCardModelListInteractor.execute(with: userId, groupId: groupId).sink(receiveCompletion: { [weak self] (completion) in
            print ("\(SiniestroListViewModel.self) - \(#function) completion: \(completion)")
            self?.isLoading = false
        }) { [weak self] (values) in
            self?.cardModels = values
            self?.source = values
            if self?.cachedSelectedItem != nil {
                self?.selectedItem = self?.cachedSelectedItem
            }
        }
        .store(in: &self.subscriptions)
    }
    
    func isTermIncluded(in base: String, query: String) -> Bool {
        let valid = base.capitalized.contains(query.capitalized)
        return valid
    }
}

struct SiniestroListView: View {
    @ObservedObject var model: SiniestroListViewModel
    
    
    var body: some View {
        ZStack(alignment: .top) {
            Color.white.edgesIgnoringSafeArea(.all)
            
            VStack(spacing: 15) {
                HeaderView(imageUrl: self.model.url, title: self.model.title, description: "Selecciona el siniestro que deseas revisar")
                
                SearchBar(text: $model.filter)
                
                if self.model.cardModels.count > 0 && !self.model.isLoading {
                    ScrollView(.vertical) {
                        VStack(spacing: 15) {
                            ForEach(self.model.cardModels) { val in
                                NavigationLink(destination: LazyLoadedView(SiniestroView(model: SiniestroViewModel(siniestroId: String(val.id)), toClear: self.$model.cachedSelectedItem)), tag: val.id, selection: self.$model.selectedItem) {
                                    SiniestroCard(siniestro: val)
                                        .padding(.horizontal, 14)
                                }
                                .buttonStyle(PlainButtonStyle())
                            }
                        }
                    }
                } else if self.model.isLoading {
                    WhiteLoader()
                } else {
                    ZStack {
                        Color.white
                        
                        Text("No se encontraron documentos.")
                    }
                }
            }
        }
        .overlay(
            Rectangle()
                .foregroundColor(Color(hex: "D71920"))
                .frame(height: 2), alignment: .top)
            .LPNavigationBar(showsLogo: false)
            .navigationBarTitle(self.model.selectedItem != nil ? " " : "Siniestros", displayMode: .inline)
    }

}

struct SiniestroList_Previews: PreviewProvider {
    static var previews: some View {
        SiniestroListView(model: SiniestroListViewModel(title: "Siniestros Generales", url: nil, userId: "", groupId: 0234))
    }
}
