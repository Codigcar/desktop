//
//  RestInsuranceRepositoryImplementation.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/20/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct RestInsuranceRepository: InsuranceRepository {
    @Injected private var client: NetworkAPIClient
    
    func getInsurances(for userId: UserID, with riskGroupId: RiskGroupId) -> AnyPublisher<[Insurance], Error> {
        let data = ["ID_CLIENTE_LOCAL": userId,
                    "ID_GRUPO_RIESGO_LOCAL": riskGroupId]
        let builder = ApiRequest.Builder()
        builder.withPath("/api/").withResource("mobile/polizas/id").withEndPoint("/grupo/riesgo").withType(.post).withBodyParams(data)
        return client.call(request: builder.build())
            .tryMap { try $0.compactMap { (data) -> Insurance? in
                try InsuranceMapper(dictionary: data).execute()
            }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
}
