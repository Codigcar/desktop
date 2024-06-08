//
//  Endoso.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/7/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct Endoso: Hashable, Codable {
    var number: String
    
    var liquidacionNumber: String
    
    var vailidity: String
    
    var detail: String
    
    var documentUrl: URL?
}
