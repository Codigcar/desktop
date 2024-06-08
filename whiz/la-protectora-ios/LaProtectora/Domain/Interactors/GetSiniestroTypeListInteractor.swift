//
//  GetSiniestroTypeListInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/28/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetSiniestroTypeListInteractor: GetSiniestroTypeListUseCase {
    @Injected var repo: SiniestroTypeRepository
    
    func execute() -> AnyPublisher<[SiniestroType], Error> {
        self.repo.getSiniestroTypeList()
    }
}
