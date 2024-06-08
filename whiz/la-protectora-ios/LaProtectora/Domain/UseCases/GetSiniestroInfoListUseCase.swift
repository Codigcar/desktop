//
//  GetSiniestroInfoListUseCase.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/24/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol GetSiniestroInfoListUseCase {
    var repo: SiniestroInfoRepository { get set }
    
    func execute(with polizaId: PolizaId) -> AnyPublisher<[SiniestroInfo], Error>
}
