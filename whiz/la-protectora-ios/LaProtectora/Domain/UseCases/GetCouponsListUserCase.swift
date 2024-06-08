//
//  GetCouponsListUserCase.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/24/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol GetCouponsListUserCase {
    var repo: CouponRepository { get set }
    
    func execute(for financingId: FinancingId) -> AnyPublisher<[Coupon], Error>
}
