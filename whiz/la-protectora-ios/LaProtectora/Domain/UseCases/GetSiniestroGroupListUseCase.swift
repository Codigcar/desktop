//
//  GetSiniestroGroupUseCase.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol GetSiniestroGroupListUseCase {
    var repo: SiniestroGroupRepository { get set }
    
    func execute(for user: UserID) -> AnyPublisher<[SiniestroGroup], Error>
}
