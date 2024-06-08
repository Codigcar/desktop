//
//  ArticleDetailView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/20/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI
import Kingfisher
import Resolver

struct ArticleDetailView: View {
    let post: BlogPost
    
    @State var imageUrl: URL?
    
    var body: some View {
        ZStack(alignment: .top) {
            Color.white
            
            Group {
                switch post.type {
                case .article:
                    VStack(alignment: .leading, spacing: 6) {
                        KFImage(imageUrl)
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: UIScreen.main.bounds.width)
                        
                        Text(post.title)
                            .font(.system(size: 16))
                            .offset(x: 14)

                        Text(post.createdAt)
                            .font(.system(size: 12))
                            .offset(x: 14)

                        HTMLViewer(htmlString: post.html!)
                            .frame(width: UIScreen.main.bounds.width - 20)
                            .offset(x: 10)
                        
                    }
                    .frame(width: UIScreen.main.bounds.width - 20)
                    .onAppear {
                        getContentURL()
                    }
                case .video:
                    WebView(url: post.videoUrl!)
                case .file:
                    WebView(url: buildStorageURL()!, contentType: post.filePath!.contains("jpeg") || post.filePath!.contains("png") ? "" : "application/pdf")
                }
            }
            .navigationBarTitle("\(post.subcategoryName)", displayMode: .inline)
        }
    }
    
    func buildStorageURL() -> URL? {
        if let path = Bundle.main.path(forResource: "Info", ofType: "plist") {
            let dictionary = NSDictionary(contentsOfFile: path)
            guard let baseUrl = dictionary?["BLOG_DOMAINNAME"] as? String else { return nil }
            let url = "https://".appending(baseUrl).appending(post.filePath!)
            print(url)
            return URL(string: url)
        }
        return nil
    }
    
    func getContentURL() {
        let contentURLStorageResolver: BlogStorageRepository = Resolver.resolve()
        
        self.imageUrl = contentURLStorageResolver.buildContentURL(for: post.imageUUID, type: .image)
    }
}
