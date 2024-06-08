//
//  GetQuoterLinkDataUseCase.swift
//  LaProtectora
//
//  Created by Serguei on 25/01/22.
//  Copyright © 2022 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol GetQuoterLinkDataUseCase {
    var repo: RestQuoterRepository { get set }

    func execute() -> AnyPublisher<[QuoterLinkData], Error>
}
