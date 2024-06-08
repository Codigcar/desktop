//
//  BlogSubCategory.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/18/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct BlogSubCategory: Codable, Hashable, Identifiable {
    let id: Int
    let name: String
    let categoryName: String
    let posts: Int
    let imageUUID: String?
}


