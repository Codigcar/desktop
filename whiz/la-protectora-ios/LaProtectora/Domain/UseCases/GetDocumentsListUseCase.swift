//
//  GetDocumentsListUseCase.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/24/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine 

protocol GetDocumentsListUseCase {
    var repo: DocumentRepository { get set }
    
    func execute(with parentId: PolizaId) -> AnyPublisher<[Document], Error>
}
