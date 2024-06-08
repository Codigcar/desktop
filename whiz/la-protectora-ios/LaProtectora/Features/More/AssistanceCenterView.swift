//
//  AssistanceCenterView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/12/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI
import Combine
import Resolver

class AssistanceCenterViewModel: ObservableObject {
    
    @Published var center: ContactCenter?
    
    private var subscriptions = Set<AnyCancellable>()
    
    @Injected var interactor: GetContactCenterDataUseCase
    
    func getContactCenter() {
        self.interactor.execute().sink(receiveCompletion: { (completion) in
            print("\(AssistanceCenterViewModel.self) \(#function) completion: \(completion)")
        }) { [weak self] (center) in
            self?.center = center
        }
        .store(in: &self.subscriptions)
    }
    
    func call(number: String?) {
        if let phone = number, phone.count >= 3, let url = URL(string: "tel://\(phone)") {
            UIApplication.shared.open(url, options: [:], completionHandler: nil)
        }

    }
}

struct AssistanceCenterView: View {
    @ObservedObject var model: AssistanceCenterViewModel
    
    var cellphone: String {
        if self.model.center?.cellphone != nil {
            return "+51 " + self.model.center!.cellphone
        }
        return "Cargando..."
    }
    
    var phone: String {
        if self.model.center?.phone != nil {
            return "+01 " + self.model.center!.phone
        }
        return "Cargando..."
    }
    
    func cell(text: String, imageName: String) -> some View {
        HStack {
            Text(text)
                .font(.system(size: 14))
            
            Spacer()
            
            Image(decorative: imageName)
                .scaleEffect(2.0)
                .background(Circle().stroke(Color.gray.opacity(0.4), lineWidth: 1.4).frame(width: 30, height: 30))

        }
        .padding(.horizontal, 20)
        .padding(.vertical, 20)
        .background(Color.white.cornerRadius(8).shadow(color: Color.black.opacity(0.20), radius: 4, x: 0, y: 2))
        .padding(.horizontal, 10)
    }
    
    var body: some View {
        ZStack(alignment: .top) {
            Color.white.edgesIgnoringSafeArea(.all)
            VStack() {
                HeaderView(title: "Central de Asistencia")
                
                ScrollView {
                    VStack(spacing: 20) {
                        Image(decorative: "contact_center")
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                            .frame(height: 120)
                            .padding(.horizontal, 20)
                            .overlay(
                                Text("Atención 24/7")
                                    .font(.custom(Font.Signika.semibold.rawValue, size: 18))
                                    .foregroundColor(.white)
                                    .shadow(radius: 20)
                                    .padding(.leading, 40)
                                    .padding(.bottom, 30)
                                , alignment: .bottomLeading)
                            .padding(.vertical, 30)
                        
                        
                        cell(text: self.cellphone, imageName: "small_phone")
                            .onTapGesture {
                                if self.model.center?.cellphone != nil {
                                    self.model.call(number: self.model.center?.cellphone)
                                }
                        }
                        
                        cell(text: self.phone, imageName: "small_home_phone")
                            .onTapGesture {
                                if self.model.center?.phone != nil {
                                    self.model.call(number: "01" + self.model.center!.phone)
                                }
                        }
                        cell(text: self.model.center?.email ?? "Cargando...", imageName: "small_email")
                        
                        Text("Estamos aquí para ayudarte")
                            .font(.custom(Font.Signika.regular.rawValue, size: 17))
                            .foregroundColor(.black)
                            .padding(.top, 40)
                    }
                }
            }
        }
        .navigationBarTitle("Contacto", displayMode: .inline)
        .onAppear {
            self.model.getContactCenter()
        }
    }
}

struct AssistanceCenterView_Previews: PreviewProvider {
    static let model: AssistanceCenterViewModel = {
        let m = AssistanceCenterViewModel()
        m.center = ContactCenter(phone: "0145684567", cellphone: "988567834", email: "callcenter@laprotectora.pe", moto: "Estamos aquí para ayuadrte")
        return m
    }()
    static var previews: some View {
        AssistanceCenterView(model: model)
    }
}
