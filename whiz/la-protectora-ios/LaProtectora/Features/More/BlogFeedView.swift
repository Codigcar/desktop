//
//  BlogFeed.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 10/26/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI
import Combine
import Resolver
import Kingfisher

struct SectionHeader: View {
    let title: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(title)
                .font(.custom(Font.Signika.semibold.rawValue, size: 20))
                .foregroundColor(Color(hex: "231F20"))
            
            Rectangle()
                .frame(height: 1)
                .foregroundColor(Color.black.opacity(0.1))
        }
    }
}


struct BlogFeedViewCOMP: View {
    @ObservedObject var feed: BlogFeed
    
    var body: some View {
        GeometryReader { reader in
            ZStack(alignment: .top) {
                Color.white
                
                VStack(alignment: .leading, spacing: 15) {
                    HeaderView(title: "Blog")
                    
                    ScrollView(.vertical, showsIndicators: false) {
                        VStack(alignment: .leading, spacing: 15) {
                            if feed.featuredPost != nil {
                                NavigationLink(destination: ArticleDetailView(post: feed.featuredPost!)) {
                                    HighlightedArticle(article: feed.featuredPost!)
                                }
                                .buttonStyle(PlainButtonStyle())
                                .padding(.horizontal, 20)
                            }
                            
                            SectionHeader(title: "Categorías")
                                .padding(.horizontal, 20)
                            
                            ScrollView(.horizontal, showsIndicators: false) {
                                HStack(spacing: 20) {
                                    ForEach(feed.categories) { (category) in
                                        NavigationLink(destination: BlogCategoryFeedViewCOMP(model: BlogCategoryFeed(), category: category) ){
                                            BlogCategoryCard(category: category)
                                        }
                                    }
                                }
                                .padding(.horizontal, 16)
                            }
                            
                            SectionHeader(title: "Recientes")
                                .padding(.horizontal, 20)
                            
                            VStack(alignment: .leading, spacing: 16) {
                                ForEach(feed.recentPosts) { post in
                                    NavigationLink(destination: ArticleDetailView(post: post)) {
                                        ArticleCard(post: post)
                                    }
                                    .buttonStyle(PlainButtonStyle())
                                }
                            }
                            .padding(.horizontal, 16)
                            .padding(.bottom, 80)
                            
                        }
                        .frame(width: reader.size.width)
                        .onAppear {
                            feed.getFeaturedPost()
                            feed.getCategories()
                            feed.getRecentPosts()
                        }
                    }
                }
            }
        }
    }
}

@available(iOS 14.0, *)
struct BlogFeedView: View {
    @StateObject var feed = BlogFeed()
    
    var body: some View {
        GeometryReader { reader in
            ZStack(alignment: .top) {
                Color.white
                
                if !feed.isLoading {
                    VStack(alignment: .leading, spacing: 15) {
                        HeaderView(title: "Destacado")
                        
                        ScrollView(.vertical, showsIndicators: false) {
                            VStack(alignment: .leading, spacing: 15) {
                                if feed.featuredPost != nil {
                                    NavigationLink(destination: ArticleDetailView(post: feed.featuredPost!)) {
                                        HighlightedArticle(article: feed.featuredPost!)
                                    }
                                    .buttonStyle(PlainButtonStyle())
                                    .padding(.horizontal, 20)
                                }
                                
                                SectionHeader(title: "Categorías")
                                    .padding(.horizontal, 20)
                                
                                ScrollView(.horizontal, showsIndicators: false) {
                                    HStack(spacing: 20) {
                                        ForEach(feed.categories) { (category) in
                                            NavigationLink(destination: BlogCategoryFeedView(category: category) ){
                                                BlogCategoryCard(category: category)
                                            }
                                        }
                                    }
                                }
                                .padding(.horizontal, 20)
                                
                                
                                SectionHeader(title: "Recientes")
                                    .padding(.horizontal, 20)
                                
                                VStack(alignment: .leading, spacing: 16) {
                                    ForEach(feed.recentPosts) { post in
                                        NavigationLink(destination: ArticleDetailView(post: post)) {
                                            ArticleCard(post: post)
                                        }
                                        .buttonStyle(PlainButtonStyle())
                                    }
                                }
                                .padding(.horizontal, 16)
                                .padding(.bottom, 80)
                                
                            }
                            .frame(width: reader.size.width)
                        }
                    }
                } else {
                    WhiteLoader()
                }
            }
            .onAppear {
                feed.loadContent()
            }
        }
    }
}



struct BlogFeedView_Previews: PreviewProvider {
    static var previews: some View {
        if #available(iOS 14.0, *) {
            BlogFeedView()
        } else {
            // Fallback on earlier versions
            BlogFeedViewCOMP(feed: BlogFeed())
        }
    }
}
