//
//  BlogSubCategoryMapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/18/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct BlogSubCategoryMapper: Mapper {
    struct Data: Codable {
        let id: Int
        let name: String
        let posts: Int
        let category: String
        let image_card: String?
    }
    
    var dictionary: [String : Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
    
    func execute() throws -> BlogSubCategory {
        guard let data = Data(dictionary: self.dictionary) else { throw MappingError.providedJSONObjectDoesNotCointainAppropiateFormatOrValues }
        return BlogSubCategory(id: data.id, name: data.name, categoryName: data.category, posts: data.posts, imageUUID: data.image_card)
    }
}
