//
//  HeaderView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/5/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI
import Kingfisher

struct HeaderView: View {
    var initials: String?
    var imageUrl: URL?
    var title: String
    var description: String? = nil
    
    var body: some View {
        HStack {
            if initials != nil {
                Circle()
                    .foregroundColor(.clear)
                    .background(LinearGradient(gradient: Gradient(colors: [Color(hex: "A80D13"), Color(hex: "D71920")]), startPoint: .bottom, endPoint: .top).clipShape(Circle()))
                    .shadow(color: Color(hex: "484848").opacity(0.20), radius: 5, x: 0, y: 3)
                    .overlay(Circle().stroke(Color.white, lineWidth: 1))
                    .overlay(Text(self.initials!).font(.system(size: 20, weight: .bold, design: .default)).foregroundColor(.white))
                    .frame(width: 72, height: 72)
            }
            
            if self.imageUrl != nil {
                KFImage(self.imageUrl)
                    .resizable()
                    .scaledToFill()
                    .frame(width: 72, height: 72)
                    .clipShape(Circle())
            }
            
            VStack(alignment: .leading) {
                Text(self.title)
                    .font(.custom(Font.Signika.regular.rawValue, size: 24))
                if self.description != nil {
                    Text(self.description!)
                        .foregroundColor(Color(hex: "8A8A8F"))
                        .font(.system(size: 13))
                }
                
                
            }
            .padding(.vertical, 20)
            .overlay(
                Rectangle()
                    .frame(width: 25, height: 4)
                    .foregroundColor(self.initials == nil ? Color(hex: "D71920") : .white)
                , alignment: .bottomLeading)
        }
        .padding(.vertical, initials != nil ? 10 : 0)
        .padding(.leading, 22)
        .frame(width: UIScreen.main.bounds.width, alignment: .leading)
        .background(
            Color.white.shadow(color: Color.black.opacity(0.08), radius: 4, x: 0, y: 2))
            
            .overlay(
                Rectangle()
                    .foregroundColor(Color(hex: "D71920"))
                    .frame(height: 2), alignment: .top)
    }
}

struct HeaderView_Previews: PreviewProvider {
    static var previews: some View {
        HeaderView(title: "Hello, World!")
    }
}
