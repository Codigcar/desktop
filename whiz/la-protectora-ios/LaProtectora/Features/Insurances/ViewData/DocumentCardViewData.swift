//
//  DocumentCardViewData.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/12/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct DocumentCardViewData: LPCardData, Hashable {
    var id: String {
        document.number
    }
    
    var url: URL? {
        guard let string = document.url?.absoluteString else { return nil }
        let valid = string.contains("http") || string.contains("https")
        if valid {
            return document.url
        } else {
            let str = "https://".appending(string)
            return URL(string: str)
        }
    }
    
    var document: Document
    
    var title: String {
        "Nº de Documento"
    }
    
    var status: String? { nil }
    
    var description: String {
        document.number

    }
    
    var disclosure: LPCardDetailedDisclosure? {
        LPCardDetailedDisclosure(imageName: "documents_icon", text: "Documento")
    }
    
    var rowsData: [SmallRow.Data] {
        [SmallRow.Data(text: "Tipo", detail: self.document.type), SmallRow.Data(text: "Archivo", detail: document.archiveDescription ?? String(document.archiveCode))]
    }
}
