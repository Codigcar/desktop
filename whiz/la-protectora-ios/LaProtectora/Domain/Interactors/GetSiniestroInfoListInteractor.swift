//
//  GetSiniestroInfoListInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/24/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetSiniestroInfoListInteractor: GetSiniestroInfoListUseCase {
    @Injected var repo: SiniestroInfoRepository
    
    func execute(with polizaId: PolizaId) -> AnyPublisher<[SiniestroInfo], Error> {
        repo.getSiniestroInfoList(for: polizaId)
    }
}
