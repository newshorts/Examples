//
//  Menu.m
//  UserInput
//
//  Created by Mike Newell on 4/5/14.
//  Copyright (c) 2014 Mike Newell. All rights reserved.
//

#import "Menu.h"

@implementation Menu

- (instancetype)init
{
    self = [super init];
    if (self) {
        // custom code
    }
    return self;
}

+ (void) handleMainMenu
{
    // set instance vars
    int selectNum;
    
    BOOL shouldExit = NO;
    BOOL shouldShowMainMenu = YES;
    
    User *newUser = [[User alloc] init];
    
    // wait for user input
    for (;;) {
        
        if (shouldShowMainMenu) {
            system("clear");
            [self showMainMenu];
            NSLog(@"The username was set to: %@", [newUser userName]);
        }
        
        scanf("%i", &selectNum);
        
        switch (selectNum) {
            case 1:
                NSLog(@"user entered: %i", selectNum);
                shouldShowMainMenu = YES;
                [self handleMenuOne:newUser];
                break;
            case 2:
                NSLog(@"user entered: %i", selectNum);
                shouldShowMainMenu = NO;
                break;
            case 3:
                NSLog(@"user entered: %i", selectNum);
                shouldShowMainMenu = NO;
                break;
            case 4:
                // reload the menu
                NSLog(@"user entered: %i", selectNum);
                shouldShowMainMenu = YES;
                break;
            case 5:
                NSLog(@"user entered: %i", selectNum);
                shouldShowMainMenu = NO;
                shouldExit = YES;
                break;
            default:
                NSLog(@"user did not enter something we recognized.");
                shouldShowMainMenu = YES;
                break;
        }
        
        if (shouldExit) {
            break;
        }
    }
}

+ (void) handleMenuOne:(User *) user
{
    // local vars
    char rawName[50];
    
    // booleans
    BOOL shouldShowMenuOne = YES;

    for (;;) {
        
        if (shouldShowMenuOne) {
            system("clear");
            [self showMenuOne];
        }
        
        scanf("%s", rawName);
        
        NSString *userName = [NSString stringWithUTF8String:rawName];
        
        if ([[userName lowercaseString] isEqualToString:@"back"]) {
            break;
        }
        
        NSLog(@"The username will be set to: %@", userName);
        [user setUserName:userName];
        shouldShowMenuOne = NO;
    }
    
}

+ (void) showMainMenu
{
    NSLog(@"** WELCOME **");
    NSLog(@"Please choose from the list below...");
    NSLog(@"\n");
    NSLog(@"[1] Enter a name");
    NSLog(@"[2] Enter a number");
    NSLog(@"[3] Enter a name and a number");
    NSLog(@"[4] Reload the main menu");
    NSLog(@"[5] Exit");
}

+ (void) showMenuOne
{
    system("clear");
    NSLog(@"** NAME **");
    NSLog(@"Please enter a name...");
    NSLog(@"\n");
    NSLog(@"Type \"back\" to return to the previous menu.");
}

@end
