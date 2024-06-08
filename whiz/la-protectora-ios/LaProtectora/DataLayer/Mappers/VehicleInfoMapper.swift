//
//  VehicleInfoMapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct VehicleInfoMapper: Mapper {
    struct Data: Codable {
        let codigo: Int?
        let nombre_cliente: String?
        let placa: String
        let clase: String?
        let marca: String?
        let modelo: String?
        let anio: String?
        let estado: String?
        let nro: String
    }
    
    var dictionary: [String : Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
    
    func execute() throws -> VehicleInfo {
        guard let data = VehicleInfoMapper.Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        return VehicleInfo(plate: data.placa, clientName: data.nombre_cliente ?? "", vehicleClass: data.clase ?? "", make: data.marca ?? "", model: data.modelo ?? "", year: data.anio ?? "", status: data.estado ?? "")
    }
}
