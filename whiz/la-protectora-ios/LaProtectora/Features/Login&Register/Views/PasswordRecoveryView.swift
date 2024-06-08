//
//  PasswordRecoveryView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 7/31/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI

struct PasswordRecoveryView: View {
    @EnvironmentObject var viewModel: LoginViewViewModel
    
    var body: some View {
        VStack(spacing: 55) {
            VStack {
                Image(decorative: "big_lock_icon")
                                                        
                Text("A todos nos ha pasado")
                    .foregroundColor(.gray)
                    .font(.system(size: 26, weight: .bold, design: .rounded))
                
                Text("Para obtener un nueva contraseña, ingresa el correo con el que te registarte para enviártela.")
                    .foregroundColor(Color(hex: "707070"))
                    .font(.system(size: 14, weight: .regular, design: .default))
                    .multilineTextAlignment(.center)
                    .frame(height: 60)
            }
            
            LabeledTextField(imageName: "mail_icon", label: "Email", text: self.$viewModel.email)
                .keyboardType(.emailAddress)
                .autocapitalization(.none)
                .disableAutocorrection(true)
            
            VStack(spacing: 25) {
                LPButton(title: "Solicitar Contraseña", enabled: self.viewModel.isRecoverButtonEnabled) {
                    self.viewModel.requestNewPassword()
                }
                
                Text("Iniciar Sesión")
                    .foregroundColor(Color(hex: "525252"))
                    .font(.system(size: 15, weight: .semibold, design: .default))
                    .onTapGesture {
                        self.viewModel.index = 1
                }
            }
        }
        .padding(.horizontal, 30)
        .padding(.vertical, 22)
        .background(
            Color.white.cornerRadius(36).shadow(color: Color.black
                .opacity(0.05), radius: 26, x: 0, y: -55)
                .onTapGesture {
                    UIApplication.shared.endEditing()
            }
        )
        .keyboardPadding()
    }
    
}
struct PasswordRecoveryView_Previews: PreviewProvider {
    static var previews: some View {
        PasswordRecoveryView()
            .environmentObject(LoginViewViewModel())
    }
}
