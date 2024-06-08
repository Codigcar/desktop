//
//  RegisterView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 7/31/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI
import Combine

struct RegisterView: View {
    @EnvironmentObject var viewModel: LoginViewViewModel
    
    @State var showPrivacyDisclosure = false
    
    @State var showFullSizeSheet = false
    
    private var deviceDefinedTopPadding: CGFloat {
        UIScreen.main.bounds.height == 667 ? 100 : 140
    }
    
    private var keyboardIsShowing: AnyPublisher<Bool, Never> {
        Publishers.Merge(
            NotificationCenter.default
                .publisher(for: UIResponder.keyboardWillShowNotification)
                .map { _ in true },
            NotificationCenter.default
                .publisher(for: UIResponder.keyboardWillHideNotification)
                .map { _ in false }
        ).eraseToAnyPublisher()
    }
    
    var termsNotice: String {
          "Antes de dar click en aceptar. Confírmanos que estás de acuerdo y nos autorizas al tratamiento de tus datos personales y remisión de información sobre nuestros servicios y productos conforme a las condiciones adjuntas."
      }
    
    var body: some View {
        VStack(spacing: 23) {
            HStack {
                Button(action: {
                    withAnimation {
                        self.viewModel.index = 1
                    }
                }) {
                    Image(systemName: "chevron.left")
                        .foregroundColor(.gray)
                        .font(.system(size: 22, weight: .semibold, design: .rounded))
                        .contentShape(Rectangle())
                        .frame(width: 45, height: 45, alignment: .leading)
                }
                
                Spacer()
                
                Text("Regístrate")
                    .foregroundColor(.gray)
                    .font(.system(size: 26, weight: .bold, design: .rounded))
                    .padding(.trailing, 30)
                
                Spacer()
            }
            VStack(spacing: 16) {
                LabeledTextField(imageName: "dni_icon", label: "DNI", text: self.$viewModel.dni)
                    .keyboardType(.numberPad)
                
                LabeledTextField(imageName: "person_icon", label: "Nombres", text: self.$viewModel.name)
                
                LabeledTextField(imageName: "person_icon", label: "Apellidos", text: self.$viewModel.lastName)
                
                LabeledTextField(imageName: "mail_icon", label: "Email", text: self.$viewModel.email)
                    .keyboardType(.emailAddress)
                    .autocapitalization(.none)
                
                SecureLabeledTextField(imageName: "lock_icon", label: "Contraseña", text: self.$viewModel.password)
                    .autocapitalization(.none)
            }
            
            Toggle(isOn: self.$viewModel.termsAceppted) {
                Text("")
            }
            .toggleStyle(ColoredToggleStyle(label: self.termsNotice, secondLabel: "Ver aquí",
                                            onColor: Color(hex: "D51C23")))
            .onTapGesture {
                self.showPrivacyDisclosure.toggle()
            }
            .sheet(isPresented: self.$showPrivacyDisclosure) {
                NavigationView {
                    WebView(url: URL(string: "http://aws2.laprotectora.com.pe/aws/document/Autorizacion_tratamiento_de_Datos_Personales.pdf")!)
                        .navigationBarTitle("Datos Personales", displayMode: .inline)
                        .navigationBarItems(trailing:
                                                Button("Cerrar") {
                                                    self.showPrivacyDisclosure.toggle()
                                                })
                }
                .accentColor(.red)
                .animation(.easeInOut)
            }
            .frame(height: 60)
            
            LPButton(title: "Registrarme", enabled: self.viewModel.isRegisterButtonEnabled) {
                self.viewModel.register()
            }
            
        }
        .onReceive(keyboardIsShowing, perform: { isShowing in
            self.showFullSizeSheet = isShowing
        })
        .padding(.horizontal, 30)
        .padding(.vertical, 22)
        .background(
            Color
                .white
                .cornerRadius(36)
                .shadow(color: Color.black.opacity(0.05), radius: 26, x: 0, y: -55)
                .onTapGesture {
                    UIApplication.shared.endEditing()
                }
        )
        .padding(.top, showFullSizeSheet ? 0 : deviceDefinedTopPadding)
        .padding(.bottom, !showFullSizeSheet ? 0 : deviceDefinedTopPadding + 20)
        .keyboardPadding()
    }
    
}
struct RegisterView_Previews: PreviewProvider {
    static var previews: some View {
        RegisterView()
            .environmentObject(LoginViewViewModel())
    }
}
