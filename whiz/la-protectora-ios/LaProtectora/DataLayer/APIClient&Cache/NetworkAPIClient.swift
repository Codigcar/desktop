//
//  APIRequest.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/14/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Combine
import Foundation
import Resolver

struct ApiRequest {
    enum HTTPMethod: String {
        case options = "OPTIONS"
        case get     = "GET"
        case head    = "HEAD"
        case post    = "POST"
        case put     = "PUT"
        case patch   = "PATCH"
        case delete  = "DELETE"
        case trace   = "TRACE"
        case connect = "CONNECT"
    }
    
    struct Configuration {
        let webserviceUrl: String
        let accessToken: String
        
        init?() {
            if let path = Bundle.main.path(forResource: "Info", ofType: "plist") {
                let dictionary = NSDictionary(contentsOfFile: path)
                guard let baseUrl = dictionary?["SERVER_DOMAINNAME"] as? String, let accessToken = dictionary?["ACCESS_TOKEN"] as? String else { return nil }
                self.webserviceUrl = baseUrl
                self.accessToken = accessToken
            } else {
                return nil
            }
        }
    }

    
    var path: String = ""
    var version: String = ""
    var resource: String = ""
    var endPoint: String = ""
    var queryParams = [String: String]()
    var bodyParams = [String: Any]()
    var type: HTTPMethod = .get
    let configuration: Configuration
    
    private init() {
        guard let config = Configuration() else { fatalError("Missing xcconfig, cannot config APIClient with no server_domain or accesstoken") }
        self.configuration = config
    }
    
    private func url() -> URL? {
        var urlComponents = URLComponents()
        urlComponents.scheme = "https"
        urlComponents.host = configuration.webserviceUrl
        urlComponents.path = path + resource + endPoint
        if !queryParams.isEmpty {
            urlComponents.setQueryItems(with: queryParams)
        }
        return urlComponents.url
    }

    var contentType: String {
        "application/json"
    }
    
    class Builder {
        @Injected private var authTokenManager: AuthTokenManager
        private var request = ApiRequest()
        
        @discardableResult
        func withPath(_ path: String) -> ApiRequest.Builder {
            self.request.path = path
            return self
        }
        
        @discardableResult
        func withVersion(_ version: String) -> ApiRequest.Builder {
            self.request.version = version
            return self
        }
        
        @discardableResult
        func withResource(_ resource: String) -> ApiRequest.Builder {
            self.request.resource = resource
            return self
        }
        
        @discardableResult
        func withEndPoint(_ endPoint: String) -> ApiRequest.Builder {
            self.request.endPoint = endPoint
            return self
        }
        
        @discardableResult
        func withBodyParams(_ params: [String: Any]) -> ApiRequest.Builder {
            self.request.bodyParams = params
            return self
        }
        
        @discardableResult
        func withType(_ type: HTTPMethod) -> ApiRequest.Builder {
            self.request.type = type
            return self
        }
        
        @discardableResult
        func withQueryParams(_ params: [String: String]) -> ApiRequest.Builder {
            self.request.queryParams = params
            return self
        }
        
        func build() -> URLRequest {
            guard let url = self.request.url() else {fatalError("Invalid URL cannot parse into URLRequest")}
            var urlRequest = URLRequest(url: url)
            urlRequest.httpMethod = self.request.type.rawValue
            urlRequest.setValue(self.request.contentType, forHTTPHeaderField: "Content-Type")
            
            if let accessToken = authTokenManager.accessToken?.val {
                urlRequest.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
            }
            
            if !self.request.bodyParams.isEmpty {
                urlRequest.httpBody = try! JSONSerialization.data(withJSONObject: self.request.bodyParams, options: [])
            }
            return urlRequest
        }
    }
}

class NetworkAPIClient {
    @Injected private var authTokenManager: AuthTokenManager

    struct CallResult {
        var data: [String: Any]!
        var error: ClientError?
    }
    
    enum CallError: Error {
        case urlError(URLError)
        case networkingError(NetworkError)
        case decodingError(MappingError)
        case clientError(String)
    }
    
    enum NetworkError: Int, Error, LocalizedError {
        case invalidData = 0
        case noResponse = 1
        case Continue = 100
        case SwitchingProtocols = 101
        case Processing = 102
        
        case OK = 200
        case Created = 201
        case Accepted = 202
        case NonauthoritativeInformation = 203
        case NoContent = 204
        case ResetContent = 205
        case PartialContent = 206
        case MultiStatus = 207
        case AlreadyReported = 208
        case IMUsed = 226
        
        case MultipleChoices = 300
        case MovedPermanently = 301
        case Found = 302
        case SeeOther = 303
        case NotModified = 304
        case UseProxy = 305
        case TemporaryRedirect = 307
        case PermanentRedirect = 308
        
        case BadRequest = 400
        case Unauthorized = 401
        case PaymentRequired = 402
        case Forbidden = 403
        case NotFound = 404
        case MethodNotAllowed = 405
        case NotAcceptable = 406
        case ProxyAuthenticationRequired = 407
        case RequestTimeout = 408
        case Conflict = 409
        case Gone = 410
        case LengthRequired = 411
        case PreconditionFailed = 412
        case PayloadTooLarge = 413
        case RequestURITooLong = 414
        case UnsupportedMediaType = 415
        case RequestedRangeNotSatisfiable = 416
        case ExpectationFailed = 417
        case ImAteapot = 418
        case MisdirectedRequest = 421
        case UnprocessableEntity = 422
        case Locked = 423
        case FailedDependency = 424
        case UpgradeRequired = 426
        case PreconditionRequired = 428
        case TooManyRequests = 429
        case RequestHeaderFieldsTooLarge = 431
        case ConnectionClosedWithoutResponse = 444
        case UnavailableForLegalReasons = 451
        case ClientClosedRequest = 499
        
        case InternalServerError = 500
        case NotImplemented = 501
        case BadGateway = 502
        case ServiceUnavailable = 503
        case GatewayTimeout = 504
        case HTTPVersionNotSupported = 505
        case VariantAlsoNegotiates = 506
        case InsufficientStorage = 507
        case LoopDetected = 508
        case NotExtended = 510
        case NetworkAuthenticationRequired = 511
        case NetworkConnectTimeoutError = 599
    }
    
    enum ClientError: Error, LocalizedError {
        case requestFailed(message: String)
    }
    
    enum MappingError: Error, LocalizedError {
        case couldNotUnwrapData
    }
    
    func call(request: URLRequest) -> AnyPublisher<[[String: Any]], Error> {
        return URLSession(configuration: .default).dataTaskPublisher(for: request)
            .mapError({ (error) -> CallError in
                CallError.urlError(error)
            })
            .tryMap { [weak self] (data, response) in
                guard let response = response as? HTTPURLResponse else { throw CallError.networkingError(.noResponse) }
                print(response)
                if response.statusCode == 200 {
                    if  let responseDict = try? JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
                        var result: [[String: Any]]?
                        
                        print(responseDict)
                        print("-")
                        
                        if let dataArray = responseDict["data"] as? [[String: Any]], dataArray.count > 0 {
                            result = dataArray
                        }
                        
                        else if let dataMatrix = responseDict["data"] as? [[[String: Any]]], dataMatrix.count > 0 {
                            result = dataMatrix[0]
                        }
                        
                        else if let dataDic = responseDict["data"] as? [String: Any] {
                            result = [dataDic]
                        }
                        
                        else {
                            if let dataValue = responseDict["data"] as? String {
                                result = [["data" : dataValue]]
                            }
                        }
                        
                        if let accessToken = responseDict["access_token"] as? String, let refreshToken = responseDict["refresh_token"] as? String, let expire_time = responseDict["expire_time"] as? TimeInterval, let expire_time_rt = responseDict["expire_time_rt"] as? TimeInterval {
                            self?.authTokenManager.setActive(accessToken: Token(val: accessToken, expirationDate: Date(timeIntervalSince1970: expire_time)), refreshToken: Token(val: refreshToken, expirationDate: Date(timeIntervalSince1970: expire_time_rt)))
                        }
                        
                        if let status = responseDict["status"] as? Bool, let message = responseDict["message"] as? String, status == false {
                            throw ClientError.requestFailed(message: message)
                        }

                        if let r = result, r.count > 0, let output = r[0]["CodigoMensaje"] as? Int, let message = r[0]["RespuestaMensaje"] as? String, output == 0 {
                            throw ClientError.requestFailed(message: message)
                        }
                        
                        if let r = result, r.count > 0, let output = r[0]["salida"] as? Int, let message = r[0]["MSG"] as? String, output == 0 {
                            throw ClientError.requestFailed(message: message)
                        }
                        
                        if let r = result, r.count > 0, let output = r[0]["codigo"] as? Int, let message = r[0]["respuestaMsg"] as? String, output == 0 {
                            throw ClientError.requestFailed(message: message)
                        }
                        
                        if let r = result, r.count > 0, let message = r[0]["message"] as? String {
                            throw ClientError.requestFailed(message: message)
                        }
                        
                        if let r = result, r.count > 0, let _ = r[0]["sms"] as? String, let status = r[0]["status"] as? String, status == "pending" {
                            throw ClientError.requestFailed(message: "Código invalido")
                        }
                        
                        if let r = result, r.count > 0, let status = r[0]["status"] as? Bool, let message = r[0]["message"] as? String, status == false {
                            throw ClientError.requestFailed(message: message)
                        }
                                                
                        return result ?? [["":""]]
                    }
                    
                    throw CallError.decodingError(MappingError.couldNotUnwrapData)
                }
           
                throw CallError.networkingError(NetworkError(rawValue: response.statusCode) ?? NetworkError.noResponse)
        }
        .eraseToAnyPublisher()
    }
}

public extension Encodable {
    /// Returns a JSON dictionary, with choice of minimal information
    
    func dictionary() -> [String: Any]? {
        let encoder = JSONEncoder()
        guard let data = try? encoder.encode(self) else { return nil }
        do {
            guard let dictionary = try JSONSerialization.jsonObject(with: data, options: .allowFragments) as? [String:Any] else {return nil}
            return dictionary
        }
        catch (let error) { print(error.localizedDescription); return nil}
    }
}

public extension Decodable {
    /// Initialize from JSON Dictionary. Return nil on failure
    init?(dictionary value: [String:Any]){
        guard JSONSerialization.isValidJSONObject(value) else { print("Invalid JSON format"); return nil }
         do {
            let jsonData = try JSONSerialization.data(withJSONObject: value, options: [])
            let newValue = try JSONDecoder().decode(Self.self, from: jsonData)
            self = newValue
        } catch let error {
            print(error)
            return nil
        }
    }
}

extension URLComponents {
    mutating func setQueryItems(with parameters: [String: String]) {
        self.queryItems = parameters.map { URLQueryItem(name: $0.key, value: $0.value) }
    }
}
