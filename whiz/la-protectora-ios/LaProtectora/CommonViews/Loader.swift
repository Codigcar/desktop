
//
//  Loader().swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/17/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI

struct Loader: View {
    var body: some View {
        ZStack {
            Color.black.opacity(0.3).edgesIgnoringSafeArea(.all)
            
            ActivityIndicator(isAnimating: .constant(true), style: .medium)
        }
    }
}

struct WhiteLoader: View {
    var body: some View {
        ZStack {
            Color.white
            ActivityIndicator(isAnimating: .constant(true), style: .medium)
        }
    }
}

struct Loader_Previews: PreviewProvider {
    static var previews: some View {
        Loader()
    }
}
