//
//  GetInsuredVehicleListInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/28/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetInsuredVehiclesListInteractor: GetInsuredVehiclesListUseCase {
    @Injected var repo: InsuredVehicleRepository
    
    func execute(for userId: UserID) -> AnyPublisher<[InsuredVehicle], Error> {
        self.repo.getInsuredVehicles(for: userId)
    }
    
}
