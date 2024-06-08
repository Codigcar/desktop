//
//  BlogCategory.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/18/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct BlogCategory: Identifiable, Hashable, Codable {
    let id: Int
    let title: String
    let imageUUID: String?
    let postCount: Int
}
