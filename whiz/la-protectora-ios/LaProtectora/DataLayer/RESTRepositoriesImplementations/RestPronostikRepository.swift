//
//  RestPronostikRepository.swift
//  LaProtectora
//
//  Created by Serguei on 24/01/22.
//  Copyright © 2022 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct RestPronostikRepository: PronostikRepository {
    @Injected var client: NetworkAPIClient
    
    func getLinkData() -> AnyPublisher<[LinkData], Error> {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("link/").withEndPoint("pronostik").withType(.get)
        let request = builder.build()
        return client.call(request: request)
            .tryMap {
                try $0.compactMap { (data) -> LinkData? in
                    try LinkDataMapper(dictionary: data).execute()
                }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
    
    func getEncryptedLink(channelId: String, clientTypeId: Int, clientDocType: String, clientFullName: String, externalCode: String, pronostikLink: String) -> AnyPublisher<URL?, Error> {
        let builder = ApiRequest.Builder()
        builder.withPath("/api/mobile/").withResource("encriptar/parametros/").withEndPoint("pronostik").withType(.post)
            .withBodyParams(["IdCanal" : channelId,
                             "idTipoDocCliente" : clientTypeId,
                             "nroDocCliente" : clientDocType,
                             "nombreCompletoCliente" : clientFullName,
                             "CodigoExternoEmpresaExterna" : externalCode,
                             "LinkPronostik" : pronostikLink])
        let request = builder.build()
        return client.call(request: request)
            .tryMap {
                if let url = $0[0]["data"] as? String {
                    return URL(string: url)
                }
                return nil
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
    
}
