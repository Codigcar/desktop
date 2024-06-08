//
//  GetFeaturedBlogPostInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/18/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetFeaturedBlogPostInteractor: GetFeaturedBlogPostUseCase {
    @Injected var repo: BlogPostRepository
    
    func execute() -> AnyPublisher<BlogPost, Error> {
        repo.getFeatured()
    }
}
