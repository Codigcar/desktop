//
//  InsuranceTypeMapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/20/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct RiskGroupMapper: Mapper {
    struct Data: Codable {
        let codigo: Int
        let respuestaMsg: String
        let ID_GRUPORIESGO: Int
        let GRUPO_RIESGO: String?
        let grupo_riesgo_ivo: String
        let rutaImagenGrupoRiesgo: URL
    }
        
    var dictionary: [String: Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
    
    func execute() throws -> RiskGroup {
        guard let data = RiskGroupMapper.Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        let insuranceType = RiskGroup(id: data.ID_GRUPORIESGO, name: data.grupo_riesgo_ivo, imageUrl: data.rutaImagenGrupoRiesgo, type: RiskGroup.Kind(rawValue: data.ID_GRUPORIESGO) ?? RiskGroup.Kind.unknown)
        return insuranceType
    }
}
