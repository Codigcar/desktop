//
//  GetLinkDataUseCase.swift
//  LaProtectora
//
//  Created by Serguei on 24/01/22.
//  Copyright © 2022 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol GetLinkDataUseCase {
    var repo: RestPronostikRepository { get set }

    func execute() -> AnyPublisher<[LinkData], Error>
}
