//
//  MyAlertsController.h
//  askUserPermissions
//
//  Created by Mike Newell on 7/16/15.
//  Copyright (c) 2015 Mike Newell. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface MyAlertsController : NSObject {
    UIAlertView *alertView;
}

- (void) alertUnableToSetSettings;

@end