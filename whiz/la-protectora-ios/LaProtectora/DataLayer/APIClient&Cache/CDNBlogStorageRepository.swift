//
//  CDNBlogStorageRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 11/19/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct CDNBlogStorageRepository: BlogStorageRepository {
    func buildContentURL(for uuid: String, type: CDNContentType = .image) -> URL? {
        if let path = Bundle.main.path(forResource: "Info", ofType: "plist") {
            let dictionary = NSDictionary(contentsOfFile: path)
            if type == .image {
                guard let baseUrl = dictionary?["CDN_PATH"] as? String else { return nil }
                let url = "https://".appending(baseUrl).appending(uuid).appending("/png")
                return URL(string: url)
            }
            return nil
        } else {
            return nil
        }
    }
}
