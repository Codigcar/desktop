//
//  GetRecentBlogPostsUseCase.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/23/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol GetRecentBlogPostsUseCase {
    var repo: BlogPostRepository { get set }

    func execute() -> AnyPublisher<[BlogPost], Error>
}


