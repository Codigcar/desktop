//
//  VehicleInfo.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/12/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct VehicleInfo: Codable, Hashable {
    var plate: String
    
    var clientName: String
    
    var vehicleClass: String
    
    var make: String
    
    var model: String
    
    var year: String
    
    var status: String
}
