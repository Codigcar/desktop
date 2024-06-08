//
//  ArticleCard.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/20/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI
import Kingfisher
import Resolver

struct ArticleCard: View {
    let post: BlogPost
    
    @State var imageUrl: URL?
    
    var body: some View {
        HStack(spacing: 12){
            KFImage(imageUrl)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: (600/350)*60, height: 60, alignment: .center)
                .clipped()
                .cornerRadius(8)
            
            VStack(alignment: .leading, spacing: 10) {
                Text(post.title)
                    .font(.system(size: 11, weight: .bold, design: .default))
                    .foregroundColor(Color(hex: "231F20"))
                
                HStack(spacing: 16) {
                    Text(post.subcategoryName)
                        .font(.system(size: 11, weight: .regular, design: .default))
                        .foregroundColor(Color(hex: "231F20").opacity(0.3))
                    
                    Spacer()
                    
                    HStack(spacing: 6) {
                        Text(post.categoryName)
                            .font(.system(size: 11, weight: .regular, design: .default))
                            .foregroundColor(Color(hex: "231F20"))
                        
                        Image(systemName: "chevron.right")
                            .font(.system(size: 16, weight: .semibold, design: .default))
                            .foregroundColor(Color(hex: "231F20"))
                            .padding(.trailing, 10)
                    }
                }
                
                Text(post.createdAt)
                    .font(.system(size: 11, weight: .regular, design: .default))
                    .foregroundColor(Color(hex: "231F20").opacity(0.3))
            }
            .padding(.top, 10)
            
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 9)
        .background(Color.white.cornerRadius(12).shadow(color: Color.black.opacity(0.20), radius: 4, x: 0, y: 2))
        .onAppear {
            getContentURL()
        }
        
    }
    
    func getContentURL() {
        let contentURLStorageResolver: BlogStorageRepository = Resolver.resolve()
        
        self.imageUrl = contentURLStorageResolver.buildContentURL(for: post.imageUUID, type: .image)
    }
}
