//
//  UserMapper.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/14/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation

struct UserMapper: Mapper {
    struct Data: Codable {
        let CodigoMensaje: Int
        let RespuestaMensaje: String
        let codigoCliente: Int
        let usu: String
        let pass: String
        let nombreCortoCliente: String
        let nombreCliente: String
        let nomCliente: String
        let apePatCliente: String
        let apeMatCliente: String
        let idUniNegCliente: Int
        let NombreUniNegCliente: String
        let tipCliente: String
        let tipoDocCliente: String
        let nroDocCliente: String
        let idDepCliente: String
        let nombDeparCliente: String
        let idProvCliente: String
        let nombProvCliente: String
        let idDisCliente: String
        let nomDisCliente: String
        let dirCliente: String
        let telfCliente: String
        let celCliente: [String]
        let emailCliente: String
        let fechaNaciCliente: Date?
        let idTipoDocCliente: Int
        let nombreCompletoCliente: String
    }
    
    struct NotClient: Codable {
        let nombre: String, apellidos: String, email: String, usu: String
    }
    
    enum MapError: Error {
        case cannotParseDocumentTypeOrClientTypeDefaultingToNOCLIENT
    }
    var dictionary: [String: Any]
    
    init(dictionary: [String: Any]) {
        self.dictionary = dictionary
    }
     
    func execute() -> User {
        print(dictionary)
        let json = try! JSONSerialization.data(withJSONObject: self.dictionary, options: [])
        let decoder = JSONDecoder()
        let dateFormatter = DateFormatter()
        dateFormatter.dateStyle = .short
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        dateFormatter.locale = Locale(identifier: "en_US_POSIX")
        dateFormatter.timeZone = TimeZone(abbreviation: "UTC-05")
        decoder.dateDecodingStrategy = .formatted(dateFormatter)
        do {
            let dataModel = try decoder.decode(UserMapper.Data.self, from: json)
            let phones = Array(dataModel.telfCliente.split(separator: "\n").map({ (s) in
                String(s)
            }))
            guard let documentType = DocumentType(rawValue: dataModel.tipoDocCliente),
                let clientType = User.ClientType(rawValue: dataModel.tipCliente) else { throw  MapError.cannotParseDocumentTypeOrClientTypeDefaultingToNOCLIENT }
            
            let user = User(userCode: dataModel.usu, id: dataModel.codigoCliente, firstName: dataModel.nomCliente, middleName: dataModel.apePatCliente, lastName: dataModel.apeMatCliente, businessUnit: BusinessUnit(id: dataModel.idUniNegCliente, name: dataModel.NombreUniNegCliente), document: IdentityDocument(number: dataModel.nroDocCliente, type: documentType, id: dataModel.idTipoDocCliente), type: clientType, address: User.Address(department: dataModel.nombDeparCliente, departmentId: dataModel.idDepCliente, province: dataModel.nombProvCliente, provinceId: dataModel.idProvCliente, district: dataModel.nomDisCliente, districtId: dataModel.idDisCliente, street: dataModel.dirCliente), phones: phones, cellPhone: dataModel.celCliente[0], email: dataModel.emailCliente, birthDate: dataModel.fechaNaciCliente, clientFullName: dataModel.nombreCompletoCliente)
            
            return user
        } catch let error {
            print("Catched error UserMapper: \(error), trying to recover.")
            let dataModel = try! decoder.decode(UserMapper.NotClient.self, from: json)
            let firstName = String(dataModel.nombre.split(separator: " ").first!)
            let middleName = String(dataModel.apellidos.split(separator: " ").first ?? "")
            let lastName = String(dataModel.apellidos.split(separator: " ").last ?? "") == "" ? dataModel.apellidos :  String(dataModel.apellidos.split(separator: " ").last ?? "")
            let user = User(userCode: dataModel.usu, id: nil, firstName: firstName, middleName: middleName != lastName ? middleName : "", lastName: lastName, businessUnit: nil, document: nil, type: .none, address: nil, phones: nil, cellPhone: nil, email: dataModel.email, birthDate: nil, clientFullName: "")
            return user
        }
    }
}
