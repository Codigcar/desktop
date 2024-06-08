//
//  RestContactCenterRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 9/1/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct RestContactCenterRepository: ContactCenterRepository {
    @Injected private var client: NetworkAPIClient
    
    func getMain() -> AnyPublisher<ContactCenter, Error> {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("contactanos/").withEndPoint("call_center").withType(.post)
        let request = builder.build()
        return client.call(request: request).tryMap {
             try ContactCenterMapper(dictionary: $0[0]).execute()
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
}
