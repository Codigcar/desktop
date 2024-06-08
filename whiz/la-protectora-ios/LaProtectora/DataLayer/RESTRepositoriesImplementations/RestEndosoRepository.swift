//
//  RestEndosoRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/21/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct RestEndosoRepository: EndososRepository {
    @Injected var client: NetworkAPIClient
    
    func getEndosos(for polizaId: String) -> AnyPublisher<[Endoso], Error> {
        let data = ["LOCAL_ID_POLIZA": polizaId]
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("polizas/").withEndPoint("endosos").withType(.post).withBodyParams(data)
        return client.call(request: builder.build()).tryMap {
            try $0.compactMap { (data) -> Endoso? in
                try EndosoMapper(dictionary: data).execute()
            }
        }
        .eraseToAnyPublisher()
    }
}
