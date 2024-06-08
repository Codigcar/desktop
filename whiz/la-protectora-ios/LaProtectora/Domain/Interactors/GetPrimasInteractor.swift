//
//  GetPrimasInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/24/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetPrimasInteractor: GetPrimasUseCase {
    @Injected var repo: PrimaRepository
    
    func execute(polizaId: PolizaId) -> AnyPublisher<[Prima], Error> {
        self.repo.getPrimas(for: polizaId)
    }
}
