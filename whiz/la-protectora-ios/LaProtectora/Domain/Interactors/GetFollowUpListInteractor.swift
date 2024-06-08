//
//  GetFollowUpListInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/26/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetFollowUpListInteractor: GetFollowUpListUseCase {
   @Injected var repo: FollowUpRepository
    
    func execute(for siniestroId: SiniestroId) -> AnyPublisher<[FollowUp], Error> {
        self.repo.getFollowUpList(for: siniestroId)
    }
}
