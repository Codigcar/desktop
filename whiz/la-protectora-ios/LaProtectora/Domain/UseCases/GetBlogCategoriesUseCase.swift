//
//  GetBlogCategories.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

protocol GetBlogCategoriesUseCase {
    func execute() -> AnyPublisher<[BlogCategory], Error>
}
