//
//  RegisterSinisterInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/28/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import CoreLocation
import Combine
import Resolver

class RegisterSinisterInteractor: NSObject, RegisterSinisterUseCase {
    enum LocationError: Error {
        case notAllowed
        case couldNotRegisterSinister
    }
    
    
    @Injected var repo: SinisterRegistrationRepository
    
    private let manager = CLLocationManager()
    
    private let subject = PassthroughSubject<SinisterRegistration, Error>()

    private var clientId = ""
    
    private var sinistertTypeId = ""
    
    private var vehiclePlate = ""
    
    private var shouldPublish = false
    
    private var cancellable: AnyCancellable?
    
    override init() {
        super.init()
        
        self.manager.delegate = self
        
        self.manager.requestWhenInUseAuthorization()

    }
    
    deinit {
        cancellable?.cancel()
    }
    
    var start: CFAbsoluteTime!

    
    private func setup(with clientId: UserID, sinisterTypeId: String, vehiclePlate: String) {
        self.clientId = clientId
        
        self.sinistertTypeId = sinisterTypeId
        
        self.vehiclePlate = vehiclePlate
    }
    
    func execute(clientId: UserID, sinisterTypeId: String, vehiclePlate: String) -> AnyPublisher<SinisterRegistration.Result, Error> {
        self.setup(with: clientId, sinisterTypeId: sinisterTypeId, vehiclePlate: vehiclePlate)
     
        if shouldPublish {
            
            self.manager.desiredAccuracy = kCLLocationAccuracyHundredMeters
            
            //            MARK: Benchmarking started, location requested
            start = CFAbsoluteTimeGetCurrent()
            
            self.manager.requestLocation()
        }
        
        return self.subject.flatMap { (registration) -> AnyPublisher<[String: Any], Error> in
            self.repo.create(registration: registration)
        }
        .tryMap({ (data) -> SinisterRegistration.Result in
            guard let innerData = data["be_user_login"] as? [String: Any], let result = SinisterRegistration.Result(dictionary: innerData) else { throw LocationError.couldNotRegisterSinister }
            return result
        })
        .eraseToAnyPublisher()
    }
}

extension RegisterSinisterInteractor: CLLocationManagerDelegate {
    
    func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
        if status != .denied && status != .restricted {
            if status != .notDetermined {
                self.shouldPublish = true
            }
        } else {
            self.subject.send(completion: .failure(LocationError.notAllowed))
        }
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let location = locations.first else { return }
        let registration = SinisterRegistration(clientId: self.clientId, location: Location(latitud: location.coordinate.latitude, longitude: location.coordinate.longitude), id: self.sinistertTypeId, plate: self.vehiclePlate)
        
//        MARK: Benchmarking finished, location receivedrr
        let diff = CFAbsoluteTimeGetCurrent() - start
        print("Location gathering with requested accuracy took: ", diff, "seconds")
        
        self.subject.send(registration)
    }
    
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        self.subject.send(completion: .failure(error))
    }
}

extension SinisterRegistration {
    struct Result: Codable {
        let transaction_code: Int, transaction_message: String, registry_id: Int
    }
}
