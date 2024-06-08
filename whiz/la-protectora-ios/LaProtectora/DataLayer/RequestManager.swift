//
//  RequestManager.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/17/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

typealias Phone = String
typealias VerificationCode = String

class RequestManager {
    private let client = NetworkAPIClient()

    func login(id: String, pass: String) -> AnyPublisher<User, Error> {
        let builder = ApiRequest.Builder()
        let deviceToken = (UserDefaults.standard.value(forKey: "deviceToken") as? String) ?? ""

        let data = ["ws_user": "laprotectora","ws_password": "wspr0t3ct0ra","LOCAL_NRO_DOCUMENTO": id,"LOCAL_PASS": pass, "LOCAL_DEVICE_TOKEN": deviceToken, "LOCAL_DEVICE_TYPE": "ios"]
        builder.withPath("/api/mobile").withResource("/login/dni").withEndPoint("/pass").withBodyParams(data).withType(.post)
        let request = builder.build()
        return client.call(request: request)
            .map { UserMapper(dictionary: $0[0]).execute() }
            .eraseToAnyPublisher()
    }
    
    func logout(id: String) -> AnyPublisher<[[String: Any]], Error> {
        let builder = ApiRequest.Builder()
        let deviceToken = (UserDefaults.standard.value(forKey: "deviceToken") as? String) ?? ""
        let data = ["LOCAL_NRO_DOCUMENTO": id,
                    "LOCAL_DEVICE_TOKEN": deviceToken,
                    "LOCAL_DEVICE_TYPE": "ios"]
        
        builder.withPath("/api").withResource("/oauth").withEndPoint("/logout").withType(.post).withBodyParams(data)
        let request = builder.build()
        return client.call(request: request)
    }
    
    func refresh(accessToken: Token, refreshToken: Token) -> AnyPublisher<Void, Error> {
        let builder = ApiRequest.Builder()
        let data = ["access_token": accessToken.val, "refresh_token": refreshToken.val]
        builder.withPath("/api").withResource("/oauth").withEndPoint("/refresh").withType(.post).withBodyParams(data)
        let request = builder.build()
        return client.call(request: request).map { _ in (())}.eraseToAnyPublisher()
    }
    
    func verifyPhoneNumber(_ number: String) -> AnyPublisher<Void, Error> {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/").withResource("phone/").withEndPoint("verify").withQueryParams(["phone": number]).withType(.get)
        let request = builder.build()
        return client.call(request: request).map { _ in return () }.eraseToAnyPublisher()
    }
    
    func sendVerificationCode(for phone: Phone, with code: VerificationCode) -> AnyPublisher<Void, Error> {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/").withResource("phone/").withEndPoint("code").withBodyParams(["phone": phone, "code": code]).withType(.post)
        let request = builder.build()
        return client.call(request: request).map { _ in return () }.eraseToAnyPublisher()
    }
    
    func signUp(with base: User.Shortened) -> AnyPublisher<User, Error> {
        let data = ["LOCAL_NRO_DOCUMENTO": base.id,
                    "LOCAL_NOMBRE": base.name,
                    "LOCAL_APELLIDOS": base.lastName,
                    "LOCAL_TELEFONO": base.phone,
                    "LOCAL_EMAIL": base.email,
                    "LOCAL_PASS": base.password]
        let builder = ApiRequest.Builder()
        builder.withPath("/api/").withResource("mobile/").withEndPoint("registro").withBodyParams(data).withType(.post)
        let request = builder.build()
        return client.call(request: request).flatMap { (_) -> AnyPublisher<User, Error> in
            self.login(id: base.id, pass: base.password)
        }
        .eraseToAnyPublisher()
    }
    
    func recoverPassword(for email: String) -> AnyPublisher<Void, Error> {
        let data = ["par_login_mail": email]
        let builder = ApiRequest.Builder()
        builder.withPath("/api/").withResource("iosandroid/").withEndPoint("recover_password").withBodyParams(data).withType(.post)
        let request = builder.build()
        return client.call(request: request).map { _ in () }.eraseToAnyPublisher()
    }
    
    func updateUser(with payload: [String: Any]) -> AnyPublisher<Void, Error>  {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("actualiza/datos/").withEndPoint("id_cliente").withBodyParams(payload).withType(.post)
        let request = builder.build()
        return client.call(request: request).map { _ in () }.eraseToAnyPublisher()
    }
    
    func updatePassword(documentNumber: String, currentPassword: String, newPassword: String) -> AnyPublisher<Void, Error> {
        let data = ["LOCAL_NRO_DOCUMENTO": documentNumber, "LOCAL_NUEVO_PASS": newPassword, "LOCAL_ANTERIOR_PASS": currentPassword]
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("actualiza/").withEndPoint("pass").withBodyParams(data).withType(.post)
        let request = builder.build()
        return client.call(request: request).map { _ in () }.eraseToAnyPublisher()
    }
}

extension User {
    struct Shortened {
        var id: String, name: String, lastName: String, phone: String, email: String, password: String
    }
}
