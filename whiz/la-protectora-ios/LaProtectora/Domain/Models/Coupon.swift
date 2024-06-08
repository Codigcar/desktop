//
//  Coupon.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/24/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct Coupon: Codable {
    let id: String
    let correlativeId: String
    let amount: Double
    let expirationDate: String
    let cancellationDate: String
    let status: String
}


