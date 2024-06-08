//
//  BlogCategoryFeed.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/20/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI
import Combine
import Resolver

final class BlogCategoryFeed: ObservableObject {
    @Published var subcategories = [BlogSubCategory]()
    
    @Published var recentPosts = [BlogPost]()
    
    @Published var isLoading = true
    
    @Injected var getSubCategoriesInteractor: GetBlogSubbCategoriesUseCase
    
    @Injected var getRecentCategoryPostsInteractor: GetRecentCategoryBlogPostsUseCase
    
    private var subscriptions = Set<AnyCancellable>()
    
    func getSubcategories(for category: BlogCategory) {
        getSubCategoriesInteractor.execute(with: category.id).sink { (completion) in
            print("\(#function) completion: ", completion)
        } receiveValue: { [weak self] (vals) in
            self?.subcategories = vals.filter { $0.posts > 0 }
            self?.isLoading = false
        }
        .store(in: &self.subscriptions)
    }
    
    func getRecentPosts(for category: BlogCategory) {
        getRecentCategoryPostsInteractor.execute(with: category.id).sink { (completion) in
            print("\(#function) completion: ", completion)
        } receiveValue: { [weak self] (vals) in
            self?.recentPosts = vals
        }
        .store(in: &self.subscriptions)
    }
}
