//
//  RestCouponRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/24/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver 

struct RestCouponRepository: CouponRepository {
    @Injected var client: NetworkAPIClient
    
    func getCoupons(for financingId: FinancingId) -> AnyPublisher<[Coupon], Error> {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("cuponera/").withEndPoint("idfinanciamiento").withType(.post).withBodyParams(["LOCAL_FINANCIAMIENTO": financingId])
        let request = builder.build()
        return client.call(request: request)
            .tryMap {
                try $0.compactMap { (data) -> Coupon? in
                   try CouponMapper(dictionary: data).execute()
                }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
}
