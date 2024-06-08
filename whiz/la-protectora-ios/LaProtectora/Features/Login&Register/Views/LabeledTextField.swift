//
//  LabeledTextField.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 7/31/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI

struct LabeledTextField: View {
    var imageName: String
    var label: String
  
    @Binding var text: String
    
    var body: some View {
        VStack {
            HStack {
                Image(decorative: imageName)
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 33, alignment: .leading)
                
                TextField(label, text: self.$text)
                    .font(.system(size: 16, weight: .regular, design: .default))
                    .foregroundColor(Color(hex: "8B8B8B"))
            }
            
            Rectangle()
                .frame(height: 1)
                .foregroundColor(Color(hex: "7A7A7A"))
        }
    }
}

struct LabeledTextField_Previews: PreviewProvider {
    static var previews: some View {
        LabeledTextField(imageName: "mail_icon", label: "Email", text: .constant(""))
    }
}
