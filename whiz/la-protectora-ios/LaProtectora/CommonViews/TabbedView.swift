//
//  PagerView.swift
//  Campus
//
//  Created by Rolando Rodriguez on 1/27/20.
//  Copyright © 2020 Rolando Rodriguez. All rights reserved.
//

import Foundation
import SwiftUI

struct TabbedView<Content: View>: View {
    let content: (Int) -> Content
    let numberOfElements: Int
    var backgroundColor: Color
    var alignment: Alignment
    
    @Binding var currentIndex: Int

    init(_ count: Int, alignment: Alignment = .center, currentIndex: Binding<Int>, backgroundColor: Color, @ViewBuilder content: @escaping (Int) -> Content) {
        self.backgroundColor = backgroundColor
        self.alignment = alignment
        self._currentIndex = currentIndex
        self.numberOfElements = count
        self.content = content
    }
    
    var body: some View {
//        GeometryReader { geometry in
            HStack(spacing: 0) {
                ForEach(0..<self.numberOfElements, id: \.self) { index in
                    self.content(index)
                        .frame(width:  UIScreen.main.bounds.width)
                }
            }
            .frame(width: UIScreen.main.bounds.width, alignment: .leading)
            .offset(x: -CGFloat(self.currentIndex) *  UIScreen.main.bounds.width)
//        }
    }
}

