//
//  InsuredVehicleMapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/28/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct InsuredVehicleMapper: Mapper {
    struct Data: Codable {
        let nro_placa: String?, aseguradora: String?, cia_telefono_emergencia: String?, CiaSeg: Int?, logoASG2: URL?
    }
    
    var dictionary: [String : Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
    
    func execute() throws -> InsuredVehicle {
        guard let data = InsuredVehicleMapper.Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        return InsuredVehicle(plate: data.nro_placa ?? "", insuranceCompany: InsuranceCompany(name: data.aseguradora ?? "", color: nil, logoUrl: data.logoASG2, phoneNumber: data.cia_telefono_emergencia))
    }
}
