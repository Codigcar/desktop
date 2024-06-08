//
//  RestFollowUpRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/26/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct RestFollowUpRepository: FollowUpRepository {
    @Injected var client: NetworkAPIClient
    
    func getFollowUpList(for siniestroId: SiniestroId) -> AnyPublisher<[FollowUp], Error> {
           let builder = ApiRequest.Builder()
           builder.withPath("/api/mobile/").withResource("seguimiento/").withEndPoint("siniestro").withType(.post)
               .withBodyParams(["LOCAL_ID_SINIESTRO": siniestroId])
           let request = builder.build()
           return client.call(request: request)
               .tryMap {
                   try $0.compactMap { (data) -> FollowUp? in
                       try FollowUpMapper(dictionary: data).execute()
                   }
           }
           .receive(on: RunLoop.main)
           .eraseToAnyPublisher()
    }
}
