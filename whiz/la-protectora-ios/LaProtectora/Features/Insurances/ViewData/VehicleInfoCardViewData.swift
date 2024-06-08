//
//  VehicleInfoCardViewData.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/12/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct VehicleInfoCardViewData: LPCardData, Hashable {
    var id: String {
        self.vehicleInfo.plate
    }
    
    var url: URL?
    
    var vehicleInfo: VehicleInfo

    var title: String {
        "Placa"
    }
    
    var status: String? {
        vehicleInfo.status
    }
    
    var description: String {
        self.vehicleInfo.plate
    }
    
    var disclosure: LPCardDetailedDisclosure? {
        nil
    }
    
    var rowsData: [SmallRow.Data] {
        [SmallRow.Data(text: "Asegurado", detail: self.vehicleInfo.clientName), SmallRow.Data(text: "Clase", detail: self.vehicleInfo.vehicleClass), SmallRow.Data(text: "Marca", detail: self.vehicleInfo.make), SmallRow.Data(text: "Modelo", detail: self.vehicleInfo.model), SmallRow.Data(text: "Año", detail: self.vehicleInfo.year)]
    }
}
