//
//  BlogCategoryCard.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//


import Foundation
import SwiftUI
import Combine
import Resolver
import Kingfisher

struct BlogCategoryCard: View {
    @State var imageUrl: URL?
    
    let category: BlogCategory
    
    var body: some View {
        VStack(spacing: 13) {
            KFImage(imageUrl)
                .resizable()
                .aspectRatio(contentMode: .fill)
                .frame(width: 160, height: 114, alignment: .center)
                .overlay(
                    LinearGradient(gradient: Gradient(colors: [Color.clear, Color.black.opacity(0.4)]), startPoint: .top, endPoint: .bottom)
                )
                .cornerRadius(10)
            
            HStack {
                Text(category.title)
                    .font(.custom(Font.Signika.semibold.rawValue, size: 14))
                    .foregroundColor(.black)
                
                Spacer()
                
                Text(String(category.postCount) + (category.postCount > 1 ? " posts" : " post"))
                    .font(.custom(Font.Signika.regular.rawValue, size: 12))
                    .foregroundColor(Color.black.opacity(0.5))
            }
            
        }
        .onAppear {
            getContentURL()
        }
    }
    
    func getContentURL() {
        let contentURLStorageResolver: BlogStorageRepository = Resolver.resolve()
        
        self.imageUrl = contentURLStorageResolver.buildContentURL(for: category.imageUUID ?? "", type: .image)
    }
}
