//
//  RestSiniestroInfoRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/24/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Resolver
import Combine

struct RestSiniestroInfoRepository: SiniestroInfoRepository {
    @Injected var client: NetworkAPIClient
    
    func getSiniestroInfoList(for polizaId: PolizaId) -> AnyPublisher<[SiniestroInfo], Error> {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("siniestros/").withEndPoint("polizas").withType(.post).withBodyParams(["LOCAL_ID_POLIZA": polizaId])
        let request = builder.build()
        return client.call(request: request)
            .tryMap {
                try $0.compactMap { (data) -> SiniestroInfo? in
                    try SiniestroInfoMapper(dictionary: data).execute()
                }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
}
