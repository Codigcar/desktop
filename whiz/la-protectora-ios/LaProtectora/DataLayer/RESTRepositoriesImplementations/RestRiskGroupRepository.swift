//
//  RestRiskGroupRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/20/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Resolver
import Combine

struct RestRiskGroupRepository: RiskGroupRepository {
    
    @Injected private var client: NetworkAPIClient
    
    func getRiskGroups(for userId: UserID) -> AnyPublisher<[RiskGroup], Error> {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/").withResource("mobile/menu/").withEndPoint("polizas").withType(.post)
        builder.withBodyParams(["LOCAL_ID_CLIENTE": userId])
        return client.call(request: builder.build())
            .tryMap { try $0.compactMap { (data) -> RiskGroup in
                try RiskGroupMapper(dictionary: data) .execute()
            }
            }
            .receive(on: RunLoop.main)
            .eraseToAnyPublisher()
    }
    
    func getExecutivesRiskGroups(for userId: UserID) -> AnyPublisher<[RiskGroup], Error> {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/").withResource("mobile/menu/").withEndPoint("ejecutivos").withType(.post)
        builder.withBodyParams(["LOCAL_ID_CLIENTE": userId])
        return client.call(request: builder.build())
            .tryMap { try $0.compactMap { (data) -> RiskGroup in
                try RiskGroupMapper(dictionary: data) .execute()
            }
            }
            .receive(on: RunLoop.main)
            .eraseToAnyPublisher()
    }
}
