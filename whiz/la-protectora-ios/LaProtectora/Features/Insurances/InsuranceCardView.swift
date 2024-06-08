//
//  InsuranceCardView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/7/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI

struct InsuranceCardView: View {
    var insurance: Insurance
    
    private var insuranceCompanyColor: String {
        var color = self.insurance.insuranceCompany.color!
        color.removeAll { (char) -> Bool in
            char == "#"
        }
        return String(color)
    }
    
    private var vehicleShortHand: String {
        guard let make = self.insurance.detail.split(separator: " ").first else { return "" }
        return String(make)
    }
    
    var body: some View {
        VStack {
            HStack {
                Text("N. Póliza : \(insurance.number)")
                    .font(.system(size: 12, weight: .semibold, design: .default))
                    .foregroundColor(Color.black.opacity(0.8))
                
                Spacer()
                
                HStack {
                    Text("ver detalle")
                        .font(.system(size: 12, weight: .semibold, design: .default))
                        .foregroundColor(Color.black.opacity(0.50))
                    
                    Image(systemName: "chevron.right")
                        .font(.system(size: 12, weight: .semibold, design: .default))
                        .foregroundColor(Color.black.opacity(0.50))
                }
            }
            
            HStack {
                Text(self.insurance.insuranceCompany.name)
                    .font(.custom(Font.Signika.regular.rawValue, size: 16))
                    .foregroundColor(Color(hex: self.insuranceCompanyColor))
                
                Text(self.insurance.state == .valid ? "Vigente" : "Vencido")
                    .font(.system(size: 10, weight: .bold, design: .default))
                    .foregroundColor(.white)
                    .padding(.horizontal, 6)
                    .padding(.vertical, 2)
                    .background(Color(hex: "19D792").cornerRadius(4))
                
                Spacer()
                
                Text(self.insurance.riskGroup.name)
                    .font(.system(size: 12, weight: .semibold, design: .default))
                    .foregroundColor(Color(hex: "C8C7CC"))
            }
            .padding(.top, 10)
            .overlay(Rectangle().frame(height: 0.44).foregroundColor(Color(hex: "C8C7CC").opacity(0.20)), alignment: .top)
            
            if self.insurance.riskGroup.type == .vehicular {
                HStack {
                    Text("Vehículo")
                        .font(.system(size: 12, weight: .regular, design: .default))
                        .foregroundColor(Color.black.opacity(0.4))
                    
                    Spacer()
                    
                    Text(self.vehicleShortHand)
                        .font(.system(size: 12, weight: .regular, design: .default))
                        .foregroundColor(Color.black.opacity(0.4))
                }
                .padding(.top, 10)
                .overlay(Rectangle().frame(height: 0.44).foregroundColor(Color(hex: "C8C7CC").opacity(0.20)), alignment: .top)
            }
            
            HStack {
                Image(decorative: "support_icon")
                
                Text(self.insurance.executive.name)
                    .font(.system(size: 12, weight: .regular, design: .default))
                    .foregroundColor(Color.black.opacity(0.4))
                
                Spacer()
                
                Image(systemName: "phone.fill")
                    .font(.system(size: 12, weight: .regular, design: .default))
                    .foregroundColor(Color.black.opacity(0.4))
                
                Text(self.insurance.executive.phone)
                    .font(.system(size: 12, weight: .regular, design: .default))
                    .foregroundColor(Color.black.opacity(0.4))
            }
                .padding(.top, 10)
                .overlay(Rectangle().frame(height: 0.44).foregroundColor(Color(hex: "C8C7CC").opacity(0.20)), alignment: .top)
        }
        .padding(.horizontal, 14)
        .padding(.top, 13)
        .padding(.bottom, 15)
        .background(Color.white.cornerRadius(12).shadow(color: Color.black.opacity(0.20), radius: 4, x: 0, y: 2))
    }
}
