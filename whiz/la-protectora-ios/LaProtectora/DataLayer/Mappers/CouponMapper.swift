//
//  CouponMapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/24/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct CouponMapper: Mapper {
    struct Data: Codable {
        let correlativo: String
        let Financiamiento: Int
        let monto: Double?
        let fecVencimi2: String?
        let fecCancela2: String?
        let FechaFactura2: String?
        let codEstado: Int
        let ESTADO: String?
        let NroCupon: String
    }
    
    var dictionary: [String : Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
    
    func execute() throws -> Coupon {
        guard let data = CouponMapper.Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        return Coupon(id: data.NroCupon, correlativeId: data.correlativo, amount: data.monto ?? 0.0, expirationDate: data.fecVencimi2 ?? "", cancellationDate: data.fecCancela2 ?? "", status: data.ESTADO ?? "")
    }
}
