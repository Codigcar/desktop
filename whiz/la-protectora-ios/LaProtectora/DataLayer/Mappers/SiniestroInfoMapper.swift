//
//  SiniestroMapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/24/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

struct SiniestroInfoMapper: Mapper {
    struct Data: Codable {
        let logoASG: String?
        let RIESGO: String?
        let asegurado: String?
        let tiposiniestro: String?
        let monto_perdida: String?
        let MONEDA: String?
        let FECOCU: String?
        let FECHAINDEMNIZACION: String?
        let ESTADO: String?
        let Siniestro: Int
        let ID_GRUPORIESGO: Int
    }
    
    var dictionary: [String : Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
    
    func execute() throws -> SiniestroInfo {
        guard let data = SiniestroInfoMapper.Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        let siniestro = SiniestroInfo(insuranceCompany: InsuranceCompany(name: data.logoASG ?? "", color: nil, logoUrl: URL(string: data.logoASG ?? ""), phoneNumber: nil), description: data.tiposiniestro ?? "", date: data.FECOCU ?? "", status: data.ESTADO ?? "", risk: Risk(name: data.RIESGO ?? "", groupId: data.ID_GRUPORIESGO), siniestroId: data.Siniestro)
        return siniestro
    }
}
