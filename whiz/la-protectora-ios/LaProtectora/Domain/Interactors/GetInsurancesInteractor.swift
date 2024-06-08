//
//  GetInsurancesInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/20/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Resolver
import Combine

struct GetInsurancesInteractor: GetInsurancesUseCase {
    @Injected var repo: InsuranceRepository
    
    func execute(for userId: UserID, with riskGroupId: RiskGroupId) -> AnyPublisher<[Insurance], Error> {
        repo.getInsurances(for: userId, with: riskGroupId)
    }
}
