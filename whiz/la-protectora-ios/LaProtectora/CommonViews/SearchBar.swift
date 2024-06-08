//
//  SearchBar.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 9/14/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI

struct SearchBar: View {
    @Binding var text: String
    
    var body: some View {
        RoundedRectangle(cornerRadius: 10)
            .padding(.horizontal, 20)
            .frame(height: 45)
            .foregroundColor(.white)
            .shadow(color: Color(hex: "878787").opacity(0.2), radius: 10, x: 0, y: 3)
            .overlay(
                HStack(spacing: 12) {
                    Image(systemName: "magnifyingglass")
                        .font(.system(size: 15, weight: .medium, design: .default))
                        .foregroundColor(Color(hex: "CDCDCD"))
                    
                    InputAccessory(text: self.$text)
                        .frame(width: 300, height: 45)
                        .clipped()
                    
                    Spacer()
                }
                .padding(.horizontal, 32)
                , alignment: .leading)
            .padding(.top, 5)
    }
}


struct SearchBar_Previews: PreviewProvider {
    static var previews: some View {
        SearchBar(text: .constant(""))
    }
}
