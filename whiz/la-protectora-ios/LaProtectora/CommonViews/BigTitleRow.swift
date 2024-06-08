//
//  BigTitleRow.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/5/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI

struct BigTitleRow: View {
    var text: String
    var detail: String
    var featuredColor: String? = nil

    var body: some View {
        HStack {
            Text(text)
                .foregroundColor(.black)
                .font(.custom(Font.Signika.regular.rawValue, size: 20))
            
            Spacer()
            
            Text(detail)
                .foregroundColor(self.featuredColor != nil ? Color(hex: self.featuredColor!) : Color.black)
                .font(.custom(Font.Signika.regular.rawValue, size: 18))
            
        }
        .padding(.bottom, 10)
        .overlay(Rectangle().frame(height: 0.44).foregroundColor(Color(hex: "C8C7CC").opacity(0.25)), alignment: .bottom)
    }
}
