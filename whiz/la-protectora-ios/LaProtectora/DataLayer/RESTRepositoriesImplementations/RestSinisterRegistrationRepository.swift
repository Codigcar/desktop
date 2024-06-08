//
//  RestSinisterRegistrationRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/28/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct RestSinisterRegistrationRepository: SinisterRegistrationRepository {
    @Injected private var client: NetworkAPIClient
    
    func create(registration: SinisterRegistration) -> AnyPublisher<[String: Any], Error> {
        let data: [String: Any] = [
            "par_code_client": registration.clientId,
            "par_lat": registration.location.latitud,
            "par_long": registration.location.longitude,
            "par_sos_type": registration.id,
            "par_vehicle_plate": registration.plate
        ]
        
        let builder = ApiRequest.Builder()
        builder.withPath("/api/evopremium/").withResource("sos/").withEndPoint("registry").withType(.post).withBodyParams(data)
        
        let request = builder.build()
        return client.call(request: request)
            .receive(on: RunLoop.main)
            .tryMap {
                if $0.count > 0 {
                    return $0[0]
                } else {
                    throw NetworkAPIClient.NetworkError.NoContent
                }
        }
        .eraseToAnyPublisher()
    }
}
