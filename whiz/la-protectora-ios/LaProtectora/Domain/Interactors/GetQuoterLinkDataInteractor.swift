//
//  GetQuoterLinkDataInteractor.swift
//  LaProtectora
//
//  Created by Serguei on 25/01/22.
//  Copyright © 2022 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetQuoterLinkDataInteractor: GetQuoterLinkDataUseCase {
    @Injected var repo: RestQuoterRepository
    
    func execute() -> AnyPublisher<[QuoterLinkData], Error> {
        return repo.getLinkData()
    }

}
