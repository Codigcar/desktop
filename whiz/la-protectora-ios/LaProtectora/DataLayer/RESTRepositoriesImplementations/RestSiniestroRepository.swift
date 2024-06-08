//
//  RestSiniestroRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/26/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Resolver
import Combine

struct RestSiniestroRepository: SiniestroRepository {
    @Injected var client: NetworkAPIClient
    
    func getSiniestro(with id: SiniestroId) -> AnyPublisher<Siniestro, Error> {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("resumen/").withEndPoint("siniestros").withType(.post)
            .withBodyParams(["LOCAL_ID_SINIESTRO": id])
        let request = builder.build()
        return client.call(request: request)
            .tryMap {
                try SiniestroMapper(dictionary: $0[0]).execute()
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()

    }
}
