//
//  GetContactCenterDataUseCase.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 9/1/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol GetContactCenterDataUseCase {
    var repo: ContactCenterRepository { get set }
    
    func execute() -> AnyPublisher<ContactCenter, Error>
}


