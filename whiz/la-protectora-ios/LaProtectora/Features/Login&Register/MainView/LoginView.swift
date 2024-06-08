//
//  LoginView.swift
//  La Protectora
//
//  Created by Rolando Rodriguez on 7/31/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI

struct LoginView: View {
    @ObservedObject var viewModel: LoginViewViewModel
    
    var body: some View {
        NavigationView {
            ZStack(alignment: .top) {
                Color.white.edgesIgnoringSafeArea(.all)
                    .onTapGesture {
                        UIApplication.shared.endEditing()
                }
                GeometryReader { reader in
                    ZStack(alignment: .bottom) {
                        VStack {
                            Image(decorative: "background_login")
                                .resizable()
                                .aspectRatio(contentMode: .fit)
                                
                            
                            Spacer()
                        }
                        
                        ZStack(alignment: .bottom) {
                            Color.white.cornerRadius(37)
                                .frame(height: reader.size.height*0.65)
                                .alert(isPresented: self.$viewModel.shouldShowAlert) {
                                    Alert(title: Text(self.viewModel.message), message: nil, dismissButton: .default(Text("Aceptar"), action: {
                                        self.viewModel.shouldShowAlert = false
                                    }))
                                }

                            
                            PaginatedView(4, orientation: .horizontal, alignment: .leading, currentIndex: self.$viewModel.index, dragToDismiss: .inactive, backgroundColor: .clear, isDragEnabled: false) { (index, transform) in
                                
                                if index == 0 {
                                    PasswordRecoveryView()
                                }
                                
                                if index == 1 {
                                    SigninView()
                                }
                                
                                if index == 2 {
                                    RegisterView()
                                }
                                
                                if index == 3 {
                                    PhoneNumberValidationView()
                                }
                                
                            }
                            .environmentObject(self.viewModel)
                        }
                        .animation(.spring())
                    }
                }
                
                if self.viewModel.isLoading {
                    Loader()
                }
            }
        }
        .accentColor(.black)
    }
}









struct LoginvView_Preview: PreviewProvider {
    static var previews: some View {
        LoginView(viewModel: LoginViewViewModel())
    }
}







