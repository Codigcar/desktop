//
//  Mapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/20/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

public enum MappingError: Error {
    case providedJSONObjectDoesNotCointainAppropiateFormatOrValues
}

protocol Mapper {
    associatedtype T: Codable
    
    func execute() throws -> T
    
    var dictionary: [String: Any] { get set }
    
    init(dictionary: [String: Any])

}
