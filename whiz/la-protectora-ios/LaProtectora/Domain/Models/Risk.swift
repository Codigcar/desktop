//
//  Risk.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/24/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct Risk: Codable, Hashable, Equatable {
    let name: String
    var id: Int? = nil
    var groupId: Int! = nil
}
