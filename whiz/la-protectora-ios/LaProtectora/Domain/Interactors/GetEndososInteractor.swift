//
//  GetEndososInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/21/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetEndososInteractor: GetEndososForInsuranceUseCase {
    @Injected var repo: EndososRepository
    
    func execute(polizaId: String) -> AnyPublisher<[Endoso], Error> {
        repo.getEndosos(for: polizaId).receive(on: RunLoop.main).eraseToAnyPublisher()
    }
}
