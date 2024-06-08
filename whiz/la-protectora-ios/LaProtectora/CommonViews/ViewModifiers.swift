//
//  ViewModifiers.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/4/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI
import Combine
import Resolver

struct DeepRouter {
    var showsMenu = PassthroughSubject<Void, Never>()
    var showsNotification = PassthroughSubject<Void, Never>()
    var modalClosed = PassthroughSubject<Void, Never>()
    var showSinister = PassthroughSubject<SiniestroInfo, Never>()
}

struct LPTrailingNavigationButtons: View {
    @Injected private var router: DeepRouter
    
    var initials: String
        
    var body: some View {
        HStack {
//            Image(decorative: "bell_icom")
//                .onTapGesture {
//                    self.router.showsNotification.send(())
//            }
            
            Circle()
                .foregroundColor(.clear)
                .background(LinearGradient(gradient: Gradient(colors: [Color(hex: "A80D13"), Color(hex: "ED3643")]), startPoint: .bottom, endPoint: .top).clipShape(Circle()))
                .shadow(color: Color(hex: "484848").opacity(0.20), radius: 5, x: 0, y: 3)
                .overlay(Circle().stroke(Color.white, lineWidth: 1))
                .overlay(Text(initials).font(.system(size: 12, weight: .bold, design: .default)).foregroundColor(.white))
                .frame(width: 26, height: 26)
                .onTapGesture {
                    self.router.showsMenu.send(())
            }
        }
    }
}
