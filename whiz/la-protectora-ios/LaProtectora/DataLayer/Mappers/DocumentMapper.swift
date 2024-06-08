//
//  DocumentMapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/24/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct DocumentMapper: Mapper {
    struct Data: Codable {
        let VALTIP: String?, ruta: String?, idDocumento: String, documento: Int, nombre_archivo: String?
    }
    
    var dictionary: [String : Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
    
    func execute() throws -> Document {
        guard let data = DocumentMapper.Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        return Document(number: data.idDocumento, type: data.VALTIP ?? "", archiveCode: data.documento, url: data.ruta != nil ? URL(string: data.ruta!) : nil, archiveDescription: data.nombre_archivo)
    }
}
