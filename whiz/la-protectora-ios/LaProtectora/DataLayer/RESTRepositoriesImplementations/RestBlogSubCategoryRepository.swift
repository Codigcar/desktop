//
//  RestBlogSubCategoryRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/18/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct RestBlogSubCategoryRepository: BlogSubCategoryRepository {
    @Injected private var client: BlogAPIClient
    
    func getSubCategories(for categoryId: BlogCategoryID) -> AnyPublisher<[BlogSubCategory], Error> {
        let builder = BlogApiRequest.Builder()
        builder.withPath("/api/").withEndPoint("subcategory").withType(.get).withQueryParams(["category_id": String(categoryId)])
        let request = builder.build()
        return client.call(request: request).tryMap {
           try $0.compactMap { (data) -> BlogSubCategory? in
                try BlogSubCategoryMapper(dictionary: data).execute()
            }        }
            .receive(on: RunLoop.main)
            .eraseToAnyPublisher()
    }
}
