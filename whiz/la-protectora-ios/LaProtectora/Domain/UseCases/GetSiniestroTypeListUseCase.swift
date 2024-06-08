//
//  GetSiniestroTypeListUseCase.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/28/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol GetSiniestroTypeListUseCase {
    var repo: SiniestroTypeRepository { get set }
    
    func execute() -> AnyPublisher<[SiniestroType], Error>
}
