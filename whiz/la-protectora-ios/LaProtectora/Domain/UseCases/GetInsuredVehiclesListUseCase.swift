//
//  GetInsuredVehiclesList.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/28/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol GetInsuredVehiclesListUseCase {
    var repo: InsuredVehicleRepository { get set }

    func execute(for userId: UserID) -> AnyPublisher<[InsuredVehicle], Error>
}
