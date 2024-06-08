//
//  GetSinisterExecutivesListInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 9/1/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetSinisterExecutivesListInteractor: GetSinisterExecutivesListUseCase {
    @Injected var repo: ExecutiveRepository
    
    func execute(for userId: UserID) -> AnyPublisher<[Executive], Error> {
        self.repo.getSinisterExecutives(for: userId)
    }
}
