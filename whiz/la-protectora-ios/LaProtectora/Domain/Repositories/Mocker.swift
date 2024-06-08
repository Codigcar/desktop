//
//  Mocker.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/12/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct Mocker {
    static var endososCardData = [EndososCardViewData(endoso: Endoso(number: "12334452", liquidacionNumber: "12334452", vailidity: "Del 09. 01. 2019  al 17. 09. 2019", detail: "Inclusión de vehículo con placa"))]
    
    static var vehiclesCardsData = [VehicleInfoCardViewData(vehicleInfo: VehicleInfo(plate: "ATJ077", clientName: "Carlos Castro Tavara", vehicleClass: "Camioneta Rural 4x4", make: "Mazda", model: "CX-5", year: "2016", status: "Activo"))]
    
    static var insuredInfoCardsData = [InsuredInfoCardViewData(insuredInfo: InsuredInfo(name: "Chang Becerra Carlos Fred", relationship: "TITULAR", age: "39", inclustionDate: "01/07/2009"))]
    
    static var primaCardsData = [PrimaCardViewData(prima: Prima(number: "703667674", insuranceCompany: "Rimac", risk: "Vehículos", availabilty:  "Del 09. 01. 2019  al 17. 09. 2019", total: "641.72")), PrimaCardViewData(prima: Prima(number: "703667674", insuranceCompany: "Rimac", risk: "Vehículos", availabilty:  "Del 09. 01. 2019  al 17. 09. 2019", total: "641.72"))]
    
    
    static var documentCardData = [DocumentCardViewData(document: Document(number: "4781", type: "General", archiveCode: 16654885)), DocumentCardViewData(document: Document(number: "4781", type: "General", archiveCode: 16654885))]
    
    static var siniestrosCardsData = [SiniestroCardViewData(siniestroInfo: SiniestroInfo(insuranceCompany: InsuranceCompany(name: "Pacigico Seguros", color: nil, logoUrl: nil, phoneNumber: nil), description: "Robo Con Fractura", date: "16/06/2020", status: "Cerrado", risk: Risk(name: "Transporte Terrestre", groupId: 1), siniestroId: 15672630))]
    
    static var vehicularInsuranceData: InsuranceViewModel {
        let detail = InsuranceView.DetailData(insuranceNumber: "223015682", insuranceCompanyName: "Rimac", featuredColor: "", risk: "Transporte Terrestre", businessUnit: "Seguros Corporaivos", availability: "17/05/2020 al 17/05/2021", executiveName: "Francesca Rezzio")
        let model = InsuranceViewModel(id: "78902", detail: detail, type: .vehicular)
        model.endosos = self.endososCardData
        model.extra = self.vehiclesCardsData
        model.primas = self.primaCardsData
        model.documentos = self.documentCardData
        model.siniestros = self.siniestrosCardsData
        return model
    }
    
    static var generalInsuranceData: InsuranceViewModel {
        let detail = InsuranceView.DetailData(insuranceNumber: "223015682", insuranceCompanyName: "Rimac", featuredColor: "", risk: "Transporte Terrestre", businessUnit: "Seguros Corporaivos", availability: "17/05/2020 al 17/05/2021", executiveName: "Francesca Rezzio")
        let model = InsuranceViewModel(id: "78902", detail: detail, type: .general)
        model.endosos = self.endososCardData
        model.extra = self.vehiclesCardsData
        model.primas = self.primaCardsData
        model.documentos = self.documentCardData
        model.siniestros = self.siniestrosCardsData
        return model
        
    }
    
    static var healthInsuranceData: InsuranceViewModel {
       let detail = InsuranceView.DetailData(insuranceNumber: "223015682", insuranceCompanyName: "Rimac", featuredColor: "", risk: "Transporte Terrestre", businessUnit: "Seguros Corporaivos", availability: "17/05/2020 al 17/05/2021", executiveName: "Francesca Rezzio")
        let model = InsuranceViewModel(id: "78902", detail: detail, type: .human)
        model.endosos = self.endososCardData
        model.extra = self.vehiclesCardsData
        model.primas = self.primaCardsData
        model.documentos = self.documentCardData
        model.siniestros = self.siniestrosCardsData
        return model

    }
    
    static var followupCardData = [FollowUpCardViewData(followUp: FollowUp(number: "01", activityDate: "20/05/2019 hasta 20/05/2019", registerDate: "20/05/2019 hasta 20/05/2019", executive: "Roberto Soriano López", description: "SE HA CREADO UN NUEVO SINIESTRO", status: "Pendiente")), FollowUpCardViewData(followUp: FollowUp(number: "01", activityDate: "20/05/2019 hasta 20/05/2019", registerDate: "20/05/2019 hasta 20/05/2019", executive: "Roberto Soriano López", description: "SE HA CREADO UN NUEVO SINIESTRO", status: "Pendiente"))]
    
    static var executivesData = [ExecutiveCardData(pictureUrl: URL(string: "https://t3.ftcdn.net/jpg/02/52/83/90/240_F_252839005_KHiQj68rSeS5CsBrhzXDdQk4NNw051wF.jpg"), name: "Sandra Rodríguez", title: "Apoderada De Cuentas", phone: "(511) 509 627", cellphone: "999 509 627", email: "srodriguez@gmail.com", insurancesHandled: [SmallCardItem(name: "Vehicular", url: URL(string: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Circle-icons-car.svg/1200px-Circle-icons-car.svg.png"), type: .vehicular)])]
}
