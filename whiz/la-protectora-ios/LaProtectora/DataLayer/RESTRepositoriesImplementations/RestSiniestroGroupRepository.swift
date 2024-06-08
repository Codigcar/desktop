//
//  RestSiniestroGroupRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct RestSiniestroGroupRepository: SiniestroGroupRepository {
    @Injected var client: NetworkAPIClient
    
    func getSiniestrGroupList(for userId: UserID) -> AnyPublisher<[SiniestroGroup], Error> {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("menu/").withEndPoint("siniestros").withType(.post)
            .withBodyParams(["LOCAL_ID_CLIENTE": userId])
        let request = builder.build()
        return client.call(request: request)
            .tryMap {
                try $0.compactMap { (data) -> SiniestroGroup? in
                    try SiniestroGroupMapper(dictionary: data).execute()
                }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
}
