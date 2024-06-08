//
//  Executive.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 9/1/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct Executive: Codable, Equatable, Identifiable, Hashable {
    let id: Int?
    let name: String
    let phone: String
    var email: String?
    var cellPhone: String?
    var pictureUrl: URL?
    var iconsUrls = [URL?]()
    var position: String?
}
