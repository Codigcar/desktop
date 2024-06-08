//
//  SiniestroCardViewData.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/12/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct SiniestroCardViewData: LPCardData, Hashable {
    var id: String {
        String(self.siniestroInfo.siniestroId)
    }
    
    var url: URL?
    
    var siniestroInfo: SiniestroInfo
    
    var title: String {
        "Nº de Siniestro"
    }
    
    var status: String? {
        nil
    }
    
    var description: String {
        String(self.siniestroInfo.siniestroId)
    }
    
    var disclosure: LPCardDetailedDisclosure? {
        LPCardDetailedDisclosure(imageName: "warning_outline_big_icon", text: "Documento")
    }
    
    var rowsData: [SmallRow.Data] {
        [SmallRow.Data(text: "Tipo", detail: self.siniestroInfo.description), SmallRow.Data(text: "Estado", detail: self.siniestroInfo.status), SmallRow.Data(text: "Aseguradora", detail: self.siniestroInfo.insuranceCompany.name, url: self.siniestroInfo.insuranceCompany.logoUrl), SmallRow.Data(text: "Fecha de ocurrencia", detail: self.siniestroInfo.date)]
    }
    
    
}
