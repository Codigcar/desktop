//
//  SubcategoryFeedView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/20/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI

struct SubcategoryFeedViewCOMP: View {
    @ObservedObject var model: SubcategoryFeed
    
    let subcategory: BlogSubCategory
    
    var body: some View {
        ZStack(alignment: .top) {
            Color.white
            
            VStack(spacing: 15) {
                SectionHeader(title: subcategory.name)
                    .padding([.horizontal, .top], 20)
                
                if model.isLoading == false {
                    if model.failed == true {
                        Text("No se encontró resultados.")
                    } else {
                        ScrollView(.vertical, showsIndicators: false) {
                            VStack(alignment: .leading, spacing: 16) {
                                ForEach(model.posts) { post in
                                    NavigationLink(destination: ArticleDetailView(post: post)) {
                                        ArticleCard(post: post)
                                    }
                                    .buttonStyle(PlainButtonStyle())
                                }
                            }
                            .padding(.horizontal, 16)
                        }
                    }
                } else {
                    WhiteLoader()
                }
            }
            .onAppear {
                self.model.getBlogPosts(for: subcategory)
            }
        }
        .navigationBarTitle(Text(subcategory.name), displayMode: .inline)
    }
}

@available(iOS 14.0, *)
struct SubcategoryFeedView: View {
    @StateObject var model = SubcategoryFeed()
    
    let subcategory: BlogSubCategory
    
    var body: some View {
        ZStack(alignment: .top) {
            Color.white
            
            VStack(spacing: 15) {
                HeaderView(title: subcategory.name)
                
                if model.isLoading == false {
                    if model.failed {
                        Text("No se encontró resultados.")
                    } else {
                        ScrollView(.vertical, showsIndicators: false) {
                            VStack(alignment: .leading, spacing: 16) {
                                ForEach(model.posts) { post in
                                    NavigationLink(destination: ArticleDetailView(post: post)) {
                                        ArticleCard(post: post)
                                    }
                                    .buttonStyle(PlainButtonStyle())
                                }
                            }
                            .padding(.horizontal, 16)
                        }
                    }
                } else {
                    WhiteLoader()
                }
            }
            .onAppear {
                self.model.getBlogPosts(for: subcategory)
            }
        }
        .navigationBarTitle(subcategory.categoryName, displayMode: .inline)
    }
}

