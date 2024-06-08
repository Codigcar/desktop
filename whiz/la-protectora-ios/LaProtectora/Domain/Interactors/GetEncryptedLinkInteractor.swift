//
//  GetEncryptedLinkInteractor.swift
//  LaProtectora
//
//  Created by Serguei on 24/01/22.
//  Copyright © 2022 Whiz. All rights reserved.
//

import Foundation
import Combine
import Resolver

struct GetEncryptedLinkInteractor: GetEncryptedLinkUseCase {
    @Injected var repo: RestPronostikRepository
    
    func execute(channelId: String, clientTypeId: Int, clientDocType: String, clientFullName: String, externalCode: String, pronostikLink: String) -> AnyPublisher<URL?, Error> {
        return repo.getEncryptedLink(channelId: channelId, clientTypeId: clientTypeId, clientDocType: clientDocType, clientFullName: clientFullName, externalCode: externalCode, pronostikLink: pronostikLink)
    }

}
