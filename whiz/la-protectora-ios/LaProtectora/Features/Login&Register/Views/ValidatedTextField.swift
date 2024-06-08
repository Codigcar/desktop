//
//  ValidatedTextField.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 7/31/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI

struct ValidatedTextField: View {
    var label: String
    @Binding var text: String
    @Binding var isValid: Bool
    
    
    var body: some View {
       VStack {
            HStack {
                TextField(label, text: self.$text)
                    .font(.system(size: 16, weight: .regular, design: .default))
                    .foregroundColor(Color(hex: "8B8B8B"))
                
                Image(systemName: "checkmark")
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 33, alignment: .leading)
                    .font(.system(size: 16, weight: .regular, design: .default))
                    .foregroundColor(self.isValid ? Color(hex: "D51C23") : Color(hex: "8B8B8B"))
        }
            
            Rectangle()
                .frame(height: 1)
                .foregroundColor(Color(hex: "7A7A7A"))
        }

    }
}

struct ValidatedTextField_Previews: PreviewProvider {
    static var previews: some View {
        ValidatedTextField(label: "Char", text: .constant(""), isValid: .constant(true))
    }
}
