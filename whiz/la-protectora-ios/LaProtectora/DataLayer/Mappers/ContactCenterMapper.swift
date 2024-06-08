//
//  ContactCenterMapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 9/1/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct ContactCenterMapper: Mapper {
    struct Data: Codable {
        let descripcion: String
        let telefonoFijo: String
        let telefonoMovil: String
        let mensajeTelefonoFijo: String
        let mensajeDedicatoria: String
        let correoElectronico: String
    }
    
    var dictionary: [String : Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
    
    func execute() throws -> ContactCenter {
        guard let data = ContactCenterMapper.Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        return ContactCenter(phone: data.telefonoFijo, cellphone: data.telefonoMovil, email: data.correoElectronico, moto: data.descripcion)
    }
}
