//
//  MyNotificationController.h
//  scheduleLocalNotification
//
//  Created by Mike Newell on 7/18/15.
//  Copyright (c) 2015 Mike Newell. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface MyNotificationController : NSObject {
    UILocalNotification *notification;
    NSDate *fireDate;
}

- (void) set911LocalNotifications;
- (void) askUserAllowLocalNotifications;
- (BOOL) hasPermissionForLocalNotification;
- (NSDate *) getFireDate;

@end
