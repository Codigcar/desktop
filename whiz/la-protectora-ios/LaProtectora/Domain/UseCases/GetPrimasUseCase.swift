//
//  GetPrimasUseCase.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/24/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol GetPrimasUseCase {
    var repo: PrimaRepository {get set}
    
    func execute(polizaId: PolizaId) -> AnyPublisher<[Prima], Error>
}
