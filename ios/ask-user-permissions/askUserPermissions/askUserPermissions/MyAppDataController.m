//
//  MyAppDataController.m
//  askUserPermissions
//
//  Created by Mike Newell on 7/16/15.
//  Copyright (c) 2015 Mike Newell. All rights reserved.
//

#import "MyAppDataController.h"
#import "AppDelegate.h"

@implementation MyAppDataController

#pragma mark - custom methods

- (BOOL) testBoolean
{
    return YES;
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

@end