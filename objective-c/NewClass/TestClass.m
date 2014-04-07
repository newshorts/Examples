//
//  TestClass.m
//  NewClass
//
//  Created by Mike Newell on 4/5/14.
//  Copyright (c) 2014 Mike Newell. All rights reserved.
//

#import "TestClass.h"

@implementation TestClass
{
    int somePrivateInt;
}

- (void) someMethod
{
    NSLog(@"This works");
}

- (int) timesTen:(int)num
{
    return num * 10;
}

- (int) addNumber:(int)a toNumber:(int)b
{
    return a + b;
}

- (NSString *) createMessage:(NSString *)str
{
    return [NSString stringWithFormat:@" This is the message: %@", str];
}

@end
