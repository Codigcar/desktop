//
//  SubcategoryFeed.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/20/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI
import Resolver
import Combine

final class SubcategoryFeed: ObservableObject {
    @Published var posts = [BlogPost]()
    @Published var isLoading = true
    @Published var failed = false
    
    @Injected var getBlogPostsInteractor: GetBlogPostsUseCase
    
    private var subscriptions = Set<AnyCancellable>()
    
    
    func getBlogPosts(for subcategory: BlogSubCategory) {
        getBlogPostsInteractor.execute(with: subcategory.id).sink { [weak self] (completion) in
            print("\(#function) completion: ", completion)
            if case .failure = completion {
                self?.failed = true
                self?.isLoading = false
            }
        } receiveValue: { [weak self] (vals) in
            self?.posts = vals
            self?.isLoading = false
        }
        .store(in: &self.subscriptions)
    }
}
