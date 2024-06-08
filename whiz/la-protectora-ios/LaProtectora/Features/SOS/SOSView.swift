//
//  SOSView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/4/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI

struct EmergencyContact {
    let name: String
    let phone: String
}

struct SOSView: View {
    let imageNames = ["warning_image", "police_image", "ambulance_image", "firetruck_image", "bus_image"]
    
    let descriptions = ["Registra un Choque/Robo/Atropello/Pedido de Asistencia Mecánica.", "", "El Sistema de Atención Móvil de Urgencia del Ministerio de Salud del Perú.", "", "Superintendencia de Transporte Terrestre, Carga y Mercancías"]
    
    let contacts = [EmergencyContact(name: "Policía Nacional 105", phone: "105"), EmergencyContact(name: "Ambulancia del SAMU 106", phone: "106"), EmergencyContact(name: "Bomberos 116", phone: "116"), EmergencyContact(name: "SUTRAN 01 2004555", phone: "012004555")]
    
    @State var isActive: Int?
    
    var body: some View {
        VStack(spacing: 0) {
            HeaderView(title: "Botón de emergencia")
            
            NavigationLink(destination: LazyLoadedView(InsuredVehiclesList(model: InsuredVehicleListModel())), tag: 0, selection: self.$isActive) {
                Rectangle()
                    .foregroundColor(.white)
                    .frame(height: 2)
            }
            .buttonStyle(PlainButtonStyle())
            
            ScrollView {
                VStack {
                    Image(decorative: "sos_header_image")
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                        .padding(.top, 60)
                        .scaleEffect(1.2)
                        .frame(height: 160)
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                        .overlay(
                            VStack(alignment: .leading) {
                                Text("S.O.S")
                                    .font(.system(size: 25, weight: .bold, design: .default))
                                    .foregroundColor(Color.white.opacity(0.85))
                                
                                Text("Presiona para poder llamar")
                                    .font(.system(size: 11))
                                    .foregroundColor(Color.white.opacity(0.85))
                            }
                            .padding(16)
                            , alignment: .bottomLeading)
                        .padding(.horizontal, 22)
                        .padding(.top, 20)
                        .padding(.bottom, 34)
                    
                    VStack(spacing: 16) {
                        ForEach(0 ..< 5) { (index)  in
                            self.row(at: index)
                        }
                    }
                    
                    Spacer()
                    
                }
            }
        }
        .LPNavigationBar(showsLogo: false)
        .navigationBarTitle(self.isActive != nil ? " " : "S.O.S", displayMode: .inline)
    }
    
    func row(at index: Int) -> some View {
        Group {
            if index == 0 {
                FloatingRow(imageName: self.imageNames[0], title: "Siniestro Vehicular", description: self.descriptions[0] == "" ? nil : self.descriptions[0], serviceImageName: nil, type: .disclosure).onTapGesture {
                    self.isActive = 0
                }
            } else {
                FloatingRow(imageName: self.imageNames[index], remoteImageUrl: nil, title: self.contacts[index - 1].name, description: self.descriptions[index] == "" ? nil : self.descriptions[index], serviceImageName: nil, remoteLogoUrl: nil, type: .call)
                    .onTapGesture {
                        self.makeACall(to: self.contacts[index - 1].phone)
                }
            }
        }
    }
    
    func makeACall(to number: String) {
        guard let url = URL(string: "tel://\(number)"),
            UIApplication.shared.canOpenURL(url) else { return }
            UIApplication.shared.open(url)
    }
}

struct SOSView_Previews: PreviewProvider {
    static var previews: some View {
        SOSView()
    }
}


