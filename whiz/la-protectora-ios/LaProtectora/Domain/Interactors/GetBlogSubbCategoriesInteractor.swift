//
//  GetBlogSubbCategoriesInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/18/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetBlogSubbCategoriesInteractor: GetBlogSubbCategoriesUseCase {
    @Injected var repo: BlogSubCategoryRepository
    
    func execute(with categoryId: BlogCategoryID) -> AnyPublisher<[BlogSubCategory], Error> {
        repo.getSubCategories(for: categoryId)
    }
}
