//
//  GetBlogPostsUseCase.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/18/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol GetBlogSubbCategoriesUseCase {
    var repo: BlogSubCategoryRepository { get set }

    func execute(with categoryId: BlogCategoryID) -> AnyPublisher<[BlogSubCategory], Error>
}
