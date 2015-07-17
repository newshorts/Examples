//
//  AppDelegate.h
//  scheduleLocalNotification
//
//  Created by Mike Newell on 7/16/15.
//  Copyright (c) 2015 Mike Newell. All rights reserved.
//

#import <UIKit/UIKit.h>

@class MyAppDataController;
@class MyAlertsController;
@class MyNotificationController;

@interface AppDelegate : UIResponder <UIApplicationDelegate> {
    MyAppDataController *dataController;
    MyAlertsController *alertsController;
    MyNotificationController *notificationController;
}

@property (strong, nonatomic) UIWindow *window;

@end

