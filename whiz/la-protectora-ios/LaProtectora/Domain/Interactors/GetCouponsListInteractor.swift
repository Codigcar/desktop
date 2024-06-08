//
//  GetCouponsListInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/24/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetCouponsListInteractor: GetCouponsListUserCase {
    @Injected var repo: CouponRepository
    
    func execute(for financingId: FinancingId) -> AnyPublisher<[Coupon], Error> {
        repo.getCoupons(for: financingId)
    }
}
