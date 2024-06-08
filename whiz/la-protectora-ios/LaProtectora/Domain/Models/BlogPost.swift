//
//  BlogPost.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/17/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct BlogPost: Codable, Identifiable, Hashable {
    enum Kind: String, Codable, Hashable {
        case article
        case video
        case file
    }
    
    let id: Int
    let title: String
    let categoryName: String
    let subcategoryName: String
    let type: BlogPost.Kind
    let imageUUID: String
    let imageCoverUUID: String?
    let videoUrl: URL?
    let filePath: String?
    let html: String?
    let createdAt: String 
}
