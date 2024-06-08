//
//  RestInsuredInfoRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct RestInsuredInfoRepository: InsuredInfoRepository {
    @Injected var client: NetworkAPIClient
    
    func getInsuredInfoList(for polizaid: PolizaId) -> AnyPublisher<[InsuredInfo], Error> {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("polizas/vehi/").withEndPoint("aseg/2").withType(.post).withBodyParams(["LOCAL_ID_POLIZA": polizaid])
        let request = builder.build()
        return client.call(request: request)
            .tryMap {
               try $0.compactMap { (data) -> InsuredInfo? in
                   try InsuredInfoMapper(dictionary: data).execute()
                }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
    
}
