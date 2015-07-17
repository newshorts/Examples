//
//  MyAppDataController.m
//  scheduleLocalNotification
//
//  Created by Mike Newell on 7/16/15.
//  Copyright (c) 2015 Mike Newell. All rights reserved.
//

#import "MyAppDataController.h"
#import "AppDelegate.h"

@implementation MyAppDataController

#pragma mark - custom methods

- (BOOL) isLocalNotificationsSet
{
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    if ([defaults objectForKey:@"localNotificationsSet"] == nil) {
        NSLog(@"local notifications are not set");
        return NO;
    } else {
        NSLog(@"local notifications are set");
        return YES;
    }
}

- (BOOL) isFirstTimeLoadingApp
{
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    // resets the object for testing
    [defaults removeObjectForKey:@"appInstalled"];
    
    if ([defaults objectForKey:@"appInstalled"] == nil) {
        NSLog(@"isFirstTimeLoadingApp = YES");
        return YES;
    } else {
        NSLog(@"isFirstTimeLoadingApp = NO");
        return NO;
    }
}

- (void) setFirstTimeLoadingApp
{
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:[NSDate date] forKey:@"appInstalled"];
}

- (void) setLocalNotificationsSet
{
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:[NSDate date] forKey:@"localNotificationsSet"];
}

- (void) unsetLocalNotificationsSet
{
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults removeObjectForKey:@"localNotificationsSet"];
}

@end