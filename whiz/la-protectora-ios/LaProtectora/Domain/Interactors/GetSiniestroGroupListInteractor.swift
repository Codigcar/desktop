//
//  GetSiniestroGroupListInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetSiniestroGroupListInteractor: GetSiniestroGroupListUseCase {
    @Injected var repo: SiniestroGroupRepository
    
    func execute(for user: UserID) -> AnyPublisher<[SiniestroGroup], Error> {
        self.repo.getSiniestrGroupList(for: user)
    }
}
