//
//  PersonalData.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/6/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI
import Resolver

struct PersonalData: View {
    
    @ObservedObject var model: PersonalDataViewModel
    
    @State var isPersonalDataCollapsed = false
    @State var isPasswordUpdateCollapsed = true
    @State var showsDepartamentPicker = false
    @State var showsDistrictPicker = false
    @State var showsProvincePicker = false
    
    
    var personalData: some View {
        VStack {
            DataFieldView(title: "Unidad de Negocio", data: self.model.businessUnitName)
            
            DataFieldView(title: self.model.businessUnitId == 1 ? "Tipo de Persona" : "Razón Social", data: self.model.userType)
            
            if self.model.businessUnitId == 1 {
                HStack {
                    DataFieldView(title: "Nombre", data: self.model.firstName)
                    DataFieldView(title: "Apellido", data: self.model.lastName)
                }
            }
            
            DataFieldView(title: self.model.businessUnitId == 1 ? "D.N.I" : "R.U.C.", data: self.model.dni)
            
            if self.model.businessUnitId == 1 {
                DataFieldView(title: "Fecha de Nacimiento", data: self.model.birthDate)
            }
            
            VStack {
                HStack {
                    PickeableDataFieldView(title: "Departamento", selectedItem: self.model.department?.descrip ?? "", enabled: self.model.canEdit)
                        .onTapGesture {
                            self.showsDepartamentPicker.toggle()
                    }
                    .sheet(isPresented: self.$showsDepartamentPicker) {
                        ListSelectorView(title: "Departamentos", data: self.model.departments, selectedItem: self.$model.department)
                            .colorScheme(.light)
                    }
                    
                    PickeableDataFieldView(title: "Provincia", selectedItem: self.model.province?.descrip ?? "", enabled: self.model.canEdit)
                        .onTapGesture {
                            self.showsProvincePicker.toggle()
                    }
                    .sheet(isPresented: self.$showsProvincePicker) {
                        ListSelectorView(title: "Provincias", data: self.model.provinces, selectedItem: self.$model.province)
                            .colorScheme(.light)
                    }
                }
                
                PickeableDataFieldView(title: "Distrito", selectedItem: self.model.district?.descrip ?? "", enabled: self.model.canEdit)
                    .onTapGesture {
                        self.showsDistrictPicker.toggle()
                }
                .sheet(isPresented: self.$showsDistrictPicker) {
                    ListSelectorView(title: "Distrito", data: self.model.districts, selectedItem: self.$model.district)
                        .colorScheme(.light)
                }
                
            }
            
            
            EditableDataFieldView(title: "Dirección", data: self.$model.address, editable: self.model.canEdit)
            
            HStack {
                EditableDataFieldView(title: "Teléfono", data: self.$model.homePhone, editable: self.model.canEdit)
                    .keyboardType(.phonePad)
                
                if self.model.businessUnitId == 1 {
                  DataFieldView(title: "Celular", data: self.model.cellPhone)
                        .keyboardType(.phonePad)
                }
            }
            
            
            if self.model.businessUnitId == 1 {
                DataFieldView(title: "Email", data: self.model.email)
            }
            
        }
        .animation(Animation.easeInOut(duration: 0.3))
        .transition(.move(edge: .top))
        .disabled(!self.model.canEdit)
    }
    
    var tabBar: some View {
        ZStack(alignment: .bottom) {
            Color.white
                .frame(height: 80)
                .shadow(color: Color.gray.opacity(0.08), radius: 2, x: 0, y: 4)
            HStack(spacing: 80) {
                Button(action: {
                    self.model.selectedItem = 0
                }) {
                    VStack(alignment: .leading) {
                        Text("Mis Datos")
                            .foregroundColor(Color(hex: "525252").opacity(0.5))
                            .font(.custom(Font.Signika.semibold.rawValue, size: 20))
                            .fixedSize()
                            .padding(.bottom, 14)
                        
                        Rectangle()
                            .foregroundColor(self.model.selectedItem == 0 ? Color(hex: "D71920") : Color.white)
                            .frame(width: 52, height: 4)
                    }
                }
                .buttonStyle(PlainButtonStyle())
                
                Button(action: {
                    self.model.selectedItem = 1
                }) {
                    VStack(alignment: .leading) {
                        Text("Mis Seguros")
                            .foregroundColor(Color(hex: "525252").opacity(0.5))
                            .font(.custom(Font.Signika.semibold.rawValue, size: 20))
                            .fixedSize()
                            .padding(.bottom, 14)
                        
                        Rectangle()
                            .foregroundColor(self.model.selectedItem == 1 ? Color(hex: "D71920") : Color.white)
                            .frame(width: 52, height: 4)
                    }
                }
                .buttonStyle(PlainButtonStyle())
            }
        }
    }
    
    func collapsableHeader(title: String, collapse: Binding<Bool>) -> some View {
        VStack(alignment: .center) {
            HStack {
                Text(title)
                    .font(.custom(Font.Signika.regular.rawValue, size: 20))
                Spacer()
                Image(systemName: collapse.wrappedValue ? "chevron.down" : "chevron.up")
                    .foregroundColor(Color(hex: ""))
                    .font(.custom(Font.Signika.semibold.rawValue, size: 16))
                    .frame(width: 30, height: 30, alignment: .trailing)
                    .contentShape(Rectangle())
                
            }
            Rectangle()
                .foregroundColor(Color(hex: "979797").opacity(0.20))
                .frame(height: 1)
        }
        .background(Color(hex: "FBFCFE"))
        .onTapGesture {
            collapse.wrappedValue.toggle()
        }
        
    }
    
    var body: some View {
        ZStack(alignment: .bottom) {
            Color(hex: "FBFCFE")
                .edgesIgnoringSafeArea(.all)
            VStack {
                self.tabBar
                
                if self.model.selectedItem == 0 {
                    ScrollView(.vertical, showsIndicators: false) {
                        VStack {
                            self.collapsableHeader(title: "Datos Personales", collapse: self.$isPersonalDataCollapsed)
                            
                            if !isPersonalDataCollapsed {
                                self.personalData
                                    .alert(isPresented: self.$model.showDataAlert) {
                                        Alert(title: Text(self.model.alertTitle), message: Text(self.model.alertMessage), dismissButton: .default(Text("Aceptar")))
                                }
                            }
                            
                            self.collapsableHeader(title: "Contraseña", collapse: self.$isPasswordUpdateCollapsed)
                            
                            if !isPasswordUpdateCollapsed {
                                VStack {
                                    SecureDataFieldView(title: "Digita tu contraseña anterior", data: self.$model.currentPassword)
                                        .autocapitalization(.none)
                                        .disableAutocorrection(true)

                                    SecureDataFieldView(title: "Digita una nueva contraseña", data: self.$model.newPassword)
                                        .autocapitalization(.none)
                                        .disableAutocorrection(true)

                                    SecureDataFieldView(title: "Confirmar contraseña", data: self.$model.passwordConfirmation)
                                        .autocapitalization(.none)
                                        .disableAutocorrection(true)
                                }
                                .animation(Animation.easeInOut(duration: 0.3))
                                .transition(.move(edge: .top))
                                .alert(isPresented: self.$model.showPasswordAlert) {
                                    Alert(title: Text(self.model.alertTitle), message: Text(self.model.alertMessage), dismissButton: .default(Text("Aceptar")))
                                }
                            }
                            
                            LPButton(title: "Guardar", enabled: !self.model.isActionButtonDisabled) {
                                self.model.updateUserData()
                            }
                            .padding(.top, 60)
                            .padding(.horizontal, 22)
                        }
                        .background(Color(hex: "FBFCFE"))
                        .padding(.horizontal, 20)
                        .padding(.bottom, 60)
                        .keyboardPadding()                      
                    }
                    
                    
                } else {
                    EmbededRiskGroupListView(viewModel: RiskGroupListViewViewModel())
                }
                
                Spacer()
            }
            
            Rectangle()
                .foregroundColor(.white)
                .frame(height: 40)
                .overlay(Button("Cerrar") {
                    UIApplication.shared.endEditing()
                }
                .accentColor(.red)
                .padding(.trailing, 14)
                    , alignment: .trailing)
                .keyboardPadding()
                .offset(y: 82)
                .opacity(self.model.isKeyobardOpen ? 1 : 0)
                .disabled(!self.model.isKeyobardOpen)
            
            if self.model.isLoading {
                Loader()
                    .edgesIgnoringSafeArea(.all)
            }
        }
        .animation(.easeIn)
        .LPNavigationBar(showsLogo: false)
        .navigationBarTitle("Datos Personales", displayMode: .inline)
    }    
}


struct SecureDataFieldView: View {
    var title: String
    @Binding var data: String
    
    var body: some View {
        VStack(alignment: .leading) {
            Text(title)
                .font(.system(size: 12, weight: .medium, design: .default))
                .foregroundColor(Color.black.opacity(0.70))
            
            ZStack(alignment: .leading) {
                Color.white
                    .frame(height: 35)
                    .cornerRadius(8)
                    .shadow(color: Color(hex: "A4A4A4").opacity(0.10), radius: 6, x: 0, y: 4)
                
                SecureField(title, text: $data)
                    .font(.system(size: 11))
                    .foregroundColor(Color(hex: "5F5F5F"))
                    .padding(.leading, 10)
            }
        }
    }
}


struct EditableDataFieldView: View {
    var title: String
    @Binding var data: String
    var editable: Bool
    
    var body: some View {
        VStack(alignment: .leading) {
            Text(title)
                .font(.system(size: 12, weight: .medium, design: .default))
                .foregroundColor(Color.black.opacity(0.70))
            
            ZStack(alignment: .leading) {
                Color.white
                    .frame(height: 35)
                    .cornerRadius(8)
                    .shadow(color: Color(hex: "A4A4A4").opacity(0.10), radius: 6, x: 0, y: 4)
                
                TextField(title, text: $data)
                    .font(.system(size: 11))
                    .foregroundColor(editable ? Color(hex: "5F5F5F") : Color(hex: "5F5F5F").opacity(0.50))
                    .padding(.leading, 10)
            }
        }
    }
}

struct PickeableDataFieldView: View {
    var title: String
    var selectedItem: String
    var enabled: Bool
    
    var body: some View {
        ZStack {
            VStack(alignment: .leading) {
                Text(title)
                    .font(.system(size: 12, weight: .medium, design: .default))
                    .foregroundColor(Color.black.opacity(0.70))
                
                ZStack(alignment: .leading) {
                    Color.white
                        .frame(height: 35)
                        .cornerRadius(8)
                        .shadow(color: Color(hex: "A4A4A4").opacity(0.10), radius: 6, x: 0, y: 4)
                    
                    HStack {
                        Text(selectedItem)
                            .font(.system(size: 11))
                            .foregroundColor(enabled ? Color(hex: "5F5F5F") : Color(hex: "5F5F5F").opacity(0.50))
                            .padding(.leading, 10)
                        
                        Spacer()
                        
                        Image(systemName: "chevron.right")
                        .font(.system(size: 12))
                        .foregroundColor(Color(hex: "5F5F5F"))
                            .padding(.trailing, 20)

                    }
                }
            }
        }
    }
}

struct DataFieldView: View {
    var title: String
    var data: String
    
    var body: some View {
        VStack(alignment: .leading) {
            Text(title)
                .font(.system(size: 12, weight: .medium, design: .default))
                .foregroundColor(Color.black.opacity(0.70))
            
            ZStack(alignment: .leading) {
                Color.white
                    .frame(height: 35)
                    .cornerRadius(8)
                    .shadow(color: Color(hex: "A4A4A4").opacity(0.10), radius: 6, x: 0, y: 4)
                
                Text(data)
                    .font(.system(size: 11))
                    .foregroundColor(Color(hex: "5F5F5F").opacity(0.50))
                    .padding(.leading, 10)
            }
        }
    }
}

struct ListSelectorView: View {
    @Environment(\.presentationMode) var presentationMode: Binding<PresentationMode>
    var title: String
    var data: [UbigeoData]
    @Binding var selectedItem: UbigeoData?
    @Injected private var router: DeepRouter
    
    var body: some View {
        GeometryReader { reader in
            NavigationView {
                List(self.data, id: \.self) { (data) in
                    HStack {
                        Text(data.descrip)
                        if self.selectedItem == data {
                            Spacer()
                            Image(systemName: "checkmark")
                                .foregroundColor(Color(hex: "D71920"))
                        }
                    }
                    .background(Color.white.frame(width: reader.size.width, height: 45))
                    .onTapGesture {
                        self.selectedItem = data
                    }
                }
                .navigationBarTitle(self.title)
                .navigationBarItems(trailing: Button("Listo") {
                    self.router.modalClosed.send(())
                    self.presentationMode.wrappedValue.dismiss()
                })
                    .accentColor(.red)
            }
        }
    }
}

struct PersonalData_Previews: PreviewProvider {
    static var previews: some View {
        PersonalData(model: PersonalDataViewModel())
    }
}
