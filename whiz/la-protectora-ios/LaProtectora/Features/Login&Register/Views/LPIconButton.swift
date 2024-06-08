//
//  LPIconButton.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 7/31/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI

struct LPIconButton: View {
    var iconName: String
    var title: String
    
    var body: some View {
        VStack {
            Image(decorative: iconName)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 30, height: 30)
            
            Text(title)
                .foregroundColor(Color(hex: "525252"))
                .font(.system(size: 11, weight: .medium, design: .default))
                .fixedSize()
        }
        .frame(height: 50)
        .contentShape(Rectangle())
    }
}
struct LPIconButton_Previews: PreviewProvider {
    static var previews: some View {
        LPIconButton(iconName: "mail_icon", title: "Email")
    }
}
