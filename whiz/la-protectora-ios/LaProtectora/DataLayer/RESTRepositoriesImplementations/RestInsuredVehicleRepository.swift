//
//  RestInsuredVehicleRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/28/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct RestInsuredVehicleRepository: InsuredVehicleRepository {
    @Injected var client: NetworkAPIClient
    
    func getInsuredVehicles(for userId: UserID) -> AnyPublisher<[InsuredVehicle], Error> {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("polizas/").withEndPoint("vehiculo").withType(.post)
            .withBodyParams(["ID_CLIENTE": userId])
        let request = builder.build()
        return client.call(request: request)
            .tryMap {
                try $0.compactMap { (data) -> InsuredVehicle? in
                    try InsuredVehicleMapper(dictionary: data).execute()
                }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
}
