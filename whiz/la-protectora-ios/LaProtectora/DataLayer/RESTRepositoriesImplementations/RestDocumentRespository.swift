//
//  RestDocumentRespository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/24/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct RestDocumentRespository: DocumentRepository {
    @Injected var client: NetworkAPIClient
    
    func getPolizaDocuments(for polizaId: PolizaId) -> AnyPublisher<[Document], Error> {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("polizas/").withEndPoint("documentos").withBodyParams(["LOCAL_ID_POLIZA": polizaId]).withType(.post)
        let request = builder.build()
        return client.call(request: request)
        .tryMap {
                try $0.compactMap { (data) -> Document? in
                   try DocumentMapper(dictionary: data).execute()
                }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
    
    func getSiniestroDocuments(for siniestroId: String) -> AnyPublisher<[Document], Error> {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("documentos/").withEndPoint("siniestro").withBodyParams(["LOCAL_ID_SINIESTRO": siniestroId]).withType(.post)
        let request = builder.build()
        return client.call(request: request)
        .tryMap {
               try $0.compactMap { (data) -> Document? in
                    try DocumentMapper(dictionary: data).execute()
                }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }

}

