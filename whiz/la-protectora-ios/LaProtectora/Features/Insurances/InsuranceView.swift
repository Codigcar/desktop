//
//  InsuranceViewM.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/5/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI
import Resolver
import Combine

extension InsuranceView {
    struct DetailData {
        var insuranceNumber: String
        
        var insuranceCompanyName: String
        
        var featuredColor: String
        
        var risk: String
        
        var businessUnit: String
        
        var availability: String
        
        var executiveName: String
    }
}

struct CouponCardViewData: LPCardData {
    var id: String {
        self.coupon.id
    }
    
    var coupon: Coupon
    
    var title: String {
        "Estado"
    }
    
    var status: String?
    
    var description: String {
        "Pendiente"
    }
    
    var disclosure: LPCardDetailedDisclosure?
    
    var rowsData: [SmallRow.Data] {
        [SmallRow.Data(text: "Nro Cupón", detail: coupon.id), SmallRow.Data(text: "Número", detail: coupon.correlativeId), SmallRow.Data(text: "Vencimiento", detail: coupon.expirationDate), SmallRow.Data(text: "Cancelación", detail: coupon.cancellationDate), SmallRow.Data(text: "Monto", detail: "$\(coupon.amount)")]
    }
    
    var url: URL?
    
}



class FilterInfo<T: LPCardData> {
    let filter: Published<String>.Publisher
    let dataSource: [T]
    let result: [T]
    
    init(filter: Published<String>.Publisher, dataSource: [T], result: [T]) {
        self.filter = filter
        self.dataSource = dataSource
        self.result = result
    }
}


class InsuranceViewModel: ObservableObject {
    
    let insuranceId: String
    
    let detailData: InsuranceView.DetailData
    
    var endosos_source = [EndososCardViewData]()
    
    var extra_source: [LPCardData] = [LPCardData]()
    
    var primas_source = [PrimaCardViewData]()
    
    var documentos_source = [DocumentCardViewData]()
    
    var siniestros_source = [SiniestroCardViewData]()
    
    @Published var isDraggingEnabled = true
    
    @Published var endosos = [EndososCardViewData]()
    
    @Published var extra: [LPCardData] = [LPCardData]()
    
    @Published var primas = [PrimaCardViewData]()
    
    @Published var documentos = [DocumentCardViewData]()
    
    @Published var siniestros = [SiniestroCardViewData]()
    
    @Published var coupons = [CouponCardViewData]()
    
    @Published var selectedView = 0
    
    @Published var filter = ""
    
    var sinistersList = [SiniestroInfo]()
        
    @Injected private var getEndososInteractor: GetEndososForInsuranceUseCase
    
    @Injected private var getPrimasInteractor: GetPrimasUseCase
    
    @Injected private var getCouponsInteractor: GetCouponsListInteractor
    
    @Injected private var getDocumentsInteractor: GetPolizaDocumentsListInteractor
    
    @Injected private var getSiniestroInfoListInteractor: GetSiniestroInfoListInteractor
    
    @Injected private var getVehicleInfoListInteractor: GetVehicleInfoListInteractor
    
    @Injected private var getInsuredInfoListInteractor: GetInsuredInfoListInteractor
    
    @Injected private var router: DeepRouter

    private var subscriptions = Set<AnyCancellable>()
    
    var type: RiskGroup.Kind
    
    lazy var items: [HeaderTabBar.Item] = {
        var items = [HeaderTabBar.Item(name: "Detalle", imageName: "detail_icon"), HeaderTabBar.Item(name: "Endosos", imageName: "endoso_icon")]

        if type != .general {
            items.append(HeaderTabBar.Item(name: type == .vehicular ? "Vehículo" : "Asegurados", imageName: type == .vehicular ? "car_small_icon" : "family_icon"))
        }
        
        items.append(contentsOf: [HeaderTabBar.Item(name: "Prima", imageName: "prime_icon"), HeaderTabBar.Item(name: "Documentos", imageName: "documents_icon"), HeaderTabBar.Item(name: "Siniestros", imageName: "warning_outline_icon")])
        
        return items
    }()
    
    var pageData: [[LPCardData]] {
        var pages: [[LPCardData]] = [self.endosos]
        
        if self.type != .general {
            pages.append(self.extra)
        }
        
        pages.append(self.primas)
        pages.append(self.documentos)
        pages.append(self.siniestros)
        return pages
    }

    func pageDataCount(at index: Int) -> Int {
        (pageData.count > 0 && pageData.count > index) ? pageData[index].count : 0
    }
    
    func pageDataElement(at index: Int, item: Int) -> LPCardData {
        let array = pageData[index][item]
        return array
    }
    
    private var isInDeepChildView = false
    
    /// Initialization method
    init(id: String, detail: InsuranceView.DetailData, type: RiskGroup.Kind) {
        self.detailData = detail
        self.type = type
        self.insuranceId = id
        
        setupFilterPublishers()
        self.getData()
        
        NotificationCenter.default.publisher(for: .init("childOnPolizaChild")).sink { (not) in
            guard let userInfo = not.userInfo as? [String: Any], let val = userInfo["isActive"] as? Bool else { return }
            self.isInDeepChildView = val
        }
        .store(in: &self.subscriptions)
        
        Publishers.Merge(
            NotificationCenter.default
                .publisher(for: UIResponder.keyboardWillShowNotification)
                .map { _ in true },
            NotificationCenter.default
                .publisher(for: UIResponder.keyboardWillHideNotification)
                .map { _ in false }
        )
            .eraseToAnyPublisher()
            .sink { [weak self] (val) in
                if self?.isInDeepChildView == false {
                    self?.isDraggingEnabled = !val
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

    func setupFilterPublishers() {
        $filter
            .compactMap { [weak self] (query) -> [EndososCardViewData]? in
                guard let self =  self else { return nil }
                if query != "" && self.selectedView == 1 {
                    return self.endosos_source.filter {
                        self.isTermIncluded(in: $0.id, query: query)
                    }
                }
                return self.endosos_source
        }
        .eraseToAnyPublisher()
        .sink { [weak self] (filtered) in
            if self?.endosos != filtered {
                self?.endosos = filtered
            }
        }
        .store(in: &self.subscriptions)
        
        $filter
            .compactMap { [weak self] (query) -> [PrimaCardViewData]? in
                guard let self = self else { return nil }
                if query != "" && self.selectedView == (self.type == .general ? 2 : 3) {
                   return self.primas_source.filter {
                       self.isTermIncluded(in: $0.id, query: query)
                    }
                }
                return self.primas_source
        }
        .eraseToAnyPublisher()
        .sink { [weak self] (filtered) in
            if self?.primas != filtered {
                self?.primas = filtered
            }
        }
        .store(in: &self.subscriptions)
        
        $filter
            .compactMap { [weak self] (query) -> [DocumentCardViewData]? in
                guard let self = self else { return nil }
                if query != "" && self.selectedView == (self.type == .general ? 3 : 4)  {
                    return self.documentos_source.filter {
                        self.isTermIncluded(in: $0.id, query: query)
                    }
                }
                return self.documentos_source
        }
        .eraseToAnyPublisher()
        .sink { [weak self] (filtered) in
            if self?.documentos != filtered {
                self?.documentos = filtered
            }
        }
        .store(in: &self.subscriptions)
        
        $filter
            .compactMap { [weak self] (query) -> [SiniestroCardViewData]? in
                guard let self = self else { return nil }
                if query != "" && self.selectedView == (self.type == .general ? 4 : 5) {
                    return self.siniestros_source.filter {
                        self.isTermIncluded(in: $0.id, query: query)
                    }
                }
                return self.siniestros_source
        }
        .eraseToAnyPublisher()
        .sink { [weak self] (filtered) in
            if self?.siniestros != filtered {
                self?.siniestros = filtered
            }
        }
        .store(in: &self.subscriptions)
        
        if self.type != .general {
            $filter.compactMap { [weak self] (query) -> [LPCardData]? in
                guard let self = self else { return nil }
                if query != "" && self.selectedView == 2 {
                    return self.extra_source.filter {
                        self.isTermIncluded(in: $0.id, query: query)
                    }
                }
                return self.extra_source
            }
            .eraseToAnyPublisher()
            .sink { [weak self] (filtered) in
                self?.extra = filtered
            }
            .store(in: &self.subscriptions)
        }
    }
    
    func getData() {
        self.getEndosos()
        self.getPrimas()
        self.getDocuments()
        self.getSiniestroInfo()
        
        switch self.type {
        case .human: self.getInsuredInfo()
        case .vehicular: self.getVehicleInfo()
        default: print("Insurance type general no extra info to get")
        }
    }
    
    private func getInsuredInfo() {
        self.getInsuredInfoListInteractor.execute(with: self.insuranceId)
            .map({ (models) -> [InsuredInfoCardViewData] in
                models.map { InsuredInfoCardViewData(insuredInfo: $0) }
            })
            .sink(receiveCompletion: { (completion) in
                print("InsuredInfo repo: ", completion)
            }) { [weak self] (values) in
                self?.extra_source = values
                self?.extra = values
        }
        .store(in: &self.subscriptions)
        
    }
    
    private func getVehicleInfo() {
        self.getVehicleInfoListInteractor.execute(with: self.insuranceId)
        .map({ (models) -> [VehicleInfoCardViewData] in
                models.map { VehicleInfoCardViewData(vehicleInfo: $0) }
            })
            .sink(receiveCompletion: { (completion) in
                print("VehicleInfo repo: ", completion)
            }) { [weak self] (values) in
                self?.extra_source = values
                self?.extra = values
        }
        .store(in: &self.subscriptions)
    }
    
    private func getEndosos() {
        self.getEndososInteractor.execute(polizaId: self.insuranceId)
            .map({ (models) -> [EndososCardViewData] in
                models.map { EndososCardViewData(endoso: $0) }
            })
            .sink(receiveCompletion: { (completion) in
                print("Endosos repo: ", completion)
            }) { [weak self] (endosos) in
                self?.endosos_source = endosos
                self?.endosos = endosos
        }
        .store(in: &self.subscriptions)
    }
    
    func getCoupons(for financingId: FinancingId) {
        self.coupons.removeAll()
        
        self.getCouponsInteractor.execute(for: financingId)
            .map({ (models) -> [CouponCardViewData] in
                models.map { CouponCardViewData(coupon: $0) }
            })
            .sink(receiveCompletion: { (completion) in
                print("Coupon repo: ", completion)
            }) { [weak self] (values) in
                self?.coupons = values
        }
        .store(in: &self.subscriptions)
    }
    
    private func getSiniestroInfo() {
        self.getSiniestroInfoListInteractor.execute(with: self.insuranceId)
            .sink(receiveCompletion: { (completion) in
                print("SubuestroInfo repo: ", completion)
            }) { [weak self] (siniestros) in
                //                self?.sinistersList = siniestros
                let vals =  siniestros.map { (model) -> SiniestroCardViewData in
                    SiniestroCardViewData(siniestroInfo: model)
                }
                self?.siniestros_source = vals
                self?.siniestros = vals
        }
        .store(in: &self.subscriptions)
    }
    
    private func getPrimas() {
        self.getPrimasInteractor.execute(polizaId: self.insuranceId)
            .map({ (models) -> [PrimaCardViewData] in
                models.map { PrimaCardViewData(prima: $0) }
            })
            .sink(receiveCompletion: { (completion) in
                print("Prima repo: ", completion)
            }) { [weak self] (primas) in
                self?.primas_source = primas
                self?.primas = primas
        }
        .store(in: &self.subscriptions)
    }
    
    private func getDocuments() {
        self.getDocumentsInteractor.execute(with: self.insuranceId)
            .map({ (models) -> [DocumentCardViewData] in
                models.map { DocumentCardViewData(document: $0) }
            })
            .sink(receiveCompletion: { (completion) in
                print("Document repo: ", completion)
            }) { [weak self] (vals) in
                self?.documentos_source = vals
                self?.documentos = vals
        }
        .store(in: &self.subscriptions)
    }
    
    func modalClosed() {
        self.router.modalClosed.send(())
    }
    
    func showSinister(index: Int) {
        let model = self.sinistersList[index]
        self.router.showSinister.send(model)
    }
}

struct SheetDataSource: Identifiable {
    var id: String = UUID().uuidString
    var url: URL?
    var queringId: String?
}


struct InsuranceView: View {
    @ObservedObject var model: InsuranceViewModel
    
    private var detailView: some View {
        VStack(spacing: 4) {
            BigTitleRow(text: "Nº de Póliza", detail: model.detailData.insuranceNumber)
            BigRow(text: "Aseguradora", detail: model.detailData.insuranceCompanyName, featuredColor: model.detailData.featuredColor)
            BigRow(text: "Riesgo", detail: model.detailData.risk)
            BigRow(text: "Unidad de Negocio", detail: model.detailData.businessUnit)
            BigRow(text: "Vigencia", detail: model.detailData.availability)
            BigRow(text: "Ejecutivo", detail: model.detailData.executiveName)
            
            Spacer()
            
        }
        .padding(.horizontal, 14)
    }
    
    var body: some View {
        ZStack(alignment: .top) {
            Color.white.edgesIgnoringSafeArea(.all)
            
            VStack(spacing: 5) {
                HeaderTabBar(items: model.items, selectedItem: self.$model.selectedView)
                
                if model.selectedView != 0 {
                    SearchBar(text: self.$model.filter)
                }
                
                PaginatedView(model.items.count, orientation: .horizontal, alignment: .top, currentIndex: self.$model.selectedView, dragToDismiss: .inactive, backgroundColor: .white, isDragEnabled: self.model.isDraggingEnabled) { (index, transform) in
                    
                    if index == 0 {
                        self.detailView
                            .padding(.top, 15)
                        
                    } else {
                        if #available(iOS 14.0, *) {
                            InsuranceViewPage(model: InsuranceViewPageModel(id: index, source: self.model.pageData[index - 1], coupons: self.model.coupons, type: self.model.type), modalClosed: {
                                self.model.modalClosed()
                            }, showSinister: { (index) in
                                self.model.showSinister(index: index)
                            }, getCoupons: { (id) in
                                self.model.getCoupons(for: id)
                            })
                        } else {
                            InsuranceViewPageCompatibility(model: InsuranceViewPageModel(id: index, source: self.model.pageData[index - 1], coupons: self.model.coupons, type: self.model.type), modalClosed: {
                                self.model.modalClosed()
                            }, showSinister: { (index) in
                                self.model.showSinister(index: index)
                            }, getCoupons: { (id) in
                                self.model.getCoupons(for: id)
                            })
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
            .navigationBarTitle("Póliza", displayMode: .inline)
        
    }
}

struct InsuranceView_Previews: PreviewProvider {
    static var previews: some View {
        InsuranceView(model: Mocker.generalInsuranceData)
        
    }
}
