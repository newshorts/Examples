//
//  AppDelegate.h
//  scheduleLocalNotification
//
//  Created by Mike Newell on 7/16/15.
//  Copyright (c) 2015 Mike Newell. All rights reserved.
//

#import <UIKit/UIKit.h>

@class MyAppDataController;

@interface AppDelegate : UIResponder <UIApplicationDelegate> {
    MyAppDataController *dataController;
}

@property (strong, nonatomic) UIWindow *window;

@end

