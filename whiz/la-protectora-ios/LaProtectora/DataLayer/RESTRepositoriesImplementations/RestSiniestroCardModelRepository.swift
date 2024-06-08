//
//  RestSiniestroCardModelRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Resolver
import Combine

struct RestSiniestroCardModelRepository: SiniestroCardModelRepository {
    @Injected var client: NetworkAPIClient
    
    func getSiniestroCardModelList(for userId: UserID, groupId: Int) -> AnyPublisher<[SiniestroCardModel], Error> {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("siniestro/").withEndPoint("gruporiesgo").withType(.post)
            .withBodyParams(["ID_CLIENTE_LOCAL": userId, "ID_GRUPO_RIESGO_LOCAL": groupId])
        let request = builder.build()
        return client.call(request: request)
            .tryMap {
              try $0.compactMap { (data) -> SiniestroCardModel? in
                  try SiniestroCardModelMapper(dictionary: data).execute()
                }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
        
    }
}
