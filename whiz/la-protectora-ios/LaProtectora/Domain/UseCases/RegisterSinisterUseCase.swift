//
//  RegisterSinisterUseCase.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/28/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol RegisterSinisterUseCase {
    var repo: SinisterRegistrationRepository { get set }
    
    func execute(clientId: UserID, sinisterTypeId: String, vehiclePlate: String) -> AnyPublisher<SinisterRegistration.Result, Error>
}
