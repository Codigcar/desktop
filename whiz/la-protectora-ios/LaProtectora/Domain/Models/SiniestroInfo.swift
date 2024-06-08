//
//  SiniestroInfo.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/24/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct SiniestroInfo: Codable, Hashable {
    static func == (lhs: SiniestroInfo, rhs: SiniestroInfo) -> Bool {
        lhs.hashValue == rhs.hashValue && lhs.siniestroId == rhs.siniestroId
    }
    
    let insuranceCompany: InsuranceCompany
    let description: String
    let date: String
    let status: String
    let risk: Risk
    let siniestroId: Int
    
}
