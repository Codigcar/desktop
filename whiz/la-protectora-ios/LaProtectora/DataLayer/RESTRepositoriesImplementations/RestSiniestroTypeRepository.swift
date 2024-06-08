//
//  SiniestroTypeRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/28/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct RestSiniestroTypeRepository: SiniestroTypeRepository {
    @Injected var client: NetworkAPIClient
    
    func getSiniestroTypeList() -> AnyPublisher<[SiniestroType], Error> {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("tipo/").withEndPoint("siniestros").withType(.post)

        let request = builder.build()
        return client.call(request: request)
            .tryMap {
                try $0.compactMap { (data) -> SiniestroType? in
                    try SiniestroTypeMapper(dictionary: data).execute()
                }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
}
