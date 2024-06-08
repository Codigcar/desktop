//
//  GetSiniestroCardModelListUseCase.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine 

protocol GetSiniestroCardModelListUseCase {
    var repo: SiniestroCardModelRepository { get set }
    
    func execute(with userId: UserID, groupId: Int) -> AnyPublisher<[SiniestroCardModel], Error>
}
