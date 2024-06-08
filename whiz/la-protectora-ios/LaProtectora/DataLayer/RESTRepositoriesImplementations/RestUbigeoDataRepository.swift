//
//  RestUbigeoDataRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/31/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct RestUbigeoDataRepository: UbigeoDataRepository {
    @Injected private var client: NetworkAPIClient
    
    func getDepartments() -> AnyPublisher<[UbigeoData], Error> {
        let data: [String: Any] = ["OPTION": 1, "CODIGO_UBIGEO": ""]
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("filtros/ubigeo/").withEndPoint("ubigeo").withBodyParams(data).withType(.post)
        let request = builder.build()
        return client.call(request: request).map { (vals) -> [UbigeoData] in
            vals.map { (dic) -> UbigeoData in
                UbigeoData(dictionary: dic)!
            }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
    
    func getDistricts(for code: String) -> AnyPublisher<[UbigeoData], Error> {
        let data: [String: Any] = ["OPTION": 3, "CODIGO_UBIGEO": code]
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("filtros/ubigeo/").withEndPoint("ubigeo").withBodyParams(data).withType(.post)
        let request = builder.build()
        return client.call(request: request).map { (vals) -> [UbigeoData] in
            vals.map { (dic) -> UbigeoData in
                UbigeoData(dictionary: dic)!
            }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
        
    }
    
    func getProvinces(for code: String) -> AnyPublisher<[UbigeoData], Error> {
        let data: [String: Any] = ["OPTION": 2, "CODIGO_UBIGEO": code]
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("filtros/ubigeo/").withEndPoint("ubigeo").withBodyParams(data).withType(.post)
        let request = builder.build()
        return client.call(request: request).map { (vals) -> [UbigeoData] in
            vals.map { (dic) -> UbigeoData in
                return UbigeoData(dictionary: dic)!
            }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
        
    }
}
