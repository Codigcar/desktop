//
//  GetAccountExecutivesListUseCase.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 9/1/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol GetAccountExecutivesListUseCase {
    var repo: ExecutiveRepository { get set }
    
    func execute(for riskGroupId: String, userId: UserID, businessUnitId: String) -> AnyPublisher<[Executive], Error>
}

