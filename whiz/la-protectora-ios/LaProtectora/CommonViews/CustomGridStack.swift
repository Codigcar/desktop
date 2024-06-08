//
//  GridStack.swift
//  Campus
//
//  Created by Rolando Rodriguez on 2/6/20.
//  Copyright © 2020 Rolando Rodriguez. All rights reserved.
//

import Foundation
import SwiftUI

struct CustomGridStack<Content: View>: View {
    let columns: Int
    let content: (Int, CGFloat) -> Content
    let horizontalSpacing: CGFloat
    let verticalSpacing: CGFloat
    let numberOfItems: Int
    
    func columnWidth(_ width: CGFloat) -> CGFloat {
        let w = width/CGFloat(self.columns) - (self.horizontalSpacing / CGFloat(self.columns))
        return w
    }
    
    public var body : some View {
        // A GeometryReader is required to size items in the scroll view
        GeometryReader { geometry in
            // VStacks are our rows
            ScrollView(.vertical, showsIndicators: false) {
                VStack(alignment: .leading, spacing: self.verticalSpacing) {
                    ForEach(0 ..< (self.numberOfItems / self.columns), id: \.self) { row in
                        // HStacks are our columns
                        HStack(spacing: self.horizontalSpacing) {
                            ForEach(0 ... (self.columns - 1), id: \.self) { column in
                                self.content((row * self.columns) + column, self.columnWidth(geometry.size.width))
                            }
                        }
                        .frame(width: geometry.size.width)
                    }
                    
                    // Last row
                    // HStacks are our columns
                    HStack(spacing: self.horizontalSpacing) {
                        ForEach(0 ..< (self.numberOfItems % self.columns), id: \.self) { column in
                            self.content(((self.numberOfItems / self.columns) * self.columns) + column, self.columnWidth(geometry.size.width))
                        }
                        
                        Spacer()
                        
                    }
                    .frame(width: geometry.size.width)
                }
            }
        }
    }
    
    init(numberOfItems: Int, columns: Int, horizontalSpacing: CGFloat, verticalSpacing: CGFloat, @ViewBuilder content: @escaping (Int, CGFloat) -> Content) {
        self.columns = columns
        self.verticalSpacing = verticalSpacing
        self.horizontalSpacing = horizontalSpacing
        self.content = content
        self.numberOfItems = numberOfItems
    }
}
