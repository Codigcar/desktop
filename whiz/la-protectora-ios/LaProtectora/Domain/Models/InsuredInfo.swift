//
//  InsuranceInfo.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/12/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct InsuredInfo: Codable, Hashable {
    var name: String
    
    var relationship: String
    
    var age: String
    
    var inclustionDate: String
}
