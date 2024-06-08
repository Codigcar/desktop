//
//  Insurance.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/20/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct InsuranceCompany: Codable, Hashable, Equatable {
    let name: String
    let color: String?
    let logoUrl: URL?
    let phoneNumber: String?
    
    var insuranceCompanyColor: String {
        guard var c = color else { return "FFFFFF" }
        c.removeAll { (char) -> Bool in
            char == "#"
        }
        return String(c)
    }
}

struct Insurance: Codable, Identifiable, Hashable, Equatable {
    static func == (lhs: Insurance, rhs: Insurance) -> Bool {
        lhs.id == rhs.id
    }
    
    enum Status: String, Codable {
        case valid = "Vigente"
        case invalid
    }
    
    let clientName: String
    let number: String
    let id: Int
    let executive: Executive
    let riskGroup: RiskGroup
    let validity: String
    let detail: String
    let insuranceCompany: InsuranceCompany
    var businessUnit: BusinessUnit
    let state: Status
    
    var endosos = [Endoso]()
    var primas = [Prima]()
    var documents = [Document]()
    var siniestros = [Siniestro]()
}

