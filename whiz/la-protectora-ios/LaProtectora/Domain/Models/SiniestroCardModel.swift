//
//  SiniestroCardModel.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct SiniestroCardModel: Codable, Equatable, Identifiable {
    let id: Int
    let executive: Executive
    let risk: Risk
    let status: String
    let insuranceCompany: InsuranceCompany
    let date: String
}
