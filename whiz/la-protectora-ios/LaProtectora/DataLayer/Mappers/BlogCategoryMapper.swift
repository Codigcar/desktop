//
//  BlogCategoryMapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct BlogCategoryMapper: Mapper {
    struct Data: Codable {
        let id: Int
        let name: String
        let posts: Int
        let image: String?
    }
    
    var dictionary: [String : Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
    
    func execute() throws -> BlogCategory {
        guard let data = Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        return BlogCategory(id: data.id, title: data.name, imageUUID: data.image, postCount: data.posts)
    }
}
