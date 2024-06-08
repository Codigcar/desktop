//
//  AppDelegate.swift
//  La Protectora
//
//  Created by Rolando Rodriguez on 7/31/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import UIKit
import Resolver

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
            if let error = error {
                print("D'oh: \(error.localizedDescription)")
            } else {
                DispatchQueue.main.async {
                    application.registerForRemoteNotifications()
                }
            }
        }
        return true
    }

    // MARK: UISceneSession Lifecycle

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Called when the user discards a scene session.
        // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
        // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
    }
    
    func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
        
    }
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        let tokenString = deviceToken.hexString
        print(tokenString)
        UserDefaults.standard.setValue(tokenString, forKey: "deviceToken")
    }
    
    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        print("didFailToRegisterForRemoteNotificationsWithError: ", error)
    }
}

extension Data {
    var hexString: String {
        let hexString = map { String(format: "%02.2hhx", $0) }.joined()
        return hexString
    }
}

extension Resolver: ResolverRegistering {
    public static func registerAllServices() {
        
        registerNetworkServices()
        
        registerRepositories()
        
        registerAuthenticationServices()
        
        registerInteractors()
        
        
        registerViewModels()
        
        register {
            DeepRouter()
        }
        .scope(.application)
    }
}

extension Resolver {
    public static func registerViewModels() {
        register {
            RiskGroupListViewViewModel()
        }
        .scope(.application)
        
        register {
            SiniestrosCategoriesViewModel()
        }
        .scope(.application)
        
        register {
            MoreMenuViewModel()
        }
        .scope(.application)
        
        register {
            HomeViewModel()
        }
        .scope(.application)
        
        register {
            PersonalDataViewModel()
        }
        .scope(.application)
    }
}

extension Resolver {
    public static func registerAuthenticationServices() {
        register {
            AuthManager()
        }
        .scope(.application)
        
        register {
            AuthTokenManager()
        }
        .scope(.application)
    }
}

extension Resolver {
    public static func registerNetworkServices() {
        register {
            RequestManager()
        }
        .scope(.application)
        
        register {
            NetworkAPIClient()
        }
        
        register {
            BlogAPIClient()
        }
        
        register {
            CDNBlogStorageRepository()
        }
        .implements(BlogStorageRepository.self)
    }
}

extension Resolver {
    public static func registerInteractors() {
        register {
            GetRiskGroupInteractor()
        }
        .implements(GetRiskGroupUseCase.self)
        
        register {
            GetInsurancesInteractor()
        }
        .implements(GetInsurancesUseCase.self)
        
        register {
            GetEndososInteractor()
        }
        .implements(GetEndososForInsuranceUseCase.self)
        
        register {
            GetPrimasInteractor()
        }
        .implements(GetPrimasUseCase.self)
        
        register {
            GetCouponsListInteractor()
        }
        .implements(GetCouponsListUserCase.self)
        
        register {
            GetPolizaDocumentsListInteractor()
        }
        .implements(GetDocumentsListUseCase.self)
        
        register {
            GetSiniestroDocumentsListInteractor()
        }
        
        register {
            GetSiniestroInfoListInteractor()
        }
        .implements(GetSiniestroInfoListUseCase.self)
        
        register {
            GetVehicleInfoListInteractor()
        }
        .implements(GetVehicleInfoListUseCase.self)
        
        register {
            GetInsuredInfoListInteractor()
        }
        .implements(GetInsuredInfoListUseCase.self)
        
        register {
            GetSiniestroGroupListInteractor()
        }
        .implements(GetSiniestroGroupListUseCase.self)
        
        register {
            GetSiniestroCardModelListInteractor()
        }
        .implements(GetSiniestroCardModelListUseCase.self)
        
        register {
            GetSiniestroDetailInteractor()
        }
        .implements(GetSiniestroDetailUseCase.self)
        
        register {
            GetFollowUpListInteractor()
        }
        .implements(GetFollowUpListUseCase.self)
        
        register {
            GetInsuredVehiclesListInteractor()
        }
        .implements(GetInsuredVehiclesListUseCase.self)
        
        register {
            GetSiniestroTypeListInteractor()
        }
        .implements(GetSiniestroTypeListUseCase.self)
        
        register {
            RegisterSinisterInteractor()
        }
        .implements(RegisterSinisterUseCase.self)
        
        register {
            GetUbigeoDataInteractor()
        }
        .implements(GetUbigeoDataUseCase.self)
        
        register {
            GetExecutivesRiskGroupInteractor()
        }
        .implements(GetExecutivesRiskGroupUseCase.self)
        
        register {
            GetAccountExecutiveListInteractor()
        }
        .implements(GetAccountExecutivesListUseCase.self)
        
        register {
            GetSinisterExecutivesListInteractor()
        }
        .implements(GetSinisterExecutivesListUseCase.self)
        
        register {
            GetContactCenterDataInteractor()
        }
        .implements(GetContactCenterDataUseCase.self)
        
        register {
            GetFeaturedBlogPostInteractor()
        }
        .implements(GetFeaturedBlogPostUseCase.self)
        
        register {
            GetBlogPostsInteractor()
        }
        .implements(GetBlogPostsUseCase.self)
        
        register {
            GetBlogSubbCategoriesInteractor()
        }
        .implements(GetBlogSubbCategoriesUseCase.self)
        
        register {
            GetRecentBlogPostsInteractor()
        }
        .implements(GetRecentBlogPostsUseCase.self)
        
        register {
            GetRecentCategoryBlogPostsInteractor()
        }
        .implements(GetRecentCategoryBlogPostsUseCase.self)
        
        register {
            GetBlogCategoriesInteractor()
        }
        .implements(GetBlogCategoriesUseCase.self)
        
        register {
            GetLinkDataInteractor()
        }
        .implements(GetLinkDataUseCase.self)
        
        register {
            GetEncryptedLinkInteractor()
        }
        .implements(GetEncryptedLinkUseCase.self)
        
        register {
            GetQuoterLinkDataInteractor()
        }
        .implements(GetQuoterLinkDataUseCase.self)
        
    }
}

extension Resolver {
    public static func registerRepositories() {
        register {
            RestRiskGroupRepository()
        }
        .implements(RiskGroupRepository.self)
        
        register {
            RestInsuranceRepository()
        }
        .implements(InsuranceRepository.self)
        
        register {
            RestEndosoRepository()
        }
        .implements(EndososRepository.self)
        
        register {
            RestPrimaRepository()
        }
        .implements(PrimaRepository.self)
        
        register {
            RestCouponRepository()
        }
        .implements(CouponRepository.self)
        
        register {
            RestDocumentRespository()
        }
        .implements(DocumentRepository.self)
        
        register {
            RestSiniestroInfoRepository()
        }
        .implements(SiniestroInfoRepository.self)
        
        register {
            RestVehicleInfoRepository()
        }
        .implements(VehicleInfoRepository.self)
        
        register {
            RestInsuredInfoRepository()
        }
        .implements(InsuredInfoRepository.self)
        
        register {
            RestSiniestroGroupRepository()
        }
        .implements(SiniestroGroupRepository.self)
        
        register {
            RestSiniestroCardModelRepository()
        }
        .implements(SiniestroCardModelRepository.self)
        
        register {
            RestSiniestroRepository()
        }
        .implements(SiniestroRepository.self)
        
        register {
            RestFollowUpRepository()
        }
        .implements(FollowUpRepository.self)
        
        register {
            RestInsuredVehicleRepository()
        }
        .implements(InsuredVehicleRepository.self)
        
        register {
            RestSiniestroTypeRepository()
        }
        .implements(SiniestroTypeRepository.self)
        
        register {
            RestSinisterRegistrationRepository()
        }
        .implements(SinisterRegistrationRepository.self)
        
        register {
            RestUbigeoDataRepository()
        }
        .implements(UbigeoDataRepository.self)
        
        register {
            RestExecutiveRepository()
        }
        .implements(ExecutiveRepository.self)
        
        register {
            RestContactCenterRepository()
        }
        .implements(ContactCenterRepository.self)
        
        register {
            RestBlogPostRepository()
        }
        .implements(BlogPostRepository.self)
        
        register {
            RestBlogSubCategoryRepository()
        }
        .implements(BlogSubCategoryRepository.self)
        
        register {
            RestBlogCategoryRepository()
        }
        .implements(BlogCategoryRepository.self)
        
        register {
            RestPronostikRepository()
        }
        .implements(PronostikRepository.self)
        
        register {
            RestQuoterRepository()
        }
        .implements(QuoterRepository.self)
    }
}
