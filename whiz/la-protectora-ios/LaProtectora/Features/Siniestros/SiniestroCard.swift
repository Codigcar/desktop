//
//  SiniestroCard.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI

struct SiniestroCard: View {
    let siniestro: SiniestroCardModel
    
    private var insuranceCompanyColor: String {
        var color = self.siniestro.insuranceCompany.color!
        color.removeAll { (char) -> Bool in
            char == "#"
        }
        return String(color)
    }
    
    private var title: String {
        var str = String(siniestro.id)
        str.removeAll { $0 == "," }
        return str
    }
    var body: some View {
        VStack {
            HStack {
                Text("N. Siniestro : \(title)")
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
                Text(self.siniestro.insuranceCompany.name)
                    .font(.custom(Font.Signika.regular.rawValue, size: 16))
                    .foregroundColor(Color(hex: self.insuranceCompanyColor))
                
                Spacer()
                
                Text(self.siniestro.status)
                    .font(.system(size: 10, weight: .bold, design: .default))
                    .foregroundColor(.white)
                    .padding(.horizontal, 6)
                    .padding(.vertical, 2)
                    .background(Color(hex: "19D792").cornerRadius(4))
            }
            .padding(.top, 10)
            .overlay(Rectangle().frame(height: 0.44).foregroundColor(Color(hex: "C8C7CC").opacity(0.20)), alignment: .top)
           
            HStack {
                Text("Fecha Ocurrencia")
                    .font(.system(size: 12, weight: .regular, design: .default))
                    .foregroundColor(Color.black.opacity(0.4))
                
                Spacer()
                
                Text(self.siniestro.date)
                    .font(.system(size: 12, weight: .semibold, design: .default))
                    .foregroundColor(Color(hex: "C8C7CC"))
            }
            .padding(.top, 10)
            .overlay(Rectangle().frame(height: 0.44).foregroundColor(Color(hex: "C8C7CC").opacity(0.20)), alignment: .top)

            
            HStack {
                Text("Riesgo")
                    .font(.system(size: 12, weight: .regular, design: .default))
                    .foregroundColor(Color.black.opacity(0.4))
                
                Spacer()
                
                Text(self.siniestro.risk.name)
                    .font(.system(size: 12, weight: .semibold, design: .default))
                    .foregroundColor(Color(hex: "C8C7CC"))
            }
            .padding(.top, 10)
            .overlay(Rectangle().frame(height: 0.44).foregroundColor(Color(hex: "C8C7CC").opacity(0.20)), alignment: .top)
            
            HStack {
                Text(self.siniestro.executive.name)
                    .font(.system(size: 12, weight: .regular, design: .default))
                    .foregroundColor(Color.black.opacity(0.4))
                
                Spacer()
                
                Image(systemName: "phone.fill")
                    .font(.system(size: 12, weight: .regular, design: .default))
                    .foregroundColor(Color.black.opacity(0.4))
                
                Text(self.siniestro.executive.phone)
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
