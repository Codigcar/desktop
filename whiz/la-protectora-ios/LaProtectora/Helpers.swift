//
//  Helpers.swift
//  La Protectora
//
//  Created by Rolando Rodriguez on 7/31/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import SwiftUI
import Combine
import Resolver

extension Color {
    init(hex: String) {
        let scanner = Scanner(string: hex)
        var rgbValue: UInt64 = 0
        scanner.scanHexInt64(&rgbValue)
        
        let r = (rgbValue & 0xff0000) >> 16
        let g = (rgbValue & 0xff00) >> 8
        let b = rgbValue & 0xff
        
        self.init(.displayP3, red: Double(r) / 0xff, green: Double(g) / 0xff, blue: Double(b) / 0xff, opacity: 1)        
    }
}

extension UIApplication {
    @objc
    func endEditing() {
        sendAction(#selector(UIResponder.resignFirstResponder), to: nil, from: nil, for: nil)
    }
}


struct CustomTrailingButtonsNavigationBar: ViewModifier {
    @State private var initials = ""
    @Injected private var auth: AuthManager
    
    var withLogo: Bool
    
    var initialsPublisher: AnyPublisher<String, Never> {
        guard let first = self.auth.currentUser?.firstName.first, let second = self.auth.currentUser?.middleName.first else { return Just("").eraseToAnyPublisher() }
        return Just(String(first) + String(second)).eraseToAnyPublisher()
    }
    
    func body(content: Content) -> some View {
        Group {
            if self.withLogo {
                content
                    .navigationBarItems(leading: Image(decorative: "logo_small"), trailing: LPTrailingNavigationButtons(initials: self.initials))
            } else {
                content
                .navigationBarItems(trailing: LPTrailingNavigationButtons(initials: self.initials))
            }
        }
        .onReceive(self.initialsPublisher) {
            self.initials = $0
        }
    }
}

extension View {
    func LPNavigationBar(showsLogo: Bool) -> some View {
           ModifiedContent(content: self, modifier: CustomTrailingButtonsNavigationBar(withLogo: showsLogo))
       }
}

struct KeyboardAwareModifier: ViewModifier {
    @State private var keyboardHeight: CGFloat = 0

    private var keyboardHeightPublisher: AnyPublisher<CGFloat, Never> {
        Publishers.Merge(
            NotificationCenter.default
                .publisher(for: UIResponder.keyboardWillShowNotification)
                .compactMap { $0.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue }
                .map { $0.cgRectValue.height },
            NotificationCenter.default
                .publisher(for: UIResponder.keyboardWillHideNotification)
                .map { _ in CGFloat(0) }
        ).eraseToAnyPublisher()
    }
    
    func body(content: Content) -> some View {
        Group {
            if #available(iOS 14.0, *) {
                content
            } else {
                content
                    .padding(.bottom, keyboardHeight)
                    .onReceive(keyboardHeightPublisher) { self.keyboardHeight = $0 }
            }
        }
    }
}

extension View {
    func keyboardPadding() -> some View {
        ModifiedContent(content: self, modifier: KeyboardAwareModifier())
    }
}


struct ColoredToggleStyle: ToggleStyle {
    var label = ""
    var secondLabel = ""
    var onColor = Color(UIColor.green)
    var offColor = Color(UIColor.systemGray5)
    var thumbColor = Color.white
    
    func makeBody(configuration: Self.Configuration) -> some View {
        HStack {
            VStack(alignment: .leading) {
                Text(label)
                    .foregroundColor(Color.gray.opacity(0.80))
                    .font(.system(size: 12, weight: .medium, design: .default))
                
                Text(secondLabel)
                    .foregroundColor(Color.black.opacity(0.75))
                    .font(.system(size: 12, weight: .bold, design: .default))
            }

            Spacer()

            Button(action: { configuration.isOn.toggle() } )
            {
                RoundedRectangle(cornerRadius: 16, style: .circular)
                    .fill(configuration.isOn ? onColor : offColor)
                    .frame(width: 50, height: 29)
                    .overlay(
                        Circle()
                            .fill(thumbColor)
                            .shadow(radius: 1, x: 0, y: 1)
                            .padding(1.5)
                            .offset(x: configuration.isOn ? 10 : -10))
                    .animation(Animation.easeInOut(duration: 0.1))
            }

        }
    }
}

struct RoundedCorners: Shape {
    var tl: CGFloat = 0.0
    var tr: CGFloat = 0.0
    var bl: CGFloat = 0.0
    var br: CGFloat = 0.0

    func path(in rect: CGRect) -> Path {
        var path = Path()

        let w = rect.size.width
        let h = rect.size.height

        // Make sure we do not exceed the size of the rectangle
        let tr = min(min(self.tr, h/2), w/2)
        let tl = min(min(self.tl, h/2), w/2)
        let bl = min(min(self.bl, h/2), w/2)
        let br = min(min(self.br, h/2), w/2)

        path.move(to: CGPoint(x: w / 2.0, y: 0))
        path.addLine(to: CGPoint(x: w - tr, y: 0))
        path.addArc(center: CGPoint(x: w - tr, y: tr), radius: tr,
                    startAngle: Angle(degrees: -90), endAngle: Angle(degrees: 0), clockwise: false)

        path.addLine(to: CGPoint(x: w, y: h - br))
        path.addArc(center: CGPoint(x: w - br, y: h - br), radius: br,
                    startAngle: Angle(degrees: 0), endAngle: Angle(degrees: 90), clockwise: false)

        path.addLine(to: CGPoint(x: bl, y: h))
        path.addArc(center: CGPoint(x: bl, y: h - bl), radius: bl,
                    startAngle: Angle(degrees: 90), endAngle: Angle(degrees: 180), clockwise: false)

        path.addLine(to: CGPoint(x: 0, y: tl))
        path.addArc(center: CGPoint(x: tl, y: tl), radius: tl,
                    startAngle: Angle(degrees: 180), endAngle: Angle(degrees: 270), clockwise: false)

        return path
    }
}

extension Publisher {
    public func then<T, P>(maxPublishers: Subscribers.Demand = .unlimited, _ transform: @escaping (Self.Output) -> P) ->
    AnyPublisher<T, Self.Failure> where T == P.Output, P : Publisher, Self.Failure == P.Failure {
        self.flatMap(maxPublishers: maxPublishers, transform)
            .eraseToAnyPublisher()
    }
}
