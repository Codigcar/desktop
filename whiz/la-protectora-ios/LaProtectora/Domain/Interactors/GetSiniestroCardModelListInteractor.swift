//
//  GetSiniestroCardModelListInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetSiniestroCardModelListInteractor: GetSiniestroCardModelListUseCase {
   @Injected var repo: SiniestroCardModelRepository
    
    func execute(with userId: UserID, groupId: Int) -> AnyPublisher<[SiniestroCardModel], Error> {
        self.repo.getSiniestroCardModelList(for: userId, groupId: groupId)
    }
}
