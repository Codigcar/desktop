//
//  SiniestroView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/5/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI
import Resolver
import Combine

class SiniestroViewModel: ObservableObject {
    @Published var isLoading = false
    
    @Published var isLoadingFollowUps = false
    
    @Published var isLoadingDocumentsList = false
    
    @Published var siniestro: Siniestro?
    
    @Published var followUps = [FollowUpCardViewData]()
    
    @Published var documents = [DocumentCardViewData]()
    
    @Published var filter = ""
    
    @Published var selectedView = 0
    
    @Injected var getSiniestroDetailInteractor: GetSiniestroDetailUseCase
    
    @Injected var getFollowUpSiniestroInteractor: GetFollowUpListUseCase
    
    @Injected var getDocumentsSiniestroInteractor: GetSiniestroDocumentsListInteractor
    
    @Injected private var router: DeepRouter
    
    private var followups_sources = [FollowUpCardViewData]()
    
    private var documents_sources = [DocumentCardViewData]()
    
    private var subscriptions = Set<AnyCancellable>()
    
    init(siniestroId: SiniestroId) {
        self.getSiniestroDetailInteractor.execute(for: siniestroId).sink(receiveCompletion: { [weak self](completion) in
            print("\(SiniestroViewModel.self) - getSiniestroDetailInteractor() completion: \(completion)")
            self?.isLoading = false
        }) { [weak self] (siniestro) in
            self?.siniestro = siniestro
            self?.siniestro?.number = siniestroId
        }
        .store(in: &self.subscriptions)
        
        NotificationCenter.default.post(name: .init("childOnPolizaChild"), object: nil, userInfo: ["isActive": true])
        
        self.getFollowUpList(id: siniestroId)
        
        self.getDocuments(id: siniestroId)
        
        $filter.map { [unowned self] (query) -> [FollowUpCardViewData] in
            if query != "" && self.selectedView == 1 {
                return self.followups_sources.filter {
                    self.isTermIncluded(in: $0.id, query: query)
                }
            }
            return self.followups_sources
        }
        .eraseToAnyPublisher()
        .sink { [weak self] (filtered) in
            if self?.followUps != filtered {
                self?.followUps = filtered
            }
        }
        .store(in: &self.subscriptions)
        
        $filter.map { [unowned self] (query) -> [DocumentCardViewData] in
            if query != "" && self.selectedView == 2 {
                return self.documents_sources.filter {
                    self.isTermIncluded(in: $0.id, query: query)
                }
            }
            return self.documents_sources
        }
        .eraseToAnyPublisher()
        .sink { [weak self] (filtered) in
            if self?.documents != filtered {
                self?.documents = filtered
            }
        }
        .store(in: &self.subscriptions)
    }
    
    func isTermIncluded(in base: String, query: String) -> Bool {
//        let charset = Set(base.capitalized)
//        let setQuery = Set(query.capitalized)
//        let intersection = charset.intersection(setQuery)
//        let valid = intersection == setQuery
        
        let valid = base.capitalized.contains(query.capitalized)

        return valid
    }
    
    func getFollowUpList(id: SiniestroId) {
        self.isLoadingFollowUps.toggle()
        self.getFollowUpSiniestroInteractor.execute(for: id)
            .map({ (models) -> [FollowUpCardViewData] in
                models.map { FollowUpCardViewData(followUp: $0) }
            })
            .sink(receiveCompletion: { [weak self] (completion) in
                print("FollowUp repo: ", completion)
                self?.isLoadingFollowUps.toggle()
            }) { [weak self] (vals) in
                self?.followups_sources = vals
                self?.followUps = vals
        }
        .store(in: &self.subscriptions)
    }
    
    private func getDocuments(id: SiniestroId) {
        self.isLoadingDocumentsList.toggle()
        self.getDocumentsSiniestroInteractor.execute(with: id)
            .map({ (models) -> [DocumentCardViewData] in
                models.map { DocumentCardViewData(document: $0) }
            })
            .sink(receiveCompletion: { [weak self] (completion) in
                print("Document repo: ", completion)
                self?.isLoadingDocumentsList.toggle()
            }) { [weak self] (vals) in
                self?.documents_sources = vals
                self?.documents = vals
        }
        .store(in: &self.subscriptions)
    }
    
    func modalClosed() {
        self.router.modalClosed.send(())
    }
}

struct SiniestroView: View {
    struct DocumentViewerDataSource: Identifiable {
        let id = UUID().uuidString
        let url: URL
    }
    
    @ObservedObject var model: SiniestroViewModel
    
    @State var webViewerDataSource: DocumentViewerDataSource? = nil
    
    @Binding var toClear: Int?
    
    var items = [HeaderTabBar.Item(name: "Detalle", imageName: "detail_icon"), HeaderTabBar.Item(name: "Seguimiento", imageName: "followUp_icon"), HeaderTabBar.Item(name: "Documentos", imageName: "documents_icon")]
    
    var detailView: some View {
        ScrollView(.vertical, showsIndicators: false) {
            VStack(spacing: 15) {
                BigTitleRow(text: "Nº de Siniestro", detail: self.model.siniestro?.number ?? "Cargando....")
                BigTitleRow(text: "Aseguradora", detail: self.model.siniestro?.insuranceCompany.name ?? "Cargando...", featuredColor: self.model.siniestro?.insuranceCompany.insuranceCompanyColor ?? "FFFFFFF")
                VStack(spacing: 30) {
                    BigRow(text: "Fecha de Ocurrencia", detail: self.model.siniestro?.date ?? "Cargando....")
                    BigRow(text: "Cobertura", detail: self.model.siniestro?.coverage ?? "Cargando...")
                    BigRow(text: "Riesgo", detail: self.model.siniestro?.risk.name ?? "Cargando...")
                    BigRow(text: "Detalle", detail: self.model.siniestro?.detail ?? "Cargando...")
                    BigRow(text: "Gasto Presentado", detail: self.model.siniestro?.expenses ?? "Cargando...")
                    BigRow(text: "Deducible", detail: self.model.siniestro?.deduction ?? "Cargando....")
                    BigRow(text: "Monto Indemizado", detail: self.model.siniestro?.indemizacion ?? "Cargando...")
                    Group {
                        BigRow(text: "Nº de Póliza", detail: self.model.siniestro?.polizaNumber ?? "Cargando...")
                        BigRow(text: "Ejec. Siniestro", detail: self.model.siniestro?.executive.name ?? "Cargando...")
                        BigRow(text: "Fec. de Recepción", detail: self.model.siniestro?.receptionDate ?? "Cargando...")
                        BigRow(text: "Último Seguimiento", detail: self.model.siniestro?.lastFollowUp ?? "Cargando...")
                    }
                }
                
                Spacer()
                
            }
            .padding(.horizontal, 14)
        }
    }
    
    
    var body: some View {
        ZStack(alignment: .top) {
            Color.white.edgesIgnoringSafeArea(.all)
            
            VStack(spacing: 15) {
                HeaderTabBar(items: items, selectedItem: self.$model.selectedView)
                    .padding(.bottom, 15)
                
                if self.model.selectedView != 0 {
                    SearchBar(text: self.$model.filter)
                }
                
                PaginatedView(items.count, orientation: .horizontal, alignment: .top, currentIndex: self.$model.selectedView, dragToDismiss: .inactive, backgroundColor: .white, isDragEnabled: true) { (index, transform) in

                    if index == 0 {
                        self.detailView
                            .padding(.top, 15)

                    } else {
                        ScrollView(.vertical, showsIndicators: false) {
                            VStack(spacing: 14) {
                                if index == 1 {
                                    if self.model.followUps.count > 0 && !self.model.isLoadingFollowUps {
                                        ForEach(0 ..< self.model.followUps.count, id: \.self) { (el) in
                                            LPCard(data: self.model.followUps[el])
                                                .padding(.horizontal, 14)
                                        }
                                    } else if self.model.isLoadingFollowUps {
                                        WhiteLoader()
                                    } else {
                                        ZStack {
                                            Color.white
                                            
                                            Text("No se encontró información de seguimientos.")
                                        }
                                    }
                                    
                                } else if index == 2 {
                                    if self.model.documents.count > 0 && !self.model.isLoadingDocumentsList {
                                        ForEach(0 ..< self.model.documents.count, id: \.self) { (el) in
                                            LPCard(data: self.model.documents[el])
                                                .padding(.horizontal, 14)
                                                .onTapGesture {
                                                    if let url = self.model.documents[el].url {
                                                        self.webViewerDataSource = DocumentViewerDataSource(url: url)
                                                    }
                                            }
                                        }
                                        .sheet(item: self.$webViewerDataSource) { (data) in
                                            NavigationView {
                                                WebView(url: data.url, contentType: "application/pdf")
                                                    .navigationBarTitle("Documentos", displayMode: .inline)
                                                    .navigationBarItems(trailing: Button("Cerrar") {
                                                        self.model.modalClosed()
                                                        self.webViewerDataSource = nil
                                                    })
                                            }
                                            .accentColor(.red)
                                            .colorScheme(.light)
                                            
                                        }
                                    } else if self.model.isLoadingDocumentsList {
                                        WhiteLoader()
                                    } else {
                                        ZStack {
                                            Color.white
                                            
                                            Text("No se encontraron documentos.")
                                        }
                                        
                                    }
                                }
                            }
                            .padding(.top, 15)
                        }
                    }
                }
            }
        }
        .overlay(
            Rectangle()
                .foregroundColor(Color(hex: "D71920"))
                .frame(height: 2), alignment: .top)
            .LPNavigationBar(showsLogo: false)
            .navigationBarTitle("Siniestro", displayMode: .inline)
            .onAppear {
                self.toClear = nil 
        }
        .onDisappear {
            NotificationCenter.default.post(name: .init("childOnPolizaChild"), object: nil, userInfo: ["isActive": false])
        }
    }
}

struct SiniestroView_Previews: PreviewProvider {
    static var previews: some View {
        SiniestroView(model: SiniestroViewModel(siniestroId: "26476"), toClear: .constant(nil))
    }
}
