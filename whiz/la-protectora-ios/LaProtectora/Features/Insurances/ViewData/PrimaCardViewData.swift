//
//  PrimaCardViewData.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/12/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct PrimaCardViewData: LPCardData, Hashable {
    var id: String {
        self.prima.number
    }
    
    var url: URL?
    
    var prima: Prima
    
    var title: String {
        "Nº de Prima"
    }
    
    var status: String? { nil }
    
    var description: String {
        self.prima.number
    }
    
    var disclosure: LPCardDetailedDisclosure? {
        LPCardDetailedDisclosure(imageName: "prime_big_icon", text: "Cuponeras")
    }
    
    var rowsData: [SmallRow.Data] {
        [SmallRow.Data(text: "Aseguradora", detail: self.prima.insuranceCompany), SmallRow.Data(text: "Riesgo", detail: self.prima.risk), SmallRow.Data(text: "Fecha de vigencia", detail: self.prima.availabilty), SmallRow.Data(text: "Prima Total (Incluye IGV)", detail: "US$ \(self.prima.total)")]
    }
}
