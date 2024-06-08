//
//  SiniestroTypeMapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/28/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct SiniestroTypeMapper: Mapper {
    struct Data: Codable {
        let codigoTipoSiniestro: String, nombreTipoSiniestro: String, imagenRutaTipoSiniestro: URL?
    }
    
    var dictionary: [String : Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
    
    func execute() throws -> SiniestroType {
        guard let data = SiniestroTypeMapper.Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        return SiniestroType(id: data.codigoTipoSiniestro, name: data.nombreTipoSiniestro, imageUrl: data.imagenRutaTipoSiniestro)

    }
}
