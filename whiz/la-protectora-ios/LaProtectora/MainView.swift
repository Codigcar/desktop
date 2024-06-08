//
//  ContentView.swift
//  La Protectora
//
//  Created by Rolando Rodriguez on 7/31/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI
import Combine
import Resolver
import Network

class MainViewViewModel: ObservableObject {
    
    @Published var authStatus = AuthStatus.unknown
    
    @Published var selectedTab = 0
    
    @Published var showsCalculator = false
    
    @Published var showNetworkError = false
    
    @Published var quoterURL: URL? = nil
    
    @Injected var authManager: AuthManager
        
    @Injected private var router: DeepRouter
    
    @Injected var getQuoterLinkDataInteractor: GetQuoterLinkDataUseCase
    
    private var subscriptions = Set<AnyCancellable>()
    
    private let monitor = NWPathMonitor()
    
    private let queue = DispatchQueue(label: "NetworkMonitor")
    
    init() {
        self.getQuoterLink()
        self.authManager.$status
            .receive(on: RunLoop.main)
            .sink { [weak self] (status) in
                self?.authStatus = status
                
                if self?.authStatus == .notAuthenticated {
                    self?.selectedTab = 0
                }
            }
            .store(in: &self.subscriptions)
        
        monitor.pathUpdateHandler = { path in
            if path.status == .satisfied {
                print("We're connected!")
            } else {
                print("No connection.")
            }

            print(path.isExpensive)
        }

        monitor.start(queue: queue)
        
        self.router.showsMenu.sink { [weak self] (_) in
            self?.selectedTab = 4
        }
        .store(in: &self.subscriptions)
        
        
//        self.router.showsNotification.sink { [weak self] (_) in
//            self?.selectedTab = 4
//        }
//        .store(in: &self.subscriptions)
        
//        self.router.showSinister.sink { [weak self] (info) in
//            self?.selectedTab = 3
//        }
//        .store(in: &self.subscriptions)
    }
    
    func modalClosed() {
        self.router.modalClosed.send(())
    }
    
    func getQuoterLink() {
        self.getQuoterLinkDataInteractor.execute()
        .receive(on: RunLoop.main)
        .sink { completion in
            print(completion)
        } receiveValue: { response in
            guard let url: URL = URL(string: response[0].quoterLink)
            else {
                return
            }
            self.quoterURL = url
        }
        .store(in: &self.subscriptions)
    }
}

//  MARK: TODO Fix app state restauration by adding viewModels on each view to hold their state upon tab change.
struct Tabbar: View {
    @Binding var selectedTab: Int
    
    var customAction: (() -> ())?
    
    var body: some View {
        ZStack {
            Color(hex: "F9F9F9")
                .edgesIgnoringSafeArea(.bottom)
                .overlay(Rectangle().foregroundColor(Color(hex: "B2B2B2")).frame(height: 0.5), alignment: .top)
            
            HStack(spacing: 0) {
                VStack(spacing: 2) {
                    Image(decorative: "home_icon")
                        .frame(height: 28)
                    
                    Text("Inicio")
                        .foregroundColor(self.selectedTab == 0 ? Color.red : Color(hex: "999999"))
                        .font(.system(size: 10, weight: .regular, design: .default))
                }
                .onTapGesture {
                    self.selectedTab = 0
                }
                
                Spacer()
                
                VStack(spacing: 2) {
                    Image(decorative: "insurance_icon")
                        .frame(height: 28)
                    
                    Text("Pólizas")
                        .foregroundColor(self.selectedTab == 1 ? Color.red : Color(hex: "999999"))
                        .font(.system(size: 10, weight: .regular, design: .default))
                }
                .onTapGesture {
                    self.selectedTab = 1
                }
                
                Spacer()
                
                VStack(spacing: 2) {
                    Image(decorative: "cotizar_icon")
                        .frame(height: 28)
                    
                    Text("Cotizador")
                        .foregroundColor(Color(hex: "999999"))
                        .font(.system(size: 10, weight: .regular, design: .default))
                }
                .onTapGesture {
                    self.customAction?()
                }                
                
                Spacer()
                
                VStack(spacing: 2) {
                    Image(decorative: "warning_icon")
                        .frame(height: 28)
                    Text("Siniestros")
                        .foregroundColor(self.selectedTab == 3 ? Color.red : Color(hex: "999999"))
                        .font(.system(size: 10, weight: .regular, design: .default))
                }
                .onTapGesture {
                    self.selectedTab = 3
                }
                
                Spacer()
                
                VStack(spacing: 2) {
                    Image(decorative: "more_icon")
                        .frame(height: 28)
                    
                    Text("Más")
                        .foregroundColor(self.selectedTab == 4 ? Color.red : Color(hex: "999999"))
                        .font(.system(size: 10, weight: .regular, design: .default))
                }
                .onTapGesture {
                    self.selectedTab = 4
                }
                
            }
            .padding(.horizontal, 30)
            .padding(.top, 5)
        }
        .frame(height: 48)
        
    }
}

struct MainView: View {
    @ObservedObject var viewModel: MainViewViewModel
    
    var alternativeSolution: some View {
        TabView(selection: self.$viewModel.selectedTab) {
            HomeView(model: HomeViewModel())
                .tabItem {
                    Image(decorative: "home_icon")
                    Text("Inicio")
            }
            .tag(0)
            
            RiskGroupListView(viewModel: Resolver.resolve())
                .tabItem {
                    Image(decorative: "insurance_icon")
                    Text("Pólizas")
            }
            .tag(1)
            
                QuotingView(viewModel: viewModel)
                    .navigationBarTitle("Cotizar", displayMode: .inline)
                    .tabItem {
                        Image(decorative: "cotizar_icon")
                        Text("Cotizar")
                    }
                    .tag(2)
            
            LazyLoadedView(SiniestroCategories(model: Resolver.resolve()))
                .tabItem {
                    Image(decorative: "warning_icon")
                    Text("Siniestros")
            }
            .tag(3)
            
            MoreMenuView(viewModel: Resolver.resolve())
                .tabItem {
                    Image(decorative: "more_icon")
                    Text("Más")
            }
            .tag(4)
        }
        .accentColor(Color.red)

    }
    
    var mainSolution: some View {
        VStack(spacing: 0) {
            TabbedView(5, alignment: .leading, currentIndex: self.$viewModel.selectedTab, backgroundColor: .white) { (index) in
                if index == 0 {
                    HomeView(model: HomeViewModel())
                }
                
                if index == 1 {
                    RiskGroupListView(viewModel: Resolver.resolve())
                }
                
                if index == 3 {
                    SiniestroCategories(model: Resolver.resolve())
                }
                
                if index == 4 {
                    MoreMenuView(viewModel: Resolver.resolve())
                }
                
                if index == 2 {
                    NavigationView {
                        Color.white
                    }
                }
            }
            .accentColor(.red)
            
            Tabbar(selectedTab: self.$viewModel.selectedTab) {
                self.viewModel.showsCalculator.toggle()
            }
            .sheet(isPresented: self.$viewModel.showsCalculator) {
                    NavigationView {
                        QuotingView(viewModel: viewModel)
                            .navigationBarTitle("Cotizar", displayMode: .inline)
                            .navigationBarItems(trailing:
                                Button(action: {
                                    self.viewModel.modalClosed()
                                    self.viewModel.showsCalculator.toggle()
                                }, label: {
                                    Text("Cerrar")
                                })
                        )
                    }
                    .colorScheme(.light)
            }
        }
        
    }
    
    var body: some View {
        Group {
            if self.viewModel.authStatus == .notAuthenticated {
                LoginView(viewModel: LoginViewViewModel())
            } else if self.viewModel.authStatus == .authenticated {
                if #available(iOS 14, *) {
                    self.alternativeSolution
                } else {
                    self.mainSolution
                }
            } else if self.viewModel.authStatus == .unknown {
                ZStack {
                    Color.white
                        .edgesIgnoringSafeArea(.all)
                    
                    ActivityIndicator(isAnimating: .constant(true), style: .medium)
                }
            }
        }
    }
}

struct QuotingView: View {
    
    @ObservedObject var viewModel: MainViewViewModel
    
    var body: some View {
        if self.viewModel.quoterURL != nil {
            WebView(url: self.viewModel.quoterURL!)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        MainView(viewModel: MainViewViewModel())
    }
}
