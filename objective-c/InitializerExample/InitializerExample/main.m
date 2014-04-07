//
//  main.m
//  InitializerExample
//
//  Created by Mike Newell on 4/5/14.
//  Copyright (c) 2014 Mike Newell. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Player.h"

int main(int argc, const char * argv[])
{

    @autoreleasepool {
        
        Player *player = [[Player alloc] init];
        
        NSLog(@"the player score is %i", [player score]);
        
        Player *player2 = [[Player alloc] initWithInt:3000];
        
        NSLog(@"the player score is %i", [player2 score]);
        
    }
    return 0;
}

