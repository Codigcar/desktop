//
//  GetUbigeoDataUseCase.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/31/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol GetUbigeoDataUseCase {
    var repo: UbigeoDataRepository { get set }
    
    func getDepartments() -> AnyPublisher<[UbigeoData], Error>
    func getDistricts(for code: String) -> AnyPublisher<[UbigeoData], Error>
    func getProvinces(for code: String) -> AnyPublisher<[UbigeoData], Error>
}
