//
//  HighlightedArticle.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/20/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI
import Combine
import Resolver
import Kingfisher

struct HighlightedArticle: View {
    @State var imageUrl: URL?
    
    let article: BlogPost
    
    var body: some View {
        GeometryReader { reader in
            KFImage(imageUrl)
                .resizable()
                .aspectRatio(contentMode: .fill)
                .frame(width: reader.size.width, height: 158, alignment: .center)
                .overlay(
                    LinearGradient(gradient: Gradient(colors: [Color.clear, Color.black.opacity(0.4)]), startPoint: .top, endPoint: .bottom)
                )
                .cornerRadius(14)
                .overlay(
                    HStack {
                        VStack(alignment: .leading) {
                            Text(article.title)
                                .font(.custom(Font.Signika.bold.rawValue, size: 16))
                                .foregroundColor(.white)
                            
                            Text(article.categoryName)
                                .font(.custom(Font.Signika.regular.rawValue, size: 14))
                                .foregroundColor(.white)
                            
                            Text(article.subcategoryName)
                                .font(.custom(Font.Signika.regular.rawValue, size: 14))
                                .foregroundColor(.white)
                            
                        }
                        
                        Spacer()
                        
                        //                    Text(category.duration)
                        //                        .font(.custom(Font.Signika.regular.rawValue, size: 14))
                        //                        .foregroundColor(.white)
                    }
                    .padding([.horizontal, .bottom], 16)
                    , alignment: .bottom)
                .onAppear {
                    getContentURL()
                }
        }
        .frame(height: 158)
    }
    
    func getContentURL() {
        let contentURLStorageResolver: BlogStorageRepository = Resolver.resolve()
        
        self.imageUrl = contentURLStorageResolver.buildContentURL(for: article.imageCoverUUID ?? article.imageUUID, type: .image)
    }
}
