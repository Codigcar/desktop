//
//  GetDocumentsListInteractor.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/24/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetPolizaDocumentsListInteractor: GetDocumentsListUseCase {
    @Injected var repo: DocumentRepository
    
    func execute(with parentId: PolizaId) -> AnyPublisher<[Document], Error> {
        repo.getPolizaDocuments(for: parentId)
    }
}
