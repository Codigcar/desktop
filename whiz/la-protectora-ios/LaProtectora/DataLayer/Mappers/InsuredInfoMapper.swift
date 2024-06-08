//
//  InsuredInfoMapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct InsuredInfoMapper: Mapper {
    struct Data: Codable {
        let codigo: Int
        let grupo_familiar_asegurado: String
        let titular: String?
        let asegurado: String?
        let sexo: String?
        let dependiente: String?
        let edad: String?
        let plan_asegurado: String?
        let fecha_inclusion: String?
        let nro: String
    }
    
    var dictionary: [String : Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
    
    func execute() throws -> InsuredInfo {
        guard let data = InsuredInfoMapper.Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        return InsuredInfo(name: data.asegurado ?? "", relationship: data.dependiente ?? "", age: data.edad ?? "", inclustionDate: data.fecha_inclusion ?? "")
    }
}
