//
//  BlogFeed.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/20/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI
import Resolver
import Combine

class BlogFeed: ObservableObject {
    @Injected var getFeaturedPostInteractor: GetFeaturedBlogPostUseCase
    
    @Injected var getRecentPostsInteractor: GetRecentBlogPostsUseCase
    
    @Injected var getBlogCategoriesInteractor: GetBlogCategoriesUseCase

    @Published var featuredPost: BlogPost?
    
    @Published var recentPosts = [BlogPost]()
    
    @Published var categories = [BlogCategory]()
    
    @Published var isLoading = false
    
    private var subscriptions = Set<AnyCancellable>()
    
    private var loadedOnce = false
    
    func load() {
        let a = getFeaturedPostInteractor.execute()
        
        let b = getBlogCategoriesInteractor.execute()
        
        let c = getRecentPostsInteractor.execute()
        
        self.isLoading = true
        
        Publishers.CombineLatest3(a, b, c)
            .receive(on: RunLoop.main)
            .sink { (completion) in
                print("\(#function) completion:", completion)
            } receiveValue: { [weak self] (featured, categories, recents) in
                self?.featuredPost = featured
                self?.categories = categories
                self?.recentPosts = recents
                self?.isLoading = false
            }
            .store(in: &self.subscriptions)
    }
    
    func loadContent() {
        if !loadedOnce {
            self.getFeaturedPost()
            self.getCategories()
            self.getRecentPosts()
        }
    }
    
    func getFeaturedPost() {
        self.isLoading = true
        getFeaturedPostInteractor.execute()
            .sink { (completion) in
            print("\(#function) completion:", completion)
        } receiveValue: { [weak self] (val) in
            self?.featuredPost = val
            self?.isLoading = false
            self?.loadedOnce = true
        }
        .store(in: &self.subscriptions)
    }
    
    func getCategories() {
        self.isLoading = true
        getBlogCategoriesInteractor
            .execute()
            .sink { (completion) in
                print("\(#function) completion:", completion)
            } receiveValue: { [weak self] (vals) in
                self?.categories = vals.filter { $0.postCount > 0 }
                self?.isLoading = false
                self?.loadedOnce = true
            }
            .store(in: &self.subscriptions)
    }
    
    func getRecentPosts() {
        self.isLoading = true
        getRecentPostsInteractor.execute().sink { (completion) in
            print("\(#function) completion: ", completion)
        } receiveValue: { [weak self] (vals) in
            self?.recentPosts = vals
            self?.isLoading = false
            self?.loadedOnce = true
        }
        .store(in: &self.subscriptions)
    }
}

