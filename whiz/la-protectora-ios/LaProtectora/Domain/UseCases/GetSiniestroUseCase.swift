//
//  GetSiniestroUseCase.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/26/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol GetSiniestroDetailUseCase {
    var repo: SiniestroRepository { get set }
    func execute(for siniestroId: SiniestroId) -> AnyPublisher<Siniestro, Error>
}
