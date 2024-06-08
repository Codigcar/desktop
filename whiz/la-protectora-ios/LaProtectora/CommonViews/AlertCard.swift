//
//  WarningSignView.swift
//  Campus
//
//  Created by Rolando Rodriguez on 2/14/20.
//  Copyright © 2020 Rolando Rodriguez. All rights reserved.
//

import Foundation
import SwiftUI
import Resolver
import Kingfisher


enum ImageTpye {
    case asset
    case remote
}

typealias AyncWorkCompletion = (() -> ())?

class AlertCardBaseViewModel: NSObject, ObservableObject {
    @Published var buttonText: String?
    @Published var title: String
    @Published var message: String
    @Published var isActionButtonDisabled: Bool = false
    @Published var imageName: String
    @Published var imageType: ImageTpye
    
    var dismissAlert: () -> ()
    var onAsyncExecutionRequest: ((AyncWorkCompletion) -> ())?

    init(title: String, message: String, buttonText: String? = nil, imageName: String, imageType: ImageTpye, onDismiss: @escaping () -> ()) {
        self.buttonText = buttonText
        self.title = title
        self.message = message
        self.imageName = imageName
        self.imageType = imageType
        self.dismissAlert = onDismiss
        super.init()
    }
        
    func dismissAction() {
        self.onAsyncExecutionRequest?({
            print("Aync work completed, dismiss alert card...")
            self.dismissAlert()
        })
    }
}

struct AlertCard: View {
    @ObservedObject var viewModel: AlertCardBaseViewModel
    
    var body: some View {
        ZStack {
            Color.black.opacity(0.9)
                .edgesIgnoringSafeArea(.all)
            
            VStack(spacing: 0) {
                if self.viewModel.imageType == .asset {
                    Image(decorative: self.viewModel.imageName)
                        .renderingMode(.original)
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .scaledToFit()
                        .padding(.horizontal, 35)
                        .padding(.bottom, 32)
                } else {
                    KFImage(URL(string: self.viewModel.imageName))
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                        .frame(width: 120, height: 120)
                        .clipShape(Circle())
                }
                
                Text(self.viewModel.title)
                    .font(.custom("SuisseIntl-Bold", size: 22))
                    .multilineTextAlignment(.center)
                    .foregroundColor(Color.white)
                    .padding(.bottom, 5)
                
                Text(self.viewModel.message)
                    .font(.custom("SuisseIntl-Regular", size: 16))
                    .foregroundColor(Color.white.opacity(0.8))
                    .padding(.horizontal, 30)
                    .multilineTextAlignment(.center)
                    .padding(.bottom, 22)
              
                if self.viewModel.buttonText != nil {
                    Button(self.viewModel.buttonText!) {
                        self.viewModel.dismissAction()
                    }
                    .font(.custom("SuisseIntl-Regular", size: 17))
                    .accentColor(self.viewModel.isActionButtonDisabled ? .gray : Color.blue)
                    .disabled(self.viewModel.isActionButtonDisabled)
                    
                }
            }
            .padding(.bottom, 60)
            .padding(.top, 50)
            .background(Color.gray.cornerRadius(20))
            .padding(.horizontal, 32)
            .animation(.easeInOut)
        }
    }
}


