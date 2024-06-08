//
//  GetExecutivesRiskGroupInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 9/1/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Resolver
import Combine


struct GetExecutivesRiskGroupInteractor: GetExecutivesRiskGroupUseCase {
    @Injected var repo: RiskGroupRepository
    
    func execute(for userId: UserID) -> AnyPublisher<[RiskGroup], Error> {
        repo.getExecutivesRiskGroups(for: userId)
    }
    
}
