//
//  RestVehicleInfoRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct RestVehicleInfoRepository: VehicleInfoRepository {
    @Injected var client: NetworkAPIClient
    
    func getVehicleInfoList(for polizaId: PolizaId) -> AnyPublisher<[VehicleInfo], Error> {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("polizas/vehi").withEndPoint("/aseg/1").withType(.post).withBodyParams(["LOCAL_ID_POLIZA": polizaId])
        let request = builder.build()
        return client.call(request: request)
            .tryMap {
                try $0.compactMap { (data) -> VehicleInfo? in
                    try VehicleInfoMapper(dictionary: data).execute()
                }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
}
