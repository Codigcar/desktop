//
//  GetInsuredInfoListUseCase.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol GetInsuredInfoListUseCase {
    var repo: InsuredInfoRepository { get set }
    
    func execute(with polizaId: PolizaId) -> AnyPublisher<[InsuredInfo], Error>
}
