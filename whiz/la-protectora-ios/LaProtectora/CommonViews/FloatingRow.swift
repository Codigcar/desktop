//
//  FloatingRow.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/4/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI
import Kingfisher

struct FloatingRow: View {
    enum RowType {
        case call
        case disclosure
        case none
    }
    
    var imageName: String?
    var remoteImageUrl: URL?
    var title: String
    var description: String?
    var serviceImageName: String?
    var remoteLogoUrl: URL?
    var type: RowType
    
    
    var body: some View {
        ZStack(alignment: .leading) {
            Color.white
                .cornerRadius(8)
                .shadow(color: Color.black.opacity(0.1), radius: 4, x: 0, y: 2)
            
            
            HStack(spacing: 12) {
                if imageName != nil {
                    Image(decorative: self.imageName!)
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                        .frame(width: 48, height: 48)
                        .clipShape(Circle())
                }
                
                if remoteImageUrl != nil {
                    KFImage(self.remoteImageUrl)
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: 48, height: 48)
                    .clipShape(Circle())
                }
                
                VStack(alignment: .leading) {
                    Text(self.title)
                        .foregroundColor(.black)
                        .font(.custom(Font.Signika.regular.rawValue, size: 14))
                    if self.description != nil {
                        Text(self.description!)
                            .foregroundColor(Color(hex: "8E8E93"))
                            .font(.system(size: 11))
                    
                    }
                }
                .frame(maxWidth: 184, alignment: .leading)
                
                if self.serviceImageName != nil {
                     Image(decorative: self.serviceImageName!)
                }
                
                if self.remoteLogoUrl != nil {
                    KFImage(self.remoteLogoUrl)
                        .resizable()
                }
                
                
                Spacer()
                
                if self.type == .call {
                    Image(systemName: "phone.fill")
                        .font(.system(size: 20))
                        .foregroundColor(.black)
                        .frame(width: 36, height: 36)
                        .background(
                            Color(hex: "959595").opacity(0.1))
                        .clipShape(Circle())
                } else if self.type == .disclosure {
                    Image(systemName: "chevron.right")
                        .font(.system(size: 14, weight: .semibold, design: .default))
                }
                
            }
            .padding(.leading, 16)
            .padding(.trailing, 20)
        }
        .padding(.horizontal, 20)
        .frame(height: 65)
    }
}

struct FloatingRow_Previews: PreviewProvider {
    static var previews: some View {
        FloatingRow(imageName: "bus_image", title: "SUTRAN 0800 12345", description: nil, serviceImageName: nil, type: .call)
    }
}

