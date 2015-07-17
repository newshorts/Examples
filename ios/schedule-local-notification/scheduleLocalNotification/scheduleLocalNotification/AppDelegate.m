//
//  AppDelegate.m
//  scheduleLocalNotification
//
//  Created by Mike Newell on 7/16/15.
//  Copyright (c) 2015 Mike Newell. All rights reserved.
//

#import "AppDelegate.h"
#import "MyAppDataController.h"
#import "MyAlertsController.h"
#import "MyNotificationController.h"

@interface AppDelegate ()

@end

@implementation AppDelegate

#pragma mark - default methods
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    NSLog(@"didFinishLaunchingWithOptions");
    // Override point for customization after application launch.
    
    // set classes
    dataController = [[MyAppDataController alloc] init];
    alertsController = [[MyAlertsController alloc] init];
    notificationController = [[MyNotificationController alloc] init];
    
    // if its the first time loading the app
    if ([dataController isFirstTimeLoadingApp]) {
        
        // we need to ask the user to allow local notifications
        if ([UIApplication instancesRespondToSelector:@selector(registerUserNotificationSettings:)]) {
            [notificationController askUserAllowLocalNotifications];
        } else {
            // cannot register local notification settings at this time
            NSLog(@"cannot register local notification settings");
            [alertsController alertUnableToSetSettings];
        }
        
        // mark the app as already loaded for the first time
        [dataController setFirstTimeLoadingApp];
    } else {
        [self checkNotificationStatus];
    }
    
    // TODO: determine if it's 9:11 and handle which view we present accordingly
    
    return YES;
}

- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
    NSLog(@"applicationWillResignActive");
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    NSLog(@"applicationDidEnterBackground");
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
    NSLog(@"applicationWillEnterForeground");
    
    [self checkNotificationStatus];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    NSLog(@"applicationDidBecomeActive");
}

- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    NSLog(@"applicationWillTerminate");
}

#pragma mark - custom notifications
- (void) application:(UIApplication *)application didReceiveLocalNotification: (UILocalNotification *) notification
{
    NSLog(@"didReceiveLocalNotification");
}

// after the user clicks "allow" or "deny" on the local notification settings
// can also retrieve these settings anywhere in the app
// this event should only fire on setup and not after
- (void) application:(UIApplication *)application didRegisterUserNotificationSettings: (UIUserNotificationSettings *) notificationSettings
{
    if ([notificationController hasPermissionForLocalNotification]) {
        NSLog(@"we have permission");
        // set the local notifications
        if (![dataController isLocalNotificationsSet]) {
            [notificationController set911LocalNotifications];
            [dataController setLocalNotificationsSet];
        }
    } else {
        NSLog(@"we dont have permission");
    }
}

#pragma mark - helpers
- (void) checkNotificationStatus
{
    if (![dataController isLocalNotificationsSet]) {
        // user has not set the notifications
        if ([notificationController hasPermissionForLocalNotification]) {
            NSLog(@"setting local notifications since we have permission");
            [notificationController set911LocalNotifications];
            [dataController setLocalNotificationsSet];
        } else {
            NSLog(@"asking user for permission again");
            [notificationController askUserAllowLocalNotifications];
        }
    } else {
        if (![notificationController hasPermissionForLocalNotification]) {
            NSLog(@"unsetting localnotificationset and asking for permission again");
            [dataController unsetLocalNotificationsSet];
            [notificationController askUserAllowLocalNotifications];
        }
    }
}

@end
