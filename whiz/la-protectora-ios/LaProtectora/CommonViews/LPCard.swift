//
//  LPCard.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/5/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI

protocol LPCardData {
    var id: String { get }
    
    var title: String { get }
    
    var status: String? { get }
    
    var description: String { get }
    
    var disclosure: LPCardDetailedDisclosure? {get}
    
    var rowsData: [SmallRow.Data] { get }
    
    var url: URL? { get }
}

struct LPCardDetailedDisclosure: Hashable {
    var imageName: String
    var text: String
}

struct LPCard: View {
    
    let data: LPCardData
    
    var body: some View {
        HStack(spacing: 20) {
            VStack(spacing: 4) {
                SmallTitleRow(text: self.data.title, detail: self.data.description, status: self.data.status)
                
                ForEach(self.data.rowsData, id: \.self) { data in
                    SmallRow(data: data)
                }
            }
            
            if self.data.disclosure != nil {
                Rectangle()
                    .foregroundColor(Color(hex:"C8C7CC").opacity(0.20))
                    .frame(width: 1, height: 90)
                
                VStack {
                    Image(decorative: self.data.disclosure!.imageName)
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 45)
                    
                    Text("Ver \(self.data.disclosure!.text)")
                        .font(.system(size: 8))
                        .foregroundColor(.white)
                        .padding(4)
                        .background(Color(hex: "37E0A3").cornerRadius(2))
                }
            }
        }
        .padding([.horizontal, .bottom], 12)
        .padding(.top, 14)
        .background(Color.white.cornerRadius(12).shadow(color: Color.black.opacity(0.20), radius: 4, x: 0, y: 2))
    }
}

struct LPCard_Previews: PreviewProvider {
    static var rowsData = [ SmallRow.Data(text: "Aseguradora", detail: "Rimac"),
                     SmallRow.Data(text: "Riesgo", detail: "Vehículos/Autos"),
                     SmallRow.Data(text: "Unidad de Negocio", detail: "Seguros Corporaivos"),
                     SmallRow.Data(text: "Asegurado", detail: "Alonso Castro Tavara"),
                     SmallRow.Data(text: "Vigencia", detail: "22.05.2019 al 22.05.2020"),
                     SmallRow.Data(text: "Ejecutivo", detail: "Lucero Díaz")]
    
    static var previews: some View {
        LPCard(data: Mocker.followupCardData[0])
            .padding(.horizontal, 14)
    }
}

