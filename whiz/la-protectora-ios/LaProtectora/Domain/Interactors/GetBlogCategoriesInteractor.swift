//
//  GetBlogCategoriesInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetBlogCategoriesInteractor: GetBlogCategoriesUseCase {
    @Injected var repo: BlogCategoryRepository

    func execute() -> AnyPublisher<[BlogCategory], Error> {
        repo.getCategories()
    }
}
