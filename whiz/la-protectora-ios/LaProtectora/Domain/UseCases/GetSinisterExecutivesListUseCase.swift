//
//  GetSinisterExecutivesListUseCase.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 9/1/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol GetSinisterExecutivesListUseCase {
    var repo: ExecutiveRepository { get set }
    
    func execute(for userId: UserID) -> AnyPublisher<[Executive], Error>
}
