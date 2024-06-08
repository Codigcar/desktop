//
//  SiniestroGroupMapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct SiniestroGroupMapper: Mapper {
    struct Data: Codable {
        let codigo: Int
        let respuestaMsg: String?
        let ID_GRUPORIESGO: Int
        let GRUPO_RIESGO: String?
        let grupo_riesgo_ivo: String?
        let rutaImagenGrupoRiesgo: String?
    }
    
    var dictionary: [String : Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
    
    func execute() throws -> SiniestroGroup {
        guard let data = SiniestroGroupMapper.Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        return SiniestroGroup(id: data.ID_GRUPORIESGO, name: data.grupo_riesgo_ivo ?? "", imageUrl: data.rutaImagenGrupoRiesgo != nil ? URL(string: data.rutaImagenGrupoRiesgo!) : nil)
     }
}
