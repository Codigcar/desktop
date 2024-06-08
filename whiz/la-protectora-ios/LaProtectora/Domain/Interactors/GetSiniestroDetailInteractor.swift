//
//  GetSiniestroDetailInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/26/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetSiniestroDetailInteractor: GetSiniestroDetailUseCase {
   @Injected var repo: SiniestroRepository
    
    func execute(for siniestroId: SiniestroId) -> AnyPublisher<Siniestro, Error> {
        self.repo.getSiniestro(with: siniestroId)
    }
}
