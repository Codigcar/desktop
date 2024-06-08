//
//  InsurancesHeaderBar.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/5/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI

struct HeaderTabBar: View {
    struct Item: Hashable {
        var name: String
        var imageName: String
    }

    var items: [Item]
    @Binding var selectedItem: Int
    
    var body: some View {
        ZStack(alignment: .bottom) {
            Color.white
                .frame(height: 108)
                .shadow(color: Color.gray.opacity(0.08), radius: 2, x: 0, y: 4)
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: self.items.count < 4 ? 70 : 28) {
                    ForEach(0 ..< self.items.count, id: \.self) { (index) in
                        Button(action: {
                            self.selectedItem = index
                        }) {
                            VStack {
                                Image(decorative: self.items[index].imageName)
                                    .resizable()
                                    .aspectRatio(contentMode: .fit)
                                    .frame(width: 35, height: 35)
                                    .padding(4)
                                    .overlay(Circle().stroke(self.selectedItem == index ? Color(hex: "D71920") : .white, lineWidth: 1.5))
                                
                                Text(self.items[index].name)
                                    .foregroundColor(Color(hex: "525252").opacity(0.5))
                                    .font(.system(size: 11, weight: .medium, design: .default))
                                    .fixedSize()
                                    .padding(.bottom, 14)
                                
                                Rectangle()
                                    .foregroundColor(self.selectedItem == index ? Color(hex: "D71920") : Color.white)
                                    .frame(width: 36, height: 3)
                            }
                        }
                        .buttonStyle(PlainButtonStyle())
                    }
                }
                .padding(.horizontal, self.items.count < 4 ? 40 : 20)
                .padding(.vertical, 6)
            }
            
        }
    }
}

struct InsurancesHeaderBar_Previews: PreviewProvider {
    static var previews: some View {
        HeaderTabBar(items:  [HeaderTabBar.Item(name: "Detalle", imageName: "detail_icon"), HeaderTabBar.Item(name: "Endosos", imageName: "endoso_icon"), HeaderTabBar.Item(name: "Vehículo", imageName: "car_small_icon")], selectedItem: .constant(0))
    }
}
