//
//  RestQuoterRepository.swift
//  LaProtectora
//
//  Created by Serguei on 25/01/22.
//  Copyright © 2022 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct RestQuoterRepository: QuoterRepository {
    @Injected var client: NetworkAPIClient
    
    func getLinkData() -> AnyPublisher<[QuoterLinkData], Error> {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("link/").withEndPoint("cotizador").withType(.get)
        let request = builder.build()
        return client.call(request: request)
            .tryMap {
                try $0.compactMap { (data) -> QuoterLinkData? in
                    try QuoterLinkDataMapper(dictionary: data).execute()
                }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
    
}
