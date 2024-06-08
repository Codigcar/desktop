//
//  Siniestro.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/12/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct Siniestro: Codable, Identifiable, Equatable, Hashable {
    var id: String {
        number ?? ""
    }
    
    var number: String?
        
    var status: String?
    
    var insuranceCompany: InsuranceCompany
    
    var date: String
    
    var receptionDate: String 
    
    var coverage: String
    
    var risk: Risk
    
    var detail: String
    
    var expenses: String
    
    var deduction: String
    
    var indemizacion: String
    
    var polizaNumber: String
        
    var lastFollowUp: String
    
    var executive: Executive
}
