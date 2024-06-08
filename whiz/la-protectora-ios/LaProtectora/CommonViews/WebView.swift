//
//  WebView.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/6/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import SwiftUI
import WebKit

struct WebView: UIViewRepresentable {
    let url: URL
    var contentType: String? = nil
    
    func makeUIView(context: Context) -> WKWebView {
        return WKWebView()
    }
    
    func updateUIView(_ uiView: WKWebView, context: Context) {
        if let type = contentType, let data = try? Data(contentsOf: url) {
            uiView.load(data, mimeType: type, characterEncodingName: "", baseURL: url)
        } else {
            let urlRequest = URLRequest(url: url)
            uiView.load(urlRequest)
        }
    }
}

