//
//  MoreMenuView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/6/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI
import Combine
import Resolver
import Kingfisher

struct GetSocialMediaInteractor {
    @Injected var client: NetworkAPIClient

    func execute() -> AnyPublisher<[SocialMedia], Error> {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/").withResource("mobile/").withEndPoint("redes_sociales").withType(.post)
        let request = builder.build()
        return client.call(request: request)
            .tryMap {
                try $0.compactMap { (data) -> SocialMedia? in
                    try SocialMediaMapper(dictionary: data).execute()
                }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
}

struct SocialMediaMapper: Mapper {
    struct Data: Codable {
        let codigo: Int
        let respuestaMsg: String
        let rutaImagenRedes: URL
        let lnkRedes: URL
    }
    
    var dictionary: [String : Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
    
    func execute() throws -> SocialMedia {
        guard let data = Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        return SocialMedia(imageUrl: data.rutaImagenRedes, urlToProfile: data.lnkRedes)
    }
}

struct SocialMedia: Codable {
    var imageUrl: URL
    var urlToProfile: URL
}

class MoreMenuViewModel: ObservableObject {
    @Injected private var authManager: AuthManager
    
    @Injected private var router: DeepRouter
            
    @Published var state = ViewStatus.loading
    
    @Published var selectedItem: Int?
    
    @Published var socialMedia = [SocialMedia]()
    
    private var subscriptions = Set<AnyCancellable>()
    
    private let socialMediaInteractor = GetSocialMediaInteractor()
    
    var currentUser: User!
    
    @Published var workAround = true
    
    @Published var showsAlertMessage = false
    
    @Published var isLoading = false
    
    var initials: String {
        guard let first = self.currentUser?.firstName.first, let second = self.currentUser?.middleName.first else { return "" }
        return String(first) + String(second)
    }
    
    var userName: String {
        guard let user = self.currentUser else { return "" }
        if user.type == .enterprise {
            return user.firstName
        }
        return user.fullName
    }
    
    var compensation: CGFloat {
        if #available(iOS 14.0, *) {
            return 0
        } else {
            return self.workAround ? (UIScreen.main.bounds.height > 667 ? 44 : 0) : 0
        }
    }
    
    init() {
        print("Initializing MoreMenuViewModel...")
        
        self.authManager.$isLoading.sink(receiveValue: { [weak self] (val) in
            self?.isLoading = val
        })
        .store(in: &self.subscriptions)
                
        self.authManager.$currentUser
            .sink { [weak self] (u) in
                guard let user = u else { return }
                self?.state = user.type != .none ? .allowed : .notAllowed
                self?.currentUser = user
        }
        .store(in: &self.subscriptions)
        
        self.router.showsMenu.sink { [weak self] (_) in
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                self?.selectedItem = 0
            }
        }
        .store(in: &self.subscriptions)
        
        self.router.showsNotification.sink { [weak self] (_) in
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                self?.selectedItem = 3
            }
        }
        .store(in: &self.subscriptions)
        
        self.router.modalClosed.sink { [weak self] (_) in
            self?.workAround = false
        }
        .store(in: &self.subscriptions)
        
        self.socialMediaInteractor.execute().sink(receiveCompletion: { (completion) in
            print("\(MoreMenuViewModel.self) \(#function) completion \(completion)")
        }) { [weak self] (vals) in
            self?.socialMedia = vals
        }
        .store(in: &self.subscriptions)
    }
    
    deinit {
        print("Deinitializing MoreMenuViewModel...")
        self.subscriptions.removeAll()
    }
        
    func logout() {
        authManager.logout()
    }
    
    func launchSocial(at index: Int) {
        let url = self.socialMedia[index].urlToProfile
        UIApplication.shared.open(url, options: [:], completionHandler: nil)
        
    }
}

struct RowItem {
    var name: String
    var imageName: String
}

struct MoreMenuView: View {
    @ObservedObject var viewModel: MoreMenuViewModel
    
    var rowsData = [RowItem(name: "Datos Personales", imageName: "person_icon"), RowItem(name: "Ejecutivos", imageName: "executive_icon"), RowItem(name: "Blog Saludable", imageName: "clipboard_icon")/*, RowItem(name: "Notificaciones", imageName: "bell_icon")*/, RowItem(name: "Contacto", imageName: "phone_icon"), RowItem(name: "Cerrar Sesión", imageName: "out_icon")]
    
    func viewForRow(at index: Int) -> some View {
        Group {
            if index == 0 {
                if self.viewModel.state == .allowed {
                    PersonalData(model: Resolver.resolve())
                } else {
                    EmptyStateNotAllowed()
                }
            }
            
            if index == 1 {
                if self.viewModel.state == .allowed {
                    ExecutivesCategoriesView()
                } else {
                    EmptyStateNotAllowed()
                }
            }
            if index == 2 {
//                WebView(url: URL(string: "http://blog.laprotectora.com.pe")!)
                if #available(iOS 14.0, *) {
                    BlogFeedView()
                        .navigationBarTitle("Blog Saludable", displayMode: .inline)
                } else {
                    // Fallback on earlier versions
                    BlogFeedViewCOMP(feed: BlogFeed())
                        .navigationBarTitle("Blog Saludable", displayMode: .inline)
                }
            }
                
//            if index == 3 {
//                ZStack {
//                    Color.white.edgesIgnoringSafeArea(.all)
//                    Text("Funcionalidad en Desarrollo")
//                }
//                .navigationBarTitle("Notificaciones", displayMode: .inline)
//            }
                
            if index == 3 {
                AssistanceCenterView(model: AssistanceCenterViewModel())
            }
        }
    }
    
    func logoutButton(index: Int) -> some View {
        HStack {
            Image(decorative: self.rowsData[index].imageName)
            
            Text(self.rowsData[index].name)
                .font(.system(size: 15, weight: .regular, design: .rounded))
                .foregroundColor(Color.black.opacity(0.4))

        }
        .onTapGesture {
            self.viewModel.showsAlertMessage.toggle()
        }
    }
    
    func regularRow(index: Int) -> some View {
        NavigationLink(destination: LazyLoadedView(self.viewForRow(at: index)), tag: index, selection: self.$viewModel.selectedItem) {
            VStack(alignment: .leading, spacing: 10) {
                HStack {
                    Image(decorative: self.rowsData[index].imageName)
                    
                    Text(self.rowsData[index].name)
                        .font(.system(size: 15, weight: .regular, design: .rounded))
                        .foregroundColor(Color.black.opacity(0.4))
                    
                    Spacer()
                    
                    Image(systemName: "chevron.right")
                        .font(.system(size: 12, weight: .medium, design: .rounded))
                        .foregroundColor(Color.gray.opacity(0.4))
                }
                
                Rectangle()
                    .foregroundColor(Color.gray.opacity(0.25))
                    .frame(height: 1)
            }
        }
    }
    
    var body: some View {
        NavigationView {
            ZStack {
                Color.white.edgesIgnoringSafeArea(.all)
                
                VStack(alignment: .leading, spacing: 22) {
                    HeaderView(initials: self.viewModel.initials, title: self.viewModel.userName, description: self.viewModel.currentUser.email)
                        .alert(isPresented: self.$viewModel.showsAlertMessage, content: {
                            Alert(title: Text("Cerrar Sesión"), message: Text("¿Estás seguro de cerrar sesión?"), primaryButton: .cancel(), secondaryButton: .destructive(Text("Cerrar Sesión"), action: {
                                self.viewModel.logout()
                            }))
                        })
                    
                    ScrollView {
                        VStack(alignment: .leading, spacing: 10) {
                            ForEach(0 ..< rowsData.count) { (index) in
                                if index != 4 {
                                    self.regularRow(index: index)
                                }
                                if index == 4 {
                                    self.logoutButton(index: index)
                                }
                            }
                        }
                        .padding(.horizontal, 15)
                    }
                                        
                    VStack(alignment: .leading) {
                        Text("Síguenos en: ")
                        
                        HStack {
                            ForEach(0 ..< self.viewModel.socialMedia.count, id: \.self) { index in
                                KFImage(self.viewModel.socialMedia[index].imageUrl)
                                    .onTapGesture {
                                        self.viewModel.launchSocial(at: index)
                                    }
                            }
                            Spacer()
                        }
                    }
                    .padding(.leading, 20)
                    .padding(.bottom, 50)
                    
                    Spacer()
                    
                }
                
                if viewModel.isLoading {
                    Loader()
                }
            }
            .offset(y: self.viewModel.compensation)
            .navigationBarItems(leading: Image(decorative: "logo_small"), trailing: LPTrailingNavigationButtons(initials: self.viewModel.initials))
            .navigationBarTitle(" ", displayMode: .inline)
        }
    }
}

struct MoreMenuView_Previews: PreviewProvider {
    static var previews: some View {
        MoreMenuView(viewModel: MoreMenuViewModel())
    }
}
