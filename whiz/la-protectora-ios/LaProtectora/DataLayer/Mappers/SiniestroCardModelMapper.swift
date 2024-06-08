//
//  SiniestroCardModelMapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct SiniestroCardModelMapper: Mapper {
    struct Data: Codable {
        let SiniestroLP: Int
        let NroSiniestro: String?
        let idPoliza: Int
        let NroPoliza: String
        let EjecutivoSiniestro: String?
        let datosEjecutivoSiniestro: String?
        let telefonoEjecutivoSiniestro: String?
        let descripcion: String?
        let idRiesgo: Int
        let riesgo: String?
        let ubicacion: String?
        let fechaOcurrencia: String
        let ESTADOSINI: String?
        let Aseguradora: String?
        let colorAseguradora: String?
    }
    
    var dictionary: [String : Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
    
    func execute() throws -> SiniestroCardModel {
        guard let data = SiniestroCardModelMapper.Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        return SiniestroCardModel(id: data.SiniestroLP, executive: Executive(id: nil, name: data.EjecutivoSiniestro ?? "", phone: data.datosEjecutivoSiniestro ?? ""), risk: Risk(name: data.riesgo ?? "", id: data.idRiesgo), status: data.ESTADOSINI ?? "", insuranceCompany: InsuranceCompany(name: data.Aseguradora ?? "", color: data.colorAseguradora ?? "", logoUrl: nil, phoneNumber: nil), date: data.fechaOcurrencia)
    }
}
