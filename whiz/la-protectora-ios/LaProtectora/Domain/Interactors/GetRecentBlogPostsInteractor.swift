//
//  GetRecentBlogPostsInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/23/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetRecentBlogPostsInteractor: GetRecentBlogPostsUseCase {
    @Injected var repo: BlogPostRepository

    func execute() -> AnyPublisher<[BlogPost], Error> {
        repo.getRecentPosts()
    }
}
