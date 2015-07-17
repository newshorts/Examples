//
//  MyNotificationController.m
//  scheduleLocalNotification
//
//  Created by Mike Newell on 7/18/15.
//  Copyright (c) 2015 Mike Newell. All rights reserved.
//

#import "MyNotificationController.h"

@implementation MyNotificationController

// TODO: split this into AM/PM notifications as well, schedule two notifications
- (void) set911LocalNotifications
{
    notification = [[UILocalNotification alloc] init];
    fireDate = [self getFireDate];
    
    // Set the fire date/time to repeat daily
    [notification setFireDate:fireDate];
    [notification setTimeZone:[NSTimeZone defaultTimeZone]];
    [notification setApplicationIconBadgeNumber:1];
    // NOTE: I will need to set this to NSCalendarUnitDay for production
    [notification setRepeatInterval:NSCalendarUnitMinute];
    
    // Setup alert notification
    [notification setAlertAction:@"Open App"];
    [notification setAlertBody:@"Please take a moment for reflection."];
    [notification setAlertLaunchImage:@"icon-120x120"];
    
    // setup sound
    notification.soundName=UILocalNotificationDefaultSoundName;
    [notification setHasAction:YES];
    
    // schedule
    if ([self hasPermissionForLocalNotification]) {
        [[UIApplication sharedApplication] scheduleLocalNotification: notification];
    } else {
        NSLog(@"unable to schedule local notifications!");
    }
}

// TODO: this doesn't ask the user for permission after the first time launching the app
- (void) askUserAllowLocalNotifications
{
    [[UIApplication sharedApplication] registerUserNotificationSettings: [UIUserNotificationSettings settingsForTypes:UIUserNotificationTypeAlert|UIUserNotificationTypeSound|UIUserNotificationTypeBadge categories:nil]];
}

- (BOOL) hasPermissionForLocalNotification
{
    UIUserNotificationSettings *currentSettings = [[UIApplication sharedApplication] currentUserNotificationSettings];
    NSLog(@"UIUserNotificationSettings: %@", currentSettings);
    
    if (currentSettings.types == UIUserNotificationTypeNone) {
        NSLog(@"user has set local notification settings to: UIUserNotificationTypeNone");
        return NO;
    }
    
    if (currentSettings.types & UIUserNotificationTypeAlert && currentSettings.types & UIUserNotificationTypeBadge && currentSettings.types & UIUserNotificationTypeSound) {
        NSLog(@"we have all settings");
        return YES;
    } else {
        NSLog(@"we may have some settings, but not all");
        return NO;
    }

}

- (NSDate *) getFireDate
{
    NSCalendar *calendar = [[NSCalendar alloc] initWithCalendarIdentifier:NSCalendarIdentifierGregorian];
    NSDate *now = [NSDate date];
    NSDateComponents *dateComponents = [calendar components:(NSCalendarUnitYear | NSCalendarUnitMonth | NSCalendarUnitDay) fromDate:now];
    NSDateComponents *timeComponents = [calendar components:(NSCalendarUnitHour | NSCalendarUnitMinute | NSCalendarUnitSecond) fromDate:now];
    
    NSDateComponents *dateComps = [[NSDateComponents alloc] init];
    [dateComps setDay:[dateComponents day]];
    [dateComps setMonth:[dateComponents month]];
    [dateComps setYear:[dateComponents year]];
    
    [dateComps setHour:[timeComponents hour]];
    [dateComps setMinute:[timeComponents minute]];
    [dateComps setSecond:[timeComponents second]];
    
    return [calendar dateFromComponents:dateComps];
}

@end
