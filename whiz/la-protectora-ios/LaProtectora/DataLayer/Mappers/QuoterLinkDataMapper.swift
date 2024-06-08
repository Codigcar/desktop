//
//  QuoterLinkDataMapper.swift
//  LaProtectora
//
//  Created by Serguei on 25/01/22.
//  Copyright © 2022 Whiz. All rights reserved.
//

import Foundation

struct QuoterLinkDataMapper: Mapper {
    struct Data: Codable {
        let linkCotizador: String
        let RespuestaMensaje: String
        let CodigoMensaje: Int
    }
    
    var dictionary: [String : Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
    
    func execute() throws -> QuoterLinkData{
        guard let data = Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        return QuoterLinkData(responseMessage: data.RespuestaMensaje, quoterLink: data.linkCotizador)
    }
}
