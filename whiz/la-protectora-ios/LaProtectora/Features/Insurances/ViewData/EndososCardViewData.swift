//
//  EndososCardViewData.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/12/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct EndososCardViewData: LPCardData, Hashable {
    var id: String {
        self.endoso.number
    }
    
    var url: URL? {
        guard let string = endoso.documentUrl?.absoluteString else { return nil }
        let valid = string.contains("http") || string.contains("https")
        if valid {
            return endoso.documentUrl
        } else {
           let str = "https://".appending(string)
            return URL(string: str)
        }
    }
    
    var endoso: Endoso
    
    var title: String {
        "Nº Endoso"
    }
    
    var status: String? {
        nil
    }
    
    var description: String {
        self.endoso.number
    }
    
    var disclosure: LPCardDetailedDisclosure? {
        LPCardDetailedDisclosure(imageName: "endosos_big_icon", text: "Endoso")
    }
    
    var rowsData: [SmallRow.Data] {
        [SmallRow.Data(text: "N° de liquidación", detail: self.endoso.liquidacionNumber), SmallRow.Data(text: "Fecha de vigencia", detail: self.endoso.vailidity), SmallRow.Data(text: "Detalle : ", detail: self.endoso.detail)]
    }
}
