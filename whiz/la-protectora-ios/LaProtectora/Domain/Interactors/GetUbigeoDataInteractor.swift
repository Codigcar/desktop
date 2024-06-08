//
//  GetUbigeoDataInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/31/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetUbigeoDataInteractor: GetUbigeoDataUseCase {
    @Injected var repo: UbigeoDataRepository
    
    func getDepartments() -> AnyPublisher<[UbigeoData], Error> {
        repo.getDepartments()
    }
    
    func getDistricts(for code: String) -> AnyPublisher<[UbigeoData], Error> {
        repo.getDistricts(for: code)
    }
    
    func getProvinces(for code: String) -> AnyPublisher<[UbigeoData], Error> {
        repo.getProvinces(for: code)
    }
}
