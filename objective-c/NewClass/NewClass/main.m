//
//  main.m
//  NewClass
//
//  Created by Mike Newell on 4/5/14.
//  Copyright (c) 2014 Mike Newell. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "TestClass.h"

int main(int argc, const char * argv[])
{

    @autoreleasepool {
        
        TestClass *stuff = [[TestClass alloc] init];
        
        [stuff someMethod];
        
        // change the value of property
        [stuff setName:@"Mike"];
        
        NSLog(@"the name is: %@", [stuff name]);
        
        NSLog(@"times ten of 5 is: %i", [stuff timesTen:5] );
        
        NSLog(@"add 5 to 4: %i", [stuff addNumber:5 toNumber:4]);
        
        NSLog([stuff createMessage:@"some message"]);
        
    }
    return 0;
}

