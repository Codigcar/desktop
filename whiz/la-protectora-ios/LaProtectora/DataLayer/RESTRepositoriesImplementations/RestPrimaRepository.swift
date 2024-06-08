//
//  RestPrimaRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/24/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct RestPrimaRepository: PrimaRepository {
    @Injected var client: NetworkAPIClient
    
    func getPrimas(for polizaId: PolizaId) -> AnyPublisher<[Prima], Error> {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("polizas/").withEndPoint("primas").withBodyParams(["LOCAL_ID_POLIZA": polizaId]).withType(.post)
        let request = builder.build()
        return client.call(request: request)
            .tryMap {
                try $0.compactMap { (data) -> Prima? in
                    try PrimaMapper(dictionary: data).execute()
                }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
}

