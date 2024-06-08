//
//  GetAccountExecutiveListInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 9/1/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Resolver
import Combine

struct GetAccountExecutiveListInteractor: GetAccountExecutivesListUseCase {
    @Injected var repo: ExecutiveRepository
    
    func execute(for riskGroupId: String, userId: UserID, businessUnitId: String) -> AnyPublisher<[Executive], Error> {
        self.repo.getAccountExecutives(for: riskGroupId, userId: userId, businessUnitId: businessUnitId)
    }
}
