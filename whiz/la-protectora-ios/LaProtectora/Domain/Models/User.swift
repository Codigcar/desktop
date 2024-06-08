//
//  User.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/14/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct BusinessUnit: Codable, Identifiable, Hashable {
    let id: Int
    var name: String?
}

struct IdentityDocument: Codable{
    let number: String
    let type: DocumentType
    let id: Int
}

enum DocumentType: String, Codable {
    case dni = "D.N.I."
    case ruc = "R.U.C."
}

struct User: Codable {
    enum ClientType: String, Codable {
        case natural = "NATURAL"
        case enterprise = "JURIDICO"
        case none = "NO ES CLIENTE"
    }
    
    struct Address: Codable {
        var department: String
        
        var departmentId: String
        
        var province: String
    
        var provinceId: String
        
        var district: String
        
        var districtId: String
        
        var street: String
    }
    
    let userCode: String
    
    let id: Int?
    
    let firstName: String
    
    let middleName: String
    
    let lastName: String
    
    var fullName: String {
        firstName +  " " + middleName + " " + lastName
    }
    
    let businessUnit: BusinessUnit?
    
    let document: IdentityDocument?
    
    let type: ClientType
    
    var address: Address?
    
    var phones: [String]?
    
    var cellPhone: String?
    
    var email: String
    
    var birthDate: Date?
    
    let clientFullName: String
}
