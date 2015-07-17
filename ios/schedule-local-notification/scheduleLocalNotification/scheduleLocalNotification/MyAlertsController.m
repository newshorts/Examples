//
//  MyAlertsController.m
//  scheduleLocalNotification
//
//  Created by Mike Newell on 7/18/15.
//  Copyright (c) 2015 Mike Newell. All rights reserved.
//

#import "MyAlertsController.h"

@implementation MyAlertsController

- (void) alertUnableToSetSettings
{
    alertView = [[UIAlertView alloc] initWithTitle:@"Unable to set Local Notifications!"
                                           message:@"This app requires this, if you don't allow it in your settings the app will not remind you when it's 9:11."
                                          delegate: self
                                 cancelButtonTitle:@"OK"
                                 otherButtonTitles:nil];
    [alertView show];
}

@end