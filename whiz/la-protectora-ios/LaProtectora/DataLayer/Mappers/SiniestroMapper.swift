//
//  SiniestroMapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/26/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct SiniestroMapper: Mapper {
    struct Data: Codable {
        let aseguradora: String?
        let fecha_ocurrencia: String
        let colorAseguradora: String?
        let cobertura: String?
        let detalle: String?
        let riesgo: String?
        let perdida: String?
        let deducible: String?
        let indemnizado: String?
        let nroPoliza: String
        let vc_sini_nombre_ejec: String?
        let vc_sini_telf_ejec: String?
        let vc_sini_telf_fijo_ejec: String?
        let vc_sini_cel_ejec: String?
        let vc_sini_email_ejec: String?
        let descripcion_ultimo_seguimiento: String?
        let fch_recepcion: String
    }
    
    var dictionary: [String : Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
    
    func execute() throws -> Siniestro {
        guard let data = SiniestroMapper.Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        return Siniestro(number: nil, status: nil, insuranceCompany: InsuranceCompany(name: data.aseguradora ?? "", color: data.colorAseguradora, logoUrl: nil, phoneNumber: nil), date: data.fecha_ocurrencia, receptionDate: data.fch_recepcion, coverage: data.cobertura ?? "", risk: Risk(name: data.riesgo ?? "", id: nil, groupId: nil), detail: data.detalle ?? "", expenses: data.perdida ?? "", deduction: data.deducible ?? "", indemizacion: data.indemnizado ?? "", polizaNumber: data.nroPoliza, lastFollowUp: data.descripcion_ultimo_seguimiento ?? "", executive: Executive(id: nil, name: data.vc_sini_nombre_ejec ?? "", phone: data.vc_sini_telf_ejec ?? ""))

    }
}
