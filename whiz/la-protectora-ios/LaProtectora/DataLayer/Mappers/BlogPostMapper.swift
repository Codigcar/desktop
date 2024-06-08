//
//  BlogPostMapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/17/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct BlogPostMapper: Mapper {
    struct Data: Codable {
        let id: Int
        let title: String
        let category: String
        let subcategory: String
        let type: String
        let image_main: String?
        let image_cover: String?
        let video: URL?
        let file: String?
        let long_text: String?
        let created_at: String
    }
    
    var dictionary: [String : Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
    
    func execute() throws -> BlogPost {
        guard let data = Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        return BlogPost(id: data.id, title: data.title, categoryName: data.category, subcategoryName: data.subcategory, type: BlogPost.Kind(rawValue: data.type) ?? .article, imageUUID: data.image_main ?? "", imageCoverUUID: data.image_cover, videoUrl: data.video, filePath: data.file, html: data.long_text, createdAt: data.created_at)
    }
}
