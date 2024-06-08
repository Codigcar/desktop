//
//  MyInsunrances.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 7/31/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI

struct SmallCardItem: Hashable {
    var name: String
    var imageName: String!
    var url: URL?
    var type: RiskGroup.Kind
}

struct MyInsunrances: View {
    @Binding var isOpen: Bool
    
    var body: some View {
        VStack(spacing: 30) {
            ZStack(alignment: .bottom) {
                ZStack {
                    Rectangle()
                        .foregroundColor(.clear)
                        .background(LinearGradient(gradient: Gradient(colors: [Color(hex: "FAFAFA"), Color(hex: "CBCBCB")]), startPoint: .top, endPoint: .bottom).opacity(0.22))
                        .frame(height: 120)
                        .overlay(
                            Text("Seguros diseñados para ti")
                                .font(.system(size: 15, weight: .regular, design: .default))
                                .foregroundColor(Color(hex: "817272"))
                                .padding(.horizontal, 6)
                                .padding(.vertical, 4)
                                .background(
                                    Color.white.cornerRadius(6)
                                        .shadow(color: Color(hex: "7F7F7F").opacity(0.22), radius: 13, x: 0, y: 2)
                                    )
                                .offset(y: 15)
                            , alignment: .bottom)
                    
                    Image(decorative: "logotipo")
                        .offset(y: -50)
                    
                }
            }
            
            VStack(spacing: 20) {
                ProductSeccion(title: "Vehiculares", items: [Item(name: "Vehicular", imageName: "car_icon"), Item(name: "Soat", imageName: "soat_icon"), Item(name: "Transporte", imageName: "transport_icon"), Item(name: "Cascos Marítimos", imageName: "boats_icon")])
                
                ProductSeccion(title: "Salud", items: [Item(name: "Salud", imageName: "health_icon"), Item(name: "Asistencia Médica", imageName: "med_assist_icon"), Item(name: "Accidentes P.", imageName: "trauma_icon"), Item(name: "Oncológico", imageName: "onco_icon")])
                
                ProductSeccion(title: "Generales", items: [Item(name: "EPS", imageName: "eps_icon"), Item(name: "Vida", imageName: "life_icon"), Item(name: "SPR Salud", imageName: "str_icon"), Item(name: "STR Pensión", imageName: "pension_icon")])
                
            }
            
            Spacer()
            
        }
        .hideNavigationBar()
        
    }
}

struct NavigationBarHandler: ViewModifier {
    func body(content: Content) -> some View {
        Group {
            if #available(iOS 14.0, *) {
                content
            } else {
                content
                    .navigationBarHidden(true)
            }
        }
    }
}

extension View {
    func hideNavigationBar() -> some View {
        self.modifier(NavigationBarHandler())
    }
}

struct ProductSeccion: View {
    var title: String
    var items: [Item]
    var itemSpacing: CGFloat {
        UIScreen.main.bounds.width > 375 ? 28 : 20
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Text(self.title)
                .padding(.leading, 6)
            
            ZStack(alignment: .leading) {
                Color.white
                    .cornerRadius(8)
                    .shadow(color: Color(hex: "747474").opacity(0.2), radius: 22, x: 0, y: 6)
                    .frame(maxHeight: 100)
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 30) {
                        ForEach(self.items, id: \.self) { (item) in
                            VStack {
                                Image(decorative: item.imageName)
                                    .resizable()
                                    .aspectRatio(contentMode: .fit)
                                    .frame(width: 40, height: 40)
                                
                                Text(item.name)
                                    .foregroundColor(Color(hex: "525252").opacity(0.5))
                                    .font(.system(size: 11, weight: .medium, design: .default))
                                    .fixedSize()
                            }
                        }
                    }
                    .padding(.horizontal, 15)
                }
            }
            .padding(.top, 8)
        }
        
    }
}

struct MyInsunrances_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            MyInsunrances(isOpen: .constant(true))
                .previewDevice(PreviewDevice(rawValue: "iPhone 8"))
            
            MyInsunrances(isOpen: .constant(true))
                .previewDevice(PreviewDevice(rawValue: "iPhone 11 Pro"))
        }
    }
}
