//
//  GetInsuredInfoListInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetInsuredInfoListInteractor: GetInsuredInfoListUseCase {
    @Injected var repo: InsuredInfoRepository
    
    func execute(with polizaId: PolizaId) -> AnyPublisher<[InsuredInfo], Error> {
        self.repo.getInsuredInfoList(for: polizaId)
    }
}
