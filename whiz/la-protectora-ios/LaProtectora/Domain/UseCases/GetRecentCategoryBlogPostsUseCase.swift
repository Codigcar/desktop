//
//  GetRecentCategoryBlogPostsUseCase.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/23/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol GetRecentCategoryBlogPostsUseCase {
    var repo: BlogPostRepository { get set }

    func execute(with category: BlogCategoryID) -> AnyPublisher<[BlogPost], Error>
}
