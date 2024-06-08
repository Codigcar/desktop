//
//  PrimaMapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/24/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

struct PrimaMapper: Mapper {
    struct Data: Codable {
        let DocumentoPrima: String
        let aseguradora: String?
        let riesgo: String?
        let FECEMIF: String?
        let factura:String?
        let FECVIG: String?
        let prima_total: String?
        let Financiamiento: Int?
        let cant_letra: Int?
        let clase: String?
    }
    
    var dictionary: [String : Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
    
    func execute() throws -> Prima {
        guard let data = PrimaMapper.Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        return Prima(number: data.DocumentoPrima, insuranceCompany: data.aseguradora ?? "", risk: data.riesgo ?? "", availabilty: data.FECVIG ?? "", total: data.prima_total ?? "", financingId: data.Financiamiento != nil ? String(data.Financiamiento!) : nil)
    }
}
