//
//  UserRepository.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 8/20/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import Combine

protocol UserRepository {
    func getUser(id: UserID) -> AnyPublisher<User, Error>
    func updateUser(id: UserID, payload: [String: Any])
}

protocol RiskGroupRepository {
    func getRiskGroups(for userId: UserID) -> AnyPublisher<[RiskGroup], Error>
    func getExecutivesRiskGroups(for userId: UserID) -> AnyPublisher<[RiskGroup], Error>
}

protocol InsuranceRepository {
    func getInsurances(for userId: UserID, with riskGroupId: RiskGroupId) -> AnyPublisher<[Insurance], Error>
}

protocol EndososRepository {
    func getEndosos(for polizaId: String) -> AnyPublisher<[Endoso], Error>
}

protocol PrimaRepository {
    func getPrimas(for polizaId: PolizaId) -> AnyPublisher<[Prima], Error>
}

protocol CouponRepository {
    func getCoupons(for financingId: FinancingId) -> AnyPublisher<[Coupon], Error>
}

protocol DocumentRepository {
    func getPolizaDocuments(for parentId: String) -> AnyPublisher<[Document], Error>
    func getSiniestroDocuments(for siniestroId: String) -> AnyPublisher<[Document], Error> 
}

protocol SiniestroInfoRepository {
    func getSiniestroInfoList(for polizaId: PolizaId) -> AnyPublisher<[SiniestroInfo], Error>
}

protocol VehicleInfoRepository {
    func getVehicleInfoList(for polizaId: PolizaId) -> AnyPublisher<[VehicleInfo], Error>
}

protocol InsuredInfoRepository {
    func getInsuredInfoList(for polizaid: PolizaId) -> AnyPublisher<[InsuredInfo], Error>
}

protocol SiniestroGroupRepository {
    func getSiniestrGroupList(for userId: UserID) -> AnyPublisher<[SiniestroGroup], Error>
}

protocol SiniestroCardModelRepository {
    func getSiniestroCardModelList(for userId: UserID, groupId: Int) -> AnyPublisher<[SiniestroCardModel], Error>
}

protocol SiniestroRepository {
    func getSiniestro(with id: SiniestroId) -> AnyPublisher<Siniestro, Error>
}

protocol FollowUpRepository {
    func getFollowUpList(for siniestroId: SiniestroId) -> AnyPublisher<[FollowUp], Error>
}

protocol InsuredVehicleRepository {
    func getInsuredVehicles(for userId: UserID) -> AnyPublisher<[InsuredVehicle], Error>
}

protocol SiniestroTypeRepository {
    func getSiniestroTypeList() -> AnyPublisher<[SiniestroType], Error>
}

protocol SinisterRegistrationRepository {
    func create(registration: SinisterRegistration) -> AnyPublisher<[String: Any], Error>
}

protocol UbigeoDataRepository {
    func getDepartments() -> AnyPublisher<[UbigeoData], Error>
    func getDistricts(for code: String) -> AnyPublisher<[UbigeoData], Error>
    func getProvinces(for code: String) -> AnyPublisher<[UbigeoData], Error>
}

protocol ExecutiveRepository {
    func getAccountExecutives(for riskGroupId: String, userId: UserID, businessUnitId: String) -> AnyPublisher<[Executive], Error>
    func getSinisterExecutives(for userId: UserID) -> AnyPublisher<[Executive], Error>
}

protocol ContactCenterRepository {
    func getMain() -> AnyPublisher<ContactCenter, Error>
}

protocol BlogCategoryRepository {
    func getCategories() -> AnyPublisher<[BlogCategory], Error>
}

protocol BlogPostRepository {
    func getFeatured() -> AnyPublisher<BlogPost, Error>
    
    func getPosts(with subcategoryId: BlogSubCategoryID) -> AnyPublisher<[BlogPost], Error>
    
    func getRecentPosts() -> AnyPublisher<[BlogPost], Error>
    
    func getRecentPosts(with categoryId: BlogCategoryID) -> AnyPublisher<[BlogPost], Error>
}

protocol BlogSubCategoryRepository {
    func getSubCategories(for categoryId: BlogCategoryID) -> AnyPublisher<[BlogSubCategory], Error>
}

protocol BlogStorageRepository {
    func buildContentURL(for uuid: String, type: CDNContentType) -> URL?
}

protocol PronostikRepository {
    func getLinkData() -> AnyPublisher<[LinkData], Error>
    
    func getEncryptedLink(channelId: String, clientTypeId: Int, clientDocType: String, clientFullName: String, externalCode: String, pronostikLink: String) -> AnyPublisher<URL?, Error>
}

protocol QuoterRepository {
    func getLinkData() -> AnyPublisher<[QuoterLinkData], Error>
}

