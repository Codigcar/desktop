//
//  SmallTitleRow.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/5/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI
import Kingfisher

struct SmallRow: View {
    struct Data: Hashable {
        var text: String
        var detail: String
        var url: URL? = nil
    }
    
    var data: Data
 
    var body: some View {
        HStack {
            Text(data.text)
                .foregroundColor(.black)
                .font(.system(size: 12))
            
            Spacer()
            
            if data.url != nil {
                KFImage(data.url)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 80, height: 50, alignment: .center)
                    .clipped()
            } else {
                Text(data.detail)
                    .foregroundColor(Color.black.opacity(0.36))
                    .font( .system(size: 12))
                    .multilineTextAlignment(.trailing)
            }
        }
        .padding(.top, 10)
        .overlay(Rectangle().frame(height: 0.44).foregroundColor(Color(hex: "C8C7CC").opacity(0.20)), alignment: .top)
    }

}
