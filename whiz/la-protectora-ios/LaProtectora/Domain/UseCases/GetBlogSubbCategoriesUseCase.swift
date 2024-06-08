//
//  GetBlogSubbCategoriesUseCase.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/18/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol GetBlogPostsUseCase {
    var repo: BlogPostRepository { get set }

    func execute(with subcategoryId: BlogSubCategoryID) -> AnyPublisher<[BlogPost], Error>
}
