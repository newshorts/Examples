//
//  MyAppDataController.h
//  scheduleLocalNotification
//
//  Created by Mike Newell on 7/16/15.
//  Copyright (c) 2015 Mike Newell. All rights reserved.
//

#import <Foundation/Foundation.h>

@class AppDelegate;

@interface MyAppDataController : NSObject {
    AppDelegate *appDelegate;
}

- (BOOL) isLocalNotificationsSet;
- (BOOL) isFirstTimeLoadingApp;
- (void) setFirstTimeLoadingApp;
- (void) setLocalNotificationsSet;
- (void) unsetLocalNotificationsSet;

@end
