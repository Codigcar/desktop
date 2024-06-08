//
//  ExecutivesCategoriesView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/11/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI
import Resolver

struct ExecutivesCategoriesView: View {
    @State var selectedItem: Int?
    @Injected var authy: AuthManager
    
    var body: some View {
        ZStack(alignment: .top) {
            Color.white.edgesIgnoringSafeArea(.all)
            VStack {
                HeaderView(title: "Ejecutivos")
                
                List {
                    if authy.currentUser?.businessUnit?.id == 1 {
                        NavigationLink(destination: LazyLoadedView(ExecutivesList(title: "Ejecutivos de Cuenta", model: ExecutivesListViewModel(groupId: "3"))), tag: 1, selection: self.$selectedItem) {
                            Text("Ejecutivos de Cuenta")
                        }
                    } else {
                        NavigationLink(destination:  LazyLoadedView(ExecutivesRiskGroupsView(viewModel: ExecutivesRiskGroupsViewModel())), tag: 1, selection: self.$selectedItem) {
                            Text("Ejecutivos de Cuenta")
                        }
                    }
                 
                    
                    NavigationLink(destination: LazyLoadedView(ExecutivesList(title: "Ejecutivos de Siniestro", model: ExecutivesListViewModel())), tag: 2, selection: self.$selectedItem) {
                        Text("Ejecutivos de Siniestro")
                    }
                }
            }
        }
        .navigationBarTitle(self.selectedItem != nil ? " " : "Ejecutivos", displayMode: .inline)
    }
}

struct ExecutivesCategoriesView_Previews: PreviewProvider {
    static var previews: some View {
        ExecutivesCategoriesView()
    }
}
