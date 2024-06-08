//
//  GetVehicleInfoListInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetVehicleInfoListInteractor: GetVehicleInfoListUseCase {
    @Injected var repo: VehicleInfoRepository
    
    func execute(with polizaId: PolizaId) -> AnyPublisher<[VehicleInfo], Error> {
        self.repo.getVehicleInfoList(for: polizaId)
    }
}
