//
//  ExecutiveMapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 9/1/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

struct ExecutiveMapper: Mapper {
    struct Data: Codable {
        let nombreEjecutivo: String?
        let celularEjecutivo: String?
        let telefonoEjecutivo: String?
        let correoEjecutivo: String?
        let cargoEjecutivo: String?
        let rutaLogoEjecutivo: URL?
        var imagenesRiesgosEjecutivos: String?
    }
    
    var dictionary: [String : Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
    
    func execute() throws -> Executive {
        guard let data = ExecutiveMapper.Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        var urls = [URL]()
        if let imagesUrls = data.imagenesRiesgosEjecutivos {
            urls = imagesUrls.split(separator: ",").compactMap({ (string) -> URL? in
                return URL(string: String(string))
            })
        }
        return Executive(id: nil, name: data.nombreEjecutivo ?? "", phone: data.telefonoEjecutivo ?? "", email: data.correoEjecutivo, cellPhone: data.celularEjecutivo, pictureUrl: data.rutaLogoEjecutivo, iconsUrls: urls, position: data.cargoEjecutivo)
    }
}
