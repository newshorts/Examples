//
//  TestClass.h
//  NewClass
//
//  Created by Mike Newell on 4/5/14.
//  Copyright (c) 2014 Mike Newell. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface TestClass : NSObject

@property NSString *name;
@property NSDate *hireDate;
@property int employeeNum;

- (void) someMethod;
- (int) timesTen:(int)num;
- (int) addNumber:(int) a toNumber: (int) b;
- (NSString *) createMessage: (NSString *)str;

@end
