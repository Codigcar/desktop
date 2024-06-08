//
//  GetLinkDataInteractor.swift
//  LaProtectora
//
//  Created by Serguei on 24/01/22.
//  Copyright © 2022 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetLinkDataInteractor: GetLinkDataUseCase {
    @Injected var repo: RestPronostikRepository
    
    func execute() -> AnyPublisher<[LinkData], Error> {
        return repo.getLinkData()
    }

}
