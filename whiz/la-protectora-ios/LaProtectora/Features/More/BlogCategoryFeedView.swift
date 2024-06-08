//
//  BlogCategoryFeedView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/20/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI
import Kingfisher
import Resolver

struct BlogCategoryFeedViewCOMP: View {
    @ObservedObject var model: BlogCategoryFeed
    
    let category: BlogCategory
    
    var body: some View {
        
        GeometryReader  { reader in
            ZStack(alignment: .top) {
                Color.white
                
                VStack(alignment: .leading, spacing: 15) {
                    HeaderView(title: category.title)
                    
                    if self.model.isLoading == false {
                    ScrollView(.vertical, showsIndicators: false) {
                            // Fallback on earlier versions
                            VStack(alignment: .leading, spacing: 16) {
                                ForEach(model.subcategories) { subcategory in
                                    NavigationLink(destination: SubcategoryFeedViewCOMP(model: SubcategoryFeed(), subcategory: subcategory)) {
                                        Text(subcategory.name)
                                    }
                                    .buttonStyle(PlainButtonStyle())
                                }
                            }
                            .padding(.horizontal, 16)
                            
                        
                    }
                    .frame(width: reader.size.width)
                    } else {
                        WhiteLoader()
                    }
                    //                    }
                }
            }
//            .navigationBarTitle("\(self.category.title)", displayMode: .inline)
            .onAppear {
                model.getSubcategories(for: category)
            }
        }
    }
    
}


struct SubcategoryItemView: View {
    let subcategory: BlogSubCategory

    @State var imageUrl: URL?
    
    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            KFImage(imageUrl)
                .resizable()
                .aspectRatio(contentMode: .fill)
                .frame(width: 157, height: 114, alignment: .center)
                .cornerRadius(14)
            
            HStack {
                Text(subcategory.name)
                    .font(.custom(Font.Signika.semibold.rawValue, size: 16))
                    .foregroundColor(Color(hex: "231F20"))

                Spacer()
                
                Text("\(subcategory.posts)" + (subcategory.posts > 1 ? " posts" : " post"))
                    .font(.custom(Font.Signika.regular.rawValue, size: 12))
                    .foregroundColor(Color(hex: "231F20").opacity(0.7))
            }
        }
        .frame(width: 157, alignment: .center)
        .onAppear {
            getContentURL()
        }
    }
    
    
    func getContentURL() {
        let contentURLStorageResolver: BlogStorageRepository = Resolver.resolve()
        
        self.imageUrl = contentURLStorageResolver.buildContentURL(for: subcategory.imageUUID ?? "", type: .image)
    }
}


@available(iOS 14.0, *)
struct BlogCategoryFeedView: View {
    @StateObject var model = BlogCategoryFeed()
    
    let category: BlogCategory
    
    var body: some View {
        ZStack(alignment: .top) {
            Color.white
            
            VStack(alignment: .leading, spacing: 15) {
                HeaderView(title: category.title)
                
                if self.model.isLoading == false {
                    VStack {
                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack(alignment: .center, spacing: 16) {
                                ForEach(model.subcategories) { subcategory in
                                    NavigationLink(destination: SubcategoryFeedView(subcategory: subcategory)) {
                                        SubcategoryItemView(subcategory: subcategory)
                                    }
                                    .buttonStyle(PlainButtonStyle())
                                }
                            }
                            .padding(.horizontal, 16)
                        }
                        
                        SectionHeader(title: "Recientes")
                            .padding(.horizontal, 20)
                        
                        ScrollView(.vertical, showsIndicators: false) {
                            VStack(alignment: .leading, spacing: 16) {
                                ForEach(model.recentPosts) { post in
                                    NavigationLink(destination: ArticleDetailView(post: post)) {
                                        ArticleCard(post: post)
                                    }
                                    .buttonStyle(PlainButtonStyle())
                                }
                            }
                            .padding(.horizontal, 16)
                        }
                        
                        Spacer()
                    }
                } else {
                    WhiteLoader()
                }
            }
        }
        .navigationBarTitle("", displayMode: .inline)
        .onAppear {
            model.getSubcategories(for: category)
            model.getRecentPosts(for: category)
        }
    }
}
