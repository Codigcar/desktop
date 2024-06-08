//
//  GetEndososUseCase.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/21/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol GetEndososForInsuranceUseCase {
    var repo: EndososRepository {get set}
    
    func execute(polizaId: String) -> AnyPublisher<[Endoso], Error>
}
