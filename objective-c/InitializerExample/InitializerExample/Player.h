//
//  Player.h
//  InitializerExample
//
//  Created by Mike Newell on 4/5/14.
//  Copyright (c) 2014 Mike Newell. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Player : NSObject

@property int score;

- (id)initWithInt:(int)initialScore;

@end
