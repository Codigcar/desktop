//
//  RestExecutiveRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 9/1/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Resolver
import Combine

struct RestExecutiveRepository: ExecutiveRepository {
    @Injected private var client: NetworkAPIClient
    
    func getAccountExecutives(for riskGroupId: String, userId: UserID, businessUnitId: String) -> AnyPublisher<[Executive], Error> {
        let data: [String: Any] = ["GRUPO_RIESGO": riskGroupId, "CODIGO_CLIENTE":  userId, "UNIDAD_NEGOCIO": businessUnitId]
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("ejecutivos/grupo/").withEndPoint("riesgo").withBodyParams(data).withType(.post)
        let request = builder.build()
        return client.call(request: request).tryMap { (vals) -> [Executive] in
            try vals.map { (dic) -> Executive in
                try ExecutiveMapper(dictionary: dic).execute()
            }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
    
    func getSinisterExecutives(for userId: UserID) -> AnyPublisher<[Executive], Error> {
        let data: [String: Any] = ["CODIGO_CLIENTE": userId , "OPTION": 1]
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("ejecutivos/siniestros/").withEndPoint("cliente").withBodyParams(data).withType(.post)
        let request = builder.build()
        return client.call(request: request).tryMap { (vals) -> [Executive] in
           try vals.map { (dic) -> Executive in
                try ExecutiveMapper(dictionary: dic).execute()
            }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
        
    }
}
