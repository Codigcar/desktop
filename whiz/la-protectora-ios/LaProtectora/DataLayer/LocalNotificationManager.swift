//
//  LocalNotificationManager.swift
//  LaProtectora
//
//  Created by Rolando Rodriguez on 10/23/20.
//  Copyright © 2020 Whiz. All rights reserved.
//

import Foundation
import UserNotifications
import Combine

enum LocalNotificationManagerError: Error {
    case NotAuthorized
}

struct LocalNotificationManager {
    
    private var requestPermission: AnyPublisher<Bool, Error> {
        Future<Bool, Error> { promise in
            UNUserNotificationCenter
                .current()
                .requestAuthorization(options: [.alert, .badge, .alert]) { granted, error in
                    if granted == true && error == nil {
                        promise(.success(true))
                    } else if let err = error {
                        promise(.failure(err))
                    } else {
                        promise(.success(false))
                    }
            }
        }
        .eraseToAnyPublisher()
    }
    
    private func addNotification(with id: String = UUID().uuidString, title: String, message: String, timeInterval: TimeInterval) -> AnyPublisher<Void, Error> {
        Future<Void, Error> { promise in
            let content = UNMutableNotificationContent()
            content.title = title
            content.body = message
            let id = UUID().uuidString
            let trigger = UNTimeIntervalNotificationTrigger(timeInterval: timeInterval, repeats: false)
            let request = UNNotificationRequest(identifier: id, content: content, trigger: trigger)
            
            UNUserNotificationCenter.current().add(request) { error in
                guard error == nil else { promise(.failure(error!)); return }
                print("Scheduling notification with id: \(id)")
                promise(.success(()))
            }
        }
        .eraseToAnyPublisher()
    }
    
    
    func scheduleNotification(with id: String = UUID().uuidString, title: String, message: String, timeInterval: TimeInterval) -> AnyPublisher<Void, Error> {
        Future<Bool, Error> { promise in
            UNUserNotificationCenter.current().getNotificationSettings { settings in
                switch settings.authorizationStatus {
                case .notDetermined:
                    promise(.success(false))
                case .authorized, .provisional:
                    promise(.success(true))
                default:
                    promise(.failure(LocalNotificationManagerError.NotAuthorized))
                }
            }
        }
        .flatMap { (val) -> AnyPublisher<Void, Error> in
            if val {
                return self.addNotification(with: id, title: title, message: message, timeInterval: timeInterval)
            } else {
               return self.requestPermission
                .flatMap { _ in self.addNotification(with: id, title: title, message: message, timeInterval: timeInterval) }
                    .eraseToAnyPublisher()
            }
        }
        .receive(on: RunLoop.main)
        .eraseToAnyPublisher()
    }
    
    func removeScheduledNotification(with id: String) {
        UNUserNotificationCenter.current().removePendingNotificationRequests(withIdentifiers: [id])
    }
}
