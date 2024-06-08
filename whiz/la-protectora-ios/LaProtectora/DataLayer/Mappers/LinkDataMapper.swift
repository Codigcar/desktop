//
//  LinkDataMapper.swift
//  LaProtectora
//
//  Created by Serguei on 24/01/22.
//  Copyright © 2022 Whiz. All rights reserved.
//

import Foundation

struct LinkDataMapper: Mapper {        
    struct Data: Codable {
        let IdCanal: String
        let CodigoExternoEmpresaExterna: String
        let LinkPronostik: String
        let RespuestaMensaje: String
        let CodigoMensaje: Int
    }
    
    var dictionary: [String : Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
    
    func execute() throws -> LinkData{
        guard let data = Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        return LinkData(channelId: data.IdCanal, pronostikLink: data.LinkPronostik, externalCode: data.CodigoExternoEmpresaExterna)
    }
}
