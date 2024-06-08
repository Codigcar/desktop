//
//  TextView.swift
//  Campus
//
//  Created by Rolando Rodriguez on 11/7/19.
//  Copyright © 2019 Rolando Rodriguez. All rights reserved.
//

import SwiftUI

struct TextView: UIViewRepresentable {
    enum TextLenght {
        case unlimited
        case limited(Int)
    }
    @Binding var text: String
    
    var isFirstResponder: Bool = false
    var textLengh: TextLenght

    let aligment: NSTextAlignment = NSTextAlignment.left
    
    let textView: UITextView = {
        let textView = UITextView()
        textView.isScrollEnabled = true
        textView.backgroundColor = .clear
        textView.typingAttributes = [NSAttributedString.Key.foregroundColor: UIColor.white, NSAttributedString.Key.font: UIFont.systemFont(ofSize: 17), NSAttributedString.Key.kern: 0.42]
        textView.keyboardAppearance = .dark
        textView.keyboardDismissMode = .interactive
        return textView
    }()
    
    func makeCoordinator() -> TextView.Coordinator {
        Coordinator($text, textLenght: self.textLengh)
    }

    func makeUIView(context: Context) -> UITextView {
        self.textView.delegate = context.coordinator
        return self.textView
    }

    func updateUIView(_ uiView: UITextView, context: Context) {
        uiView.text = text
        if isFirstResponder && !context.coordinator.didBecomeFirstResponder  {
            uiView.becomeFirstResponder()
            context.coordinator.didBecomeFirstResponder = true
        }
    }
    
    class Coordinator : NSObject, UITextViewDelegate {
        @Binding var text: String
        var didBecomeFirstResponder = false
        var textLenght: TextLenght
        
        init(_ text: Binding<String>, textLenght: TextLenght) {
            _text = text
            self.textLenght = textLenght
        }
        
        func textViewDidChange(_ textView: UITextView) {
            if case .limited(let limit) = self.textLenght, textView.text.count <= limit {
                self.text = textView.text
            }
            else {
                textView.text = self.text
            }
        }
    }
}

struct TextView_Previews: PreviewProvider {
    static var previews: some View {
        TextView(text: .constant("Here you go!"), textLengh: .unlimited)
    }
}
