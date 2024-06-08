//
//  EmptyStateNotAllowed.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/19/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI

struct EmptyStateNotAllowed: View {
    var body: some View {
        ZStack {
            Color.white
            
            Text("""
                 Aún no eres cliente.
                 No hay información disponible.
                 """)
                .foregroundColor(.black)
                .font(.system(size: 16, weight: .medium, design: .default))
                .multilineTextAlignment(.center)
        }
    }
}

struct EmptyStateNotAllowed_Previews: PreviewProvider {
    static var previews: some View {
        EmptyStateNotAllowed()
    }
}
