//
//  Player.m
//  InitializerExample
//
//  Created by Mike Newell on 4/5/14.
//  Copyright (c) 2014 Mike Newell. All rights reserved.
//

#import "Player.h"

@implementation Player

- (id)init
{
    self = [self initWithInt:5000];
    return self;
}

- (id)initWithInt:(int)initialScore
{
    self = [super init];
    if (self != nil) {
        // custom code
        _score = initialScore;
        
        // open a connection to the database
        
    }
    return self;
}

- (void)dealloc
{
    // close the connection to the database
}

@end
