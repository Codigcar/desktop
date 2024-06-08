//
//  GetEncryptedLinkUseCase.swift
//  LaProtectora
//
//  Created by Serguei on 24/01/22.
//  Copyright © 2022 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol GetEncryptedLinkUseCase {
    var repo: RestPronostikRepository { get set }

    func execute(channelId: String, clientTypeId: Int, clientDocType: String, clientFullName: String, externalCode: String, pronostikLink: String) -> AnyPublisher<URL?, Error>
}
