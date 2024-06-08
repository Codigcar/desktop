//
//  GetVehicleInfoListUseCase.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/25/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol GetVehicleInfoListUseCase {
    var repo: VehicleInfoRepository { get set }
    
    func execute(with polizaId: PolizaId) -> AnyPublisher<[VehicleInfo], Error>
}
