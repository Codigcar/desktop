//
//  GetRecentCategoryBlogPostsInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/23/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetRecentCategoryBlogPostsInteractor: GetRecentCategoryBlogPostsUseCase {
    @Injected var repo: BlogPostRepository

    func execute(with categoryId: BlogCategoryID) -> AnyPublisher<[BlogPost], Error> {
        repo.getRecentPosts(with: categoryId)
    }
}
