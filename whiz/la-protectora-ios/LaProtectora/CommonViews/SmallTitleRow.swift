//
//  SmallTitleRow.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/5/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI

struct SmallTitleRow: View {
    var text: String
    var detail: String
    var status: String? = nil
    
    var body: some View {
        HStack {
            Text(text)
                .foregroundColor(.black)
                .font(.custom(Font.Signika.regular.rawValue, size: 14))
            
            if self.status != nil {
                Text(status!)
                    .font(.system(size: 10, weight: .bold, design: .default))
                    .foregroundColor(.white)
                    .padding(2)
                    .background(Color(hex: "37E0A3").cornerRadius(2))
            }
            
            Spacer()
            
            Text(detail)
                .foregroundColor(.black)
                .font(.custom(Font.Signika.regular.rawValue, size: 13))
            
        }
    }
}
