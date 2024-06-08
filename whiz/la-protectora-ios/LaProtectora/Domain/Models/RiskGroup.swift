//
//  InsuranceType.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/20/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct RiskGroup: Codable, Hashable, Identifiable {
    enum Kind: Int, Equatable, Hashable, Codable {
        case general = 1
        case human = 2
        case vehicular = 3
        case unknown
    }

    var id: Int
    var name: String
    var imageUrl: URL?
    var type: Kind
}

