//
//  GetBlogPostsInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/18/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetBlogPostsInteractor: GetBlogPostsUseCase {
    @Injected var repo: BlogPostRepository

    func execute(with subcategoryId: BlogSubCategoryID) -> AnyPublisher<[BlogPost], Error> {
        repo.getPosts(with: subcategoryId)
    }
}
