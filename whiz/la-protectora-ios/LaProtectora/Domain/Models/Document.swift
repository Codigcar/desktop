//
//  Document.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/7/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct Document: Hashable, Codable {
    var number: String
    
    var type: String
    
    var archiveCode: Int
    
    var url: URL?
    
    var archiveDescription: String? = nil 
    
}
