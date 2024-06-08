//
//  FollowUpMapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/26/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct FollowUpMapper: Mapper {
    struct Data: Codable {
        let nro: String?
        let id_ope: Int
        let ejecutivo: String?
        let descripcion: String?
        let fch_act: String?
        let estado: String?
        let fch_reg_fch_res: String?
    }
    
    var dictionary: [String : Any]
    
    init(dictionary: [String : Any]) {
        self.dictionary  = dictionary
    }
    
    func execute() throws -> FollowUp {
         guard let data = FollowUpMapper.Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        return FollowUp(number: String(data.id_ope), activityDate: data.fch_act ?? "", registerDate: data.fch_reg_fch_res ?? "", executive: data.ejecutivo ?? "", description: data.descripcion ?? "", status: data.estado ?? "")
    }
}
