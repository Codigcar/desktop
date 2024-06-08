//
//  RESTBlogPostRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/17/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct RestBlogPostRepository: BlogPostRepository {
    @Injected private var client: BlogAPIClient

    func getFeatured() -> AnyPublisher<BlogPost, Error> {
        let builder = BlogApiRequest.Builder()
        builder.withPath("/api/").withEndPoint("post").withType(.get).withQueryParams(["featured": ""])
        let request = builder.build()
        return client.call(request: request).tryMap {
            return try BlogPostMapper(dictionary: $0[0]).execute()
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
    
    func getPosts(with subcategoryId: BlogSubCategoryID) -> AnyPublisher<[BlogPost], Error> {
        let builder = BlogApiRequest.Builder()
        builder.withPath("/api/").withEndPoint("post").withType(.get).withQueryParams(["subcategory_id": String(subcategoryId)])
        let request = builder.build()
        return client.call(request: request).tryMap {
            try $0.compactMap { (data) -> BlogPost? in
                try BlogPostMapper(dictionary: data).execute()
            }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
    
    func getRecentPosts() -> AnyPublisher<[BlogPost], Error> {
        let builder = BlogApiRequest.Builder()
        builder.withPath("/api/").withEndPoint("post").withType(.get).withQueryParams(["start": "1", "lenght": "10"])
        let request = builder.build()
        return client.call(request: request).tryMap {
            try $0.compactMap { (data) -> BlogPost? in
               try BlogPostMapper(dictionary: data).execute()
            }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
    
    func getRecentPosts(with categoryId: BlogCategoryID) -> AnyPublisher<[BlogPost], Error> {
        let builder = BlogApiRequest.Builder()
        builder.withPath("/api/").withEndPoint("post").withType(.get).withQueryParams(["start": "1", "lenght": "10", "category_id": String(categoryId)])
        let request = builder.build()
        return client.call(request: request).tryMap {
            try $0.compactMap { (data) -> BlogPost? in
                try BlogPostMapper(dictionary: data).execute()
            }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }

}

