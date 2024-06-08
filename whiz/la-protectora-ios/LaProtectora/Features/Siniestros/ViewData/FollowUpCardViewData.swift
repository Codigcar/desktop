//
//  FollowUpCardViewData.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/12/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct FollowUpCardViewData: LPCardData, Hashable {
    var id: String {
        self.followUp.number
    }
    
    var url: URL?
    
    var followUp: FollowUp

    var title: String {
        "Nº de Seguimiento"
    }
    
    var status: String?  {
        self.followUp.status
    }
    
    var description: String {
        self.followUp.number
    }
    
    var disclosure: LPCardDetailedDisclosure? {
        nil
    }
    
    var rowsData: [SmallRow.Data] {
        [SmallRow.Data(text: "Fecha de Actividad", detail: self.followUp.activityDate), SmallRow.Data(text: "Fecha de registro", detail: self.followUp.registerDate), SmallRow.Data(text: "Ejecutivo", detail: self.followUp.executive), SmallRow.Data(text: "Descripción", detail: self.followUp.description)]
    }
}
