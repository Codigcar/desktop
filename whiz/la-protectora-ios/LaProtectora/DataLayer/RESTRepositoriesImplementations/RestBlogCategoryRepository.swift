//
//  RestBlogCategoryRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct RestBlogCategoryRepository: BlogCategoryRepository {
    @Injected private var client: BlogAPIClient
    
    func getCategories() -> AnyPublisher<[BlogCategory], Error> {
        let builder = BlogApiRequest.Builder()
        builder.withPath("/api/").withEndPoint("category").withType(.get)
        let request = builder.build()
        return client.call(request: request).tryMap {
           try $0.compactMap { (data) -> BlogCategory? in
                try BlogCategoryMapper(dictionary: data).execute()
            }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
}
