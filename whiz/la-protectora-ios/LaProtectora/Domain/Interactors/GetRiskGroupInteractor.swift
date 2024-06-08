//
//  GetRiskGroupInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/20/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Resolver
import Combine

struct GetRiskGroupInteractor: GetRiskGroupUseCase {
    @Injected var repo: RiskGroupRepository
    
    func execute(for userId: UserID) -> AnyPublisher<[RiskGroup], Error> {
        repo.getRiskGroups(for: userId)
    }
}
