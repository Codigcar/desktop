//
//  InsuranceViewPage.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 9/14/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI
import Combine

class InsuranceViewPageModel: ObservableObject {
    
    @Published var data : [LPCardData] = []
    
    let source: [LPCardData]
    
    let coupons: [CouponCardViewData]
    
    let id: Int
    
    let type: RiskGroup.Kind
    
    private var pageLimit = 20
    
    private var currentPage = 1
    
    func loadNextPage() {
        currentPage += 1
        
        let newData = Array(source.prefix(pageLimit * currentPage))
        
        self.data = newData
        
        print(source.count, data.count, currentPage)
    }
    
    var moreToLoad: Bool {
        source.count > data.count
    }
                
    init(id: Int, source: [LPCardData], coupons: [CouponCardViewData], type: RiskGroup.Kind) {
        self.id = id
        
        self.coupons = coupons
        
        self.type = type
        
        self.source = source
        
        self.data = Array(source.prefix(pageLimit * currentPage))
    }
}


@available(iOS 14.0, *)
struct InsuranceViewPage: View {
    @ObservedObject var model: InsuranceViewPageModel

    let modalClosed: () -> ()
    let showSinister: (Int) -> ()
    let getCoupons: (String) -> ()
    
    @State var sheetDataSource: SheetDataSource?
    
    @State var showsError = false
    
    @State var showSpinner = false
    
    func onCardTap(index el: Int) {
        let showsDocumentViewer = self.model.type != .general ? self.model.id == 2 : self.model.id == 3
        if !showsDocumentViewer, let vd = self.model.source[el] as? PrimaCardViewData, let financingId = vd.prima.financingId  {
            self.sheetDataSource = SheetDataSource(queringId: financingId)
            self.getCoupons(financingId)
            
        } else if let url = self.model.source[el].url {
            self.sheetDataSource = SheetDataSource(url: url)
        } else {
            self.showsError.toggle()
        }
    }
    
    var body: some View {
        ZStack {
            if self.model.data.count > 0 {
                ScrollView(.vertical, showsIndicators: false) {
                    LazyVStack(spacing: 14) {
                        ForEach(0 ..< self.model.data.count, id: \.self) { (el) in
                            Group {
                                if self.model.id != 5 {
                                    LPCard(data: self.model.data[el])
                                        .padding(.horizontal, 14)
                                        .onTapGesture { onCardTap(index: el) }
                                        
                                } else {
                                    NavigationLink(destination: LazyLoadedView(SiniestroView(model: SiniestroViewModel(siniestroId: self.model.data[el].id), toClear: .constant(nil)))) {
                                        LPCard(data: self.model.data[el])
                                            .padding(.horizontal, 14)
                                    }
                                    .buttonStyle(PlainButtonStyle())
                                }
                                
                            }
                        }
                        .alert(isPresented: self.$showsError) { () -> Alert in
                            Alert(title: Text("Aviso"), message: Text("No se encontraron registros"), dismissButton: .default(Text("Aceptar")))
                        }
                        .sheet(item: self.$sheetDataSource) { (data) in
                            NavigationView {
                                Group {
                                    if data.url != nil && data.queringId == nil {
                                        WebView(url: data.url!, contentType: "application/pdf")
                                            .navigationBarTitle("Documento", displayMode: .inline)
                                    } else if data.queringId != nil {
                                        Group {
                                            if self.model.coupons.count > 0 {
                                                ScrollView(.vertical) {
                                                    VStack(spacing: 25) {
                                                        ForEach(0 ..< self.model.coupons.count, id: \.self) { index in
                                                            LPCard(data: self.model.coupons[index])
                                                                .padding(.horizontal, 20)
                                                        }
                                                        
                                                        Spacer()
                                                    }
                                                    .padding(.top, 50)
                                                }
                                            } else {
                                                VStack{
                                                    ActivityIndicator(isAnimating: .constant(true), style: .medium)
                                                    Text("Cargando...")
                                                }
                                            }
                                        }
                                        .navigationBarTitle("Cupones", displayMode: .inline)
                                    }
                                    else {
                                        Text("No se encontraron cupones relacionados.")
                                            .navigationBarTitle("Cupones", displayMode: .inline)
                                    }
                                }
                                .navigationBarItems(trailing: Button("Cerrar") {
                                    self.modalClosed()
                                    self.sheetDataSource = nil
                                })
                            }
                            .accentColor(.red)
                            .colorScheme(.light)
                        }
                        
                        if self.model.moreToLoad && self.model.data.count >= 20 {
                            Button("Cargar más") {
                                self.model.loadNextPage()
                            }
                            .padding(.top, 40)
//                            ActivityIndicator(isAnimating: .constant(true), style: .medium)
//                                .onAppear {
//                                    self.model.loadNextPage()
//                                }
                        }
                    }
                    .padding(.top, 15)
                    .padding(.bottom, 340)
                    
                    
                }
                
            }
                
            else {
                ZStack {
                    Color.white
                    Text("No se encontraron registros.")
                }
            }
        }
    }
}

struct InsuranceViewPageCompatibility: View {
    let model: InsuranceViewPageModel

    let modalClosed: () -> ()
    let showSinister: (Int) -> ()
    let getCoupons: (String) -> ()
    
    @State var sheetDataSource: SheetDataSource?
    @State var showsError = false
    
    var body: some View {
        ZStack {
            if self.model.source.count > 0 {
                ScrollView(.vertical, showsIndicators: false) {
                    VStack(spacing: 14) {
                        
                        ForEach(0 ..< self.model.source.count, id: \.self) { (el) in
                            Group {
                                if self.model.id != 5 {
                                    LPCard(data: self.model.source[el])
                                        .padding(.horizontal, 14)
                                        .onTapGesture {
                                            let showsDocumentViewer = self.model.type != .general ? self.model.id == 2 : self.model.id == 3
                                            if !showsDocumentViewer, let vd = self.model.source[el] as? PrimaCardViewData, let financingId = vd.prima.financingId  {
                                                self.sheetDataSource = SheetDataSource(queringId: financingId)
                                                self.getCoupons(financingId)
                                                
                                            } else if let url = self.model.source[el].url {
                                                self.sheetDataSource = SheetDataSource(url: url)
                                            } else {
                                                self.showsError.toggle()
                                            }
                                    }
                                } else {
                                    NavigationLink(destination: LazyLoadedView(SiniestroView(model: SiniestroViewModel(siniestroId: self.model.source[el].id), toClear: .constant(nil)))) {
                                        LPCard(data: self.model.source[el])
                                            .padding(.horizontal, 14)
                                    }
                                    .buttonStyle(PlainButtonStyle())
                                }
                                
                            }
                        }
                        .alert(isPresented: self.$showsError) { () -> Alert in
                            Alert(title: Text("Aviso"), message: Text("No se encontraron registros"), dismissButton: .default(Text("Aceptar")))
                        }
                        .sheet(item: self.$sheetDataSource) { (data) in
                            NavigationView {
                                Group {
                                    if data.url != nil && data.queringId == nil {
                                        WebView(url: data.url!, contentType: "application/pdf")
                                            .navigationBarTitle("Documento", displayMode: .inline)
                                    } else if data.queringId != nil {
                                        Group {
                                            if self.model.coupons.count > 0 {
                                                ScrollView(.vertical) {
                                                    VStack(spacing: 25) {
                                                        ForEach(0 ..< self.model.coupons.count, id: \.self) { index in
                                                            LPCard(data: self.model.coupons[index])
                                                                .padding(.horizontal, 20)
                                                        }
                                                        
                                                        Spacer()
                                                    }
                                                    .padding(.top, 50)
                                                }
                                            } else {
                                                VStack{
                                                    ActivityIndicator(isAnimating: .constant(true), style: .medium)
                                                    Text("Cargando...")
                                                }
                                            }
                                        }
                                        .navigationBarTitle("Cupones", displayMode: .inline)
                                    }
                                    else {
                                        Text("No se encontraron cupones relacionados.")
                                            .navigationBarTitle("Cupones", displayMode: .inline)
                                    }
                                }
                                .navigationBarItems(trailing: Button("Cerrar") {
                                    self.modalClosed()
                                    self.sheetDataSource = nil
                                })
                            }
                            .accentColor(.red)
                            .colorScheme(.light)
                        }
                    }
                    .padding(.top, 15)
                    .padding(.bottom, 340)
                    
                    
                }
                
            }
                
            else {
                ZStack {
                    Color.white
                    Text("No se encontraron registros.")
                }
            }
        }
    }
}
