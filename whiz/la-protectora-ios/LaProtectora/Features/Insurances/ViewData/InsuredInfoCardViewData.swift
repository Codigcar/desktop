//
//  InsuredInfoCardViewData.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/12/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct InsuredInfoCardViewData: LPCardData, Hashable {
    var id: String {
        self.insuredInfo.name
    }
    
    var url: URL?
    
    var insuredInfo: InsuredInfo
    
    var title: String {
        self.insuredInfo.name
    }
    
    var status: String? {
        nil
    }
    
    var description: String {
        ""
    }
    
    var disclosure: LPCardDetailedDisclosure? {
        nil
    }
    
    var rowsData: [SmallRow.Data] {
        [SmallRow.Data(text: "Asegurado", detail: self.insuredInfo.name), SmallRow.Data(text: "Parentesco", detail: self.insuredInfo.relationship), SmallRow.Data(text: "Edad", detail: self.insuredInfo.age), SmallRow.Data(text: "Fecha de Inclusión", detail: self.insuredInfo.inclustionDate)]
    }
}
