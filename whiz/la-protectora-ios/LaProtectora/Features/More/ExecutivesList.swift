//
//  ExecutivesList.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/11/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI
import Kingfisher
import Combine
import Resolver

struct ExecutiveCardData {
    var pictureUrl: URL?
    var name: String
    var title: String
    var phone: String
    var cellphone: String
    var email: String
    
    var insurancesHandled: [SmallCardItem]
}

struct InsuranceHandled: View {
    var url: URL?
    var name: String
    
    var body: some View {
        VStack {
            KFImage(url)
                .placeholder {
                    Color.gray.opacity(0.20)
            }
            .resizable()
            .frame(width: 26, height: 26)
            Text(name)
                .foregroundColor(Color.black.opacity(0.45))
                .font(.system(size: 12))
        }
    }
}


class ExecutivesListViewModel: ObservableObject {
    @Published var executives = [Executive]()
    
    @Published var isLoading = false
    
    @Injected private var getAccountExecutivesInteractor: GetAccountExecutivesListUseCase
    
    @Injected private var getSinisterExecutivesInteractor: GetSinisterExecutivesListUseCase
    
    @Injected private var auth: AuthManager
    
    private var subscriptions = Set<AnyCancellable>()
    
    init(groupId: String? = nil) {
        if groupId != nil {
            self.getAccountExecutives(for: groupId!)
        } else {
            self.getSinisterExecutives()
        }
    }
    
    deinit {
        self.subscriptions.removeAll()
    }
    
//    MARK: Updated on ticket LP-71 Now requests uses constant 3 for businessUnit and groupId
    func getAccountExecutives(for groupId: String) {
        guard let user = auth.currentUser, let id = user.id, let businessUnit = user.businessUnit else { return }
        self.isLoading = true
        self.getAccountExecutivesInteractor.execute(for: groupId, userId: String(id), businessUnitId: businessUnit.id == 1 ? "3" : String(businessUnit.id)).sink(receiveCompletion: { [weak self] (completion) in
            print("\(ExecutivesListViewModel.self) \(#function) completion: \(completion)")
            self?.isLoading = false
        }) { [weak self] (values) in
            self?.executives = values
        }
        .store(in: &self.subscriptions)
    }
    
    func getSinisterExecutives() {
        guard let user = auth.currentUser, let id = user.id else { return }
        self.isLoading = true
        self.getSinisterExecutivesInteractor.execute(for: String(id)).sink(receiveCompletion: { [weak self] (completion) in
            print("\(ExecutivesListViewModel.self) \(#function) completion: \(completion)")
            self?.isLoading = false
        }) { [weak self] (values) in
            self?.executives = values
        }
        .store(in: &self.subscriptions)
    }

}


struct ExecutivesList: View {
    var title: String
    
    @ObservedObject var model: ExecutivesListViewModel
    
    func hasCellPhone(at index: Int) -> Bool {
        model.executives[index].cellPhone != nil && model.executives[index].cellPhone != ""
    }
    
    func hasPhone(at index: Int) -> Bool {
        model.executives[index].phone != ""
    }
    
    func hasEmail(at index: Int) -> Bool {
        model.executives[index].email != nil && model.executives[index].email != ""
    }
    
    func handlesAccounts(at index: Int) -> Bool {
        model.executives[index].iconsUrls.count > 0
    }
    
    func item(at index: Int) -> some View {
        VStack(alignment: .leading) {
            HStack(alignment: .top, spacing: 17) {
                KFImage(model.executives[index].pictureUrl)
                    .placeholder {
                        Color.gray.opacity(0.2)
                }
                .resizable()
                .clipShape(Circle())
                .frame(width: 80, height: 80)
                .shadow(color: Color(hex: "696868").opacity(0.1), radius: 5, x: 0, y: 6)
                
                Rectangle()
                    .foregroundColor(Color(hex: "535353").opacity(0.20))
                    .frame(width: 1, height: 80)
                    .padding(.trailing, 3)
                
                VStack(alignment: .leading) {
                    Text(model.executives[index].name)
                        .font(.custom(Font.Signika.regular.rawValue, size: 20))

                    Text(model.executives[index].position ?? "Ejecutivo")
                        .font(.system(size: 12, weight: .medium, design: .default))
                        .foregroundColor(Color.black.opacity(0.45))
                    
                    if hasCellPhone(at: index) {
                        HStack {
                            Image(decorative: "small_phone")
                            Text(model.executives[index].cellPhone ?? "")
                                .font(.system(size: 10))
                                .foregroundColor(Color.black.opacity(0.45))
                        }
                    }
                    
                    if hasPhone(at: index) {
                        HStack {
                            Image(decorative: "small_home_phone")
                            Text(model.executives[index].phone)
                                .font(.system(size: 10))
                                .foregroundColor(Color.black.opacity(0.45))
                        }
                        
                    }
                    
                    if hasEmail(at: index) {
                        HStack {
                            Image(decorative: "small_email")
                            Text(model.executives[index].email ?? "")
                                .font(.system(size: 10))
                                .foregroundColor(Color.black.opacity(0.45))
                        }
                    }
                }
            }
            
            if handlesAccounts(at: index) {
                Rectangle()
                    .foregroundColor(Color(hex: "535353").opacity(0.20))
                    .frame(height: 1)
                
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack {
                        ForEach(model.executives[index].iconsUrls, id: \.self) { (e) in
                            KFImage(e)
                                .resizable()
                                .placeholder {
                                    Color.gray.opacity(0.20)
                                }
                                .aspectRatio(contentMode: ContentMode.fit)
                                .frame(width: 90, height: 90, alignment: .center)
                        }
                    }
                }
            }
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 10)
      
    }
    
    var body: some View {
        GeometryReader { reader in
            ZStack(alignment: .top) {
                Color.white.edgesIgnoringSafeArea(.all)
                
                VStack(spacing: 0) {
                    HeaderView(title: title)
                    
                    if self.model.executives.count > 0 && !self.model.isLoading {
                        ScrollView(.vertical, showsIndicators: false) {
                            VStack(spacing: 25) {
                                ForEach(0 ..< self.model.executives.count, id: \.self) { i in
                                    self.item(at: i)
                                        .frame(width: reader.size.width - 40)
                                        .background(Color.white.cornerRadius(12).shadow(color: Color.black.opacity(0.20), radius: 4, x: 0, y: 2))
                                }
                            }
                            .frame(width: reader.size.width)
                            .padding(.top, 30)
                            .padding(.bottom, 80)
                        }
                    } else if self.model.isLoading {
                        WhiteLoader()
                    } else {
                        ZStack {
                            Color.white
                            
                            Text("No se encontraron resultados.")
                        }
                    }
                }
            }
            .navigationBarTitle("Ejecutivos", displayMode: .inline)
        }
    }
}

//struct ExecutivesList_Previews: PreviewProvider {
//    static var previews: some View {
//        ExecutivesList(title: "Ejecutivos de Cuenta", model: [ExecutiveCardData(pictureUrl: URL(string: "https://t3.ftcdn.net/jpg/02/52/83/90/240_F_252839005_KHiQj68rSeS5CsBrhzXDdQk4NNw051wF.jpg"), name: "Sandra Rodríguez", title: "Apoderada De Cuentas", phone: "(511) 509 627", cellPhone: "999 509 627", email: "srodriguez@gmail.com", insurancesHandled: [SmallCardItem(name: "Vehicular", url: URL(string: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Circle-icons-car.svg/1200px-Circle-icons-car.svg.png"), type: .vehicular)])])
//    }
//}
