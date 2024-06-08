//
//  InputAccesoryView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 9/14/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI

struct InputAccessory: UIViewRepresentable  {
    @Binding var text: String

    func makeUIView(context: Context) -> UITextField {

        let customView = UIView(frame: CGRect(x: 0, y: 0, width: 10, height: 44))
        customView.backgroundColor = UIColor.white
        let button = UIButton(type: .system)
        button.setTitle("Cerrar", for: .normal)
        button.tintColor = .red
        button.addTarget(context.coordinator, action: #selector(Coordinator.endEditing), for: .touchUpInside)
        customView.addSubview(button)
        button.translatesAutoresizingMaskIntoConstraints = false
        button.trailingAnchor.constraint(equalTo: customView.trailingAnchor, constant: -14).isActive = true
        button.centerYAnchor.constraint(equalTo: customView.centerYAnchor).isActive = true
        
        let sampleTextField =  UITextField(frame: CGRect(x: 0, y: 0, width: 300, height: 40))
        
        sampleTextField.autocapitalizationType = .none
        sampleTextField.autocorrectionType = .no
        sampleTextField.clipsToBounds = true
        sampleTextField.inputAccessoryView = customView
        sampleTextField.typingAttributes = [NSAttributedString.Key.font: UIFont.systemFont(ofSize: 16), NSAttributedString.Key.foregroundColor: UIColor.black]
        sampleTextField.placeholder = "Buscar"
        sampleTextField.addTarget(context.coordinator, action: #selector(Coordinator.textFieldDidChange(_:)), for: .editingChanged)

        return sampleTextField
    }
    func updateUIView(_ uiView: UITextField, context: Context) {
        uiView.text = self.text
    }
    
    func makeCoordinator() -> Coordinator {
        Coordinator($text)
    }
    
    class Coordinator: NSObject {
        var text: Binding<String>
        
        init(_ text: Binding<String>) {
            self.text = text
        }
        
        @objc func textFieldDidChange(_ textField: UITextField) {
            self.text.wrappedValue = textField.text ?? ""
        }
        
        @objc func endEditing() {
            self.text.wrappedValue = ""
            UIApplication.shared.sendAction(#selector(UIResponder.resignFirstResponder), to: nil, from: nil, for: nil)
        }
    }
}
