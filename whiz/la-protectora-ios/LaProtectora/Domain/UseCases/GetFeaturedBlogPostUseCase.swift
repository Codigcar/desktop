//
//  GetFeaturedBlogPostUseCase.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/18/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

protocol GetFeaturedBlogPostUseCase {
    var repo: BlogPostRepository { get set }

    func execute() -> AnyPublisher<BlogPost, Error>
}
