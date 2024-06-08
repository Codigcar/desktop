//
//  LPButton.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 7/31/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI

struct LPButton: View {
    var title: String
    var enabled: Bool
    var action: () -> ()
    
    var body: some View {
        Button(action: {
            self.action()
        }) {
            ZStack {
                RoundedRectangle(cornerRadius: 6)
                    .frame(height: 45)
                    .foregroundColor(enabled ? Color(hex: "D51C23") : Color.gray)
                    .shadow(color: Color(hex: "9DA3B4").opacity(0.10), radius: 65, x: 0, y: 10)
                
                Text(title)
                    .font(.system(size: 16, weight: .medium, design: .default))
                    .foregroundColor(.white)
            }
        }
        .buttonStyle(PlainButtonStyle())
        .disabled(!enabled)
    }
}

struct LPSmallButton: View {
    var title: String
    var action: () -> ()
    var color: Color = Color(hex: "D51C23")
    
    var body: some View {
        Button(action: {
            self.action()
        }) {
            ZStack {
                RoundedRectangle(cornerRadius: 6)
                    .frame(height: 36)
                    .foregroundColor(color)
                    .shadow(color: Color(hex: "9DA3B4").opacity(0.10), radius: 65, x: 0, y: 10)
                
                Text(title)
                    .font(.system(size: 14, weight: .medium, design: .default))
                    .foregroundColor(.white)
            }
        }
        .buttonStyle(PlainButtonStyle())
        
    }
}


struct LPButton_Previews: PreviewProvider {
    static var previews: some View {
        LPButton(title: "Button", enabled: true) {
            print("some action executed")
        }
    }
}
