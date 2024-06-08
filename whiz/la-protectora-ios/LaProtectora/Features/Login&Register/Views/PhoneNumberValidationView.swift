//
//  PhoneNumberValidationView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 7/31/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI

struct PhoneNumberValidationView: View {
    @EnvironmentObject var viewModel: LoginViewViewModel
    
    var body: some View {
        VStack(spacing: 55) {
            HStack(alignment: .top) {
                Button(action: {
                    withAnimation {
                        self.viewModel.validationRequested = false
                        self.viewModel.index -= 1
                    }
                }) {
                    Image(systemName: "chevron.left")
                        .foregroundColor(.gray)
                        .font(.system(size: 22, weight: .semibold, design: .rounded))
                        .contentShape(Rectangle())
                        .frame(width: 45, height: 45, alignment: .leading)
                }
                
                Spacer()

                VStack {
                    Image(decorative: "big_lock_icon")
                    
                    Text("Verificación SMS")
                        .foregroundColor(.gray)
                        .font(.system(size: 26, weight: .bold, design: .rounded))
                    
                    Text("La Protectora enviará un código a través de un único mensaje SMS, para verificar tu número de celular.")
                        .foregroundColor(Color(hex: "707070"))
                        .font(.system(size: 14, weight: .regular, design: .default))
                        .multilineTextAlignment(.center)
                        .frame(height: 80)
                }
                
                Spacer()
            }
            
            if !self.viewModel.validationRequested {
                LabeledTextField(imageName: "phone", label: "Ingresar Teléfono", text: self.$viewModel.phoneNumber)
                    .keyboardType(.numberPad)
                
            } else {
                ValidatedTextField(label: "Ingresar Código", text: self.$viewModel.valCode, isValid: self.$viewModel.isCodeValid)
                    .keyboardType(.numberPad)
            }
            
            LPButton(title: !self.viewModel.validationRequested ? "Obtener Código" : "Validar Código", enabled: self.viewModel.isValidationButtonEnabled) {
                !self.viewModel.validationRequested ? self.viewModel.getValidationCode() : self.viewModel.sendVerificationCode()
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

struct PhoneNumberValidationView_Previews: PreviewProvider {
    static var previews: some View {
        PhoneNumberValidationView()
            .environmentObject(LoginViewViewModel())
    }
}
