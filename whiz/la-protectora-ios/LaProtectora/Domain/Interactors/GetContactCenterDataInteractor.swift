//
//  GetContactCenterDataInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 9/1/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Resolver
import Combine

struct GetContactCenterDataInteractor: GetContactCenterDataUseCase {
    @Injected var repo: ContactCenterRepository
    
    func execute() -> AnyPublisher<ContactCenter, Error> {
        self.repo.getMain()
    }
}
