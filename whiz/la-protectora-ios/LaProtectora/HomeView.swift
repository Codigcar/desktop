//
//  HomeView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/3/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI
import Resolver
import Combine

class HomeViewModel: ObservableObject {
    @Injected var deepRouter: DeepRouter
    
    @Injected var auth: AuthManager
    
    @Injected var getLinkDataInteractor: GetLinkDataUseCase
    
    @Injected var getEncryptedLinkInteractor: GetEncryptedLinkUseCase
    
    @Published var isSOSShowing = true
    
    @Published var showWebView = false
    
    @Published var pronostikURL: URL? = nil
    
    var quoteURL: URL? = URL(string: "https://www.t-aseguro.com/cotizadorweb/Home")
    
    var webViewName = "Cotizar"
    
    var webViewURL: URL? = URL(string: "https://www.t-aseguro.com/cotizadorweb/Home")
    
    private var subscriptions = Set<AnyCancellable>()
    
    init() {
        self.getPronostikURL()
        self.auth.$currentUser.sink { [weak self] (user) in
            guard let u = user else { return }
            if u.businessUnit?.id != 1 {
                self?.isSOSShowing = false
            }
        }
        .store(in: &self.subscriptions)
    }
    
    func modalClosed() {
        self.deepRouter.modalClosed.send(())
    }
    
    func openQuote() {
        guard let url = self.quoteURL
        else {
            return
        }
        self.webViewName = "Cotizar"
        self.webViewURL = url
        self.showWebView = true
    }
    
    func closeWebView() {
        self.showWebView = false
    }
    
    func getPronostikURL() {
        if let urlString = UserDefaults.standard.value(forKey: "pronostikLink") as? String, let url = URL(string: urlString) {
            self.pronostikURL = url
        }
        else {
            self.getLinkDataInteractor.execute()
                .then { linkData -> AnyPublisher<URL?, Error> in
                    return self.getEncryptedLinkInteractor.execute(channelId: linkData[0].channelId, clientTypeId: self.auth.currentUser?.document?.id ?? 0, clientDocType: self.auth.currentUser?.document?.number ?? "", clientFullName: self.auth.currentUser?.clientFullName ?? "", externalCode: linkData[0].externalCode, pronostikLink: linkData[0].pronostikLink)
                        .eraseToAnyPublisher()
                }
                .receive(on: RunLoop.main)
                .sink { completion in
                    print(completion)
                } receiveValue: { response in
                    guard let url: URL = response
                    else {
                        return
                    }
                    print(url)
                    self.pronostikURL = url
                    UserDefaults.standard.setValue(url.absoluteString, forKey: "pronostikLink")
                    
                }
                .store(in: &self.subscriptions)
        }
        
    }
    
    func openPronostik() {
        guard let url = self.pronostikURL
        else {
            return
        }
        //self.webViewName = "Pronostik"
        //self.webViewURL = url
        //self.showWebView = true
        UIApplication.shared.open(url)
    }
}

struct HomeView: View {
    @State var currentIndex = 0
    @ObservedObject var model: HomeViewModel
    
    var userInitials = "AC"
    var titles = ["""
                   Tus Pólizas
                   siempre contigo
                   """,
                   """
                   Asegúralos sin perder
                   los momentos en familia
                   """,
                   """
                   Te cuidamos con
                   prácticos consejos
                   """,
                   """
                   ¿Sabes qué hacer en un
                   siniestro o accidente?
                   """,
                  
                   """
                   Asesoriamiento continuo
                   Central de asistencia
                   """
    ]
    
    var descriptions = [/*"", */"Detalles, endosos, primas y mucho más", "", "Tenemos nuevos consejos en nuestro blog", "Usa las guías de procedimiento correctas", "Nuestra atención es de 24 / 7"]
    
    func detailView(for index: Int) -> some View {
        Group {
            if index == 1 {
                LPSmallButton(title: "Cotizar Ahora") {
                    self.model.openQuote()
                }
                .padding(.horizontal, 30)
            }
            /*else if index == 0{
                if self.model.pronostikURL != nil {
                    LPSmallButton(title: "Iniciar Orientación") {
                        model.openPronostik()
                        print("iniciar orientacion")
                    }
                    .padding(.horizontal, 30)
                }
                else {
                    LPSmallButton(title: "Cargando...", action:  {
                    }, color: .gray)
                        .padding(.horizontal, 30)
                }
            }*/
            else {
                Text(self.descriptions[index])
                    .font(.system(size: 14))
                    .foregroundColor(Color(hex: "8E8E93"))
            }
        }
    }
    
    func page(index: Int) -> some View {
        ZStack(alignment: .bottom) {
            
                Image(decorative: "onboarding_\(index+1)")
                    .resizable()
                
                OnboardingCard(index: index, title: self.titles[index], detail: self.detailView(for: index), showsSOSButton: model.isSOSShowing)
            }
            
        
    }
    
    var body: some View {
        NavigationView {
            PaginatedView(5, orientation: .horizontal, alignment: .leading, currentIndex: self.$currentIndex, dragToDismiss: .inactive, backgroundColor: Color.clear, isDragEnabled: true,
            content: {
                (index, transform) in self.page(index: index)
            })
                .LPNavigationBar(showsLogo: true)
                .navigationBarTitle("", displayMode: .inline)
                .sheet(isPresented: self.$model.showWebView) {
                    NavigationView {
                        WebView(url: self.model.webViewURL!)
                            .navigationBarTitle(self.model.webViewName, displayMode: .inline)
                            .navigationBarItems(trailing:
                                                    Button(action: {
                                self.model.modalClosed()
                                self.model.closeWebView()
                            }, label: {
                                Text("Cerrar")
                            })
                            )
                    }
                    .colorScheme(.light)
                }
        }
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView(model: HomeViewModel())
    }
}

struct Font {
    enum Signika: String {
        case regular = "Signika-Regular"
        case bold = "Signika-Bold"
        case light = "Signika-Light"
        case semibold = "Signika-Semibold"
        
    }
}

struct OnboardingCard<Content: View>: View {
    var index: Int
    var title: String
    var detail: Content
    var showsSOSButton: Bool
    
    var overlay: some View {
        VStack(alignment: .leading) {
            HStack {
                /*if index == 0 {
                    Text(self.title)
                        .foregroundColor(.black)
                        .fixedSize()
                        .font(.custom(Font.Signika.semibold.rawValue, size: 22))
                        .multilineTextAlignment(.center)
                }
                else {*/
                    Rectangle()
                        .frame(width: 4, height: 52)
                        .foregroundColor(Color(hex: "D71920"))
                    
                    Text(self.title)
                        .foregroundColor(.black)
                        .fixedSize()
                        .font(.custom(Font.Signika.semibold.rawValue, size: 22))
                /*}*/
                
                
            }
            
            Rectangle()
                .frame(height: 1)
                .foregroundColor(Color.black.opacity(0.10))
            
            self.detail
            
            GeometryReader { reader in
                HStack(spacing: 14) {
                    /*if index == 0 { Spacer() }*/
                    ForEach(0 ..< 5) { i in
                        Circle()
                            .frame(width: 10, height: 10)
                            .foregroundColor(self.index == i ? Color.black : Color(hex: "EAEAEA"))
                            .overlay(Circle().stroke(self.index == i ? Color.white : Color.clear, lineWidth: 1))
                            .shadow(radius: self.index == i ? 1 : 20)
                    }
                    /*if index == 0 { Spacer() }*/
                }
            }
            .frame(height: 10)
        }
        .padding(.leading, 28)
        .padding(.trailing, 40)
    }
    
    var body: some View {
        RoundedCorners(tl: 0, tr: 30, bl: 30, br: 0)
            .fill(Color.white)
            .frame(width: 326, height: 180)
            .overlay(self.overlay, alignment: .leading)
            .overlay(
                Group {
                    if showsSOSButton {
                        NavigationLink(destination: SOSView(), label: {
                            Image(decorative: "sos_button")
                                .frame(width: 45, height: 45)
                        })
                            .buttonStyle(PlainButtonStyle())
                            .offset(x: 22.5)
                            .padding(.bottom, 12)
                    }
                }
                , alignment: .bottomTrailing)
            .padding(.bottom, 30)
    }
}

struct OnboardingCard_Preview: PreviewProvider {
    static var previews: some View {
        ZStack {
            Color.red
            
            OnboardingCard(index: 0, title:
                """
                Tus Pólizas
                siempre contigo
                """
                           , detail:
                            Text("Detalles, endosos, primas y mucho más")
                            .font(.system(size: 14))
                            .foregroundColor(Color(hex: "8E8E93")), showsSOSButton: true)
        }
    }
}

