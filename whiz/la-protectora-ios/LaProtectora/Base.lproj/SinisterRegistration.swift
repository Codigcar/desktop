//
//  SinisterRegistration.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/28/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct Location: Codable {
    let latitud: Double
    let longitude: Double
}

struct SinisterRegistration: Codable {
    let clientId: UserID
    let location: Location
    let id: String
    let plate: String
}

