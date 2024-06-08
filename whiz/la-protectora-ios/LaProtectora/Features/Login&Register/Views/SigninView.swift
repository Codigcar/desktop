//
//  SigninView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 7/31/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI
import Combine

struct SigninView: View {
    @EnvironmentObject var viewModel: LoginViewViewModel
    
    @State var isShowingInsurances = false
    
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
    
    var body: some View {
        VStack(spacing: 23) {
            Text("Bienvenidos")
                .foregroundColor(.gray)
                .font(.system(size: 26, weight: .bold, design: .rounded))
                .padding(.top, 20)
            
            VStack(spacing: 16) {
                LabeledTextField(imageName: "dni_icon", label: "DNI", text: self.$viewModel.dni)
                    .autocapitalization(.none)
                    .disableAutocorrection(true)
                
                SecureLabeledTextField(imageName: "lock_icon", label: "Contraseña", text: self.$viewModel.password)
            }
            
            Text("No recuerdo mi contraseña")
                .foregroundColor(Color(hex: "525252"))
                .font(.system(size: 15, weight: .semibold, design: .default))
                .onTapGesture {
                    self.viewModel.index = 0
            }
            
            LPButton(title: "Ingresar", enabled: true) {
                self.viewModel.login()
            }
            .alert(isPresented: $viewModel.isShowingEmptyFieldsAlert, content: {
                Alert(title: Text("Alerta"), message: Text("Existen campos por llenar"), dismissButton: .cancel(Text("Aceptar")))
            })
            
            Button(action: {
                self.viewModel.index = 2
            }) {
                HStack(spacing: 6) {
                    Text("Regístrate")
                        .foregroundColor(Color(hex: "525252"))
                        .font(.system(size: 15, weight: .semibold, design: .default))
                    
                    Image(systemName: "chevron.right")
                        .foregroundColor(Color(hex: "525252"))
                        .font(.system(size: 15, weight: .semibold, design: .default))
                }
            }
            
            Spacer()
                        
            HStack(spacing: 45) {
                NavigationLink(destination: MyInsunrances(isOpen: self.$isShowingInsurances), isActive: self.$isShowingInsurances) {
                    LPIconButton(iconName: "seguros_icon", title: "Seguros")
                }
                .buttonStyle(PlainButtonStyle())
                
                Button(action: {
                        guard let url = URL(string: "tel://\("017431111")"),
                              UIApplication.shared.canOpenURL(url) else { return }
                        UIApplication.shared.open(url)
                }) {
                    LPIconButton(iconName: "call_me_icon", title: "Llámanos")
                }
                .buttonStyle(PlainButtonStyle())
            }
        }
        .onReceive(keyboardIsShowing, perform: { isShowing in
            self.showFullSizeSheet = isShowing
        })
        .navigationBarTitle("")
        .padding(.horizontal, 30)
        .padding(.vertical, 22)
        .background(
            Color.white.cornerRadius(36).shadow(color: Color.black
                .opacity(0.05), radius: 26, x: 0, y: -55)
                .onTapGesture {
                    UIApplication.shared.endEditing()
            }
        )
        .padding(.top, showFullSizeSheet ? 80 : deviceDefinedTopPadding)
        .padding(.bottom, !showFullSizeSheet ? 0 : deviceDefinedTopPadding + 20)
        .keyboardPadding()
    }
}


struct SigninView_Previews: PreviewProvider {
    static var previews: some View {
        SigninView()
            .environmentObject(LoginViewViewModel())
    }
}
