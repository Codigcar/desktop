//
//  InsuranceMapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/20/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct InsuranceMapper: Mapper {
    struct Data: Codable {
        let NroPoliza: String
        let telefonoFijoEjecutivo: String?
        let idPoliza: Int
        let nombre_corto_funcionario: String?
        let telefono_funcionario: String?
        let idFuncionario: Int
        let ID_GRUPORIESGO: Int
        let nombre_cliente: String?
        let detalle: String?
        let nombre_riesgo: String?
        let VIGENCIA: String?
        let ESTADO: String
        let ASEGURADORA: String?
        let colorAseguradora: String?
        let logoASG: String?
        let idUniNeg: Int
        let unidadNegocio: String?
    }
    
    func execute() throws -> Insurance {
        guard let data = InsuranceMapper.Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        return Insurance(clientName: data.nombre_cliente ?? "", number: data.NroPoliza, id: data.idPoliza, executive: Executive(id: data.idFuncionario, name: data.nombre_corto_funcionario ?? "", phone: data.telefono_funcionario ?? ""), riskGroup: RiskGroup(id: data.ID_GRUPORIESGO, name: data.nombre_riesgo ?? "", imageUrl: nil, type: RiskGroup.Kind(rawValue: data.ID_GRUPORIESGO) ?? RiskGroup.Kind.unknown), validity: data.VIGENCIA ?? "", detail: data.detalle ?? "", insuranceCompany: InsuranceCompany(name: data.ASEGURADORA ?? "", color: data.colorAseguradora, logoUrl: data.logoASG != nil ? URL(string: data.logoASG!) : nil, phoneNumber: nil), businessUnit: BusinessUnit(id: data.idUniNeg, name: data.unidadNegocio ?? ""), state: Insurance.Status.init(rawValue: data.ESTADO) ?? Insurance.Status.invalid)
    }
    
    var dictionary: [String: Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
}
