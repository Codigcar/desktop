//
//  EndosoMapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/21/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct EndosoMapper: Mapper {
    struct Data: Codable {
        let nro_endoso: String
        let nro_liquidacion: String
        let detalle: String?
        let vigencia: String?
        let ruta: String?
        let FinVigAnexo: String?
        let nro: String

    }
    
    var dictionary: [String : Any]
    
    init(dictionary: [String : Any]) {
        self.dictionary = dictionary
    }
    
    func execute() throws -> Endoso {
        guard let data = EndosoMapper.Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        return Endoso(number: data.nro_endoso, liquidacionNumber: data.nro_liquidacion, vailidity: data.vigencia ?? "", detail: data.detalle ?? "", documentUrl: data.ruta != nil ? URL(string: data.ruta!) : nil)
    }
}
