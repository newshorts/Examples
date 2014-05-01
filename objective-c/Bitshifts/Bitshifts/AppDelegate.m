//
//  AppDelegate.m
//  Bitshifts
//
//  Created by Mike Newell on 4/10/14.
//  Copyright (c) 2014 Mike Newell. All rights reserved.
//

#import "AppDelegate.h"

#define R8G8B8_TO_R3G2GB3(r,g,b) (((unsigned char)(r>>5))<<5) | (((unsigned char)(g>>6))<<3) | ((unsigned char)(b>>6))

@implementation AppDelegate

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification
{
    int r = 255;
    int g = 255;
    int b = 255;
    
    // simple example
    int val = 255;
    NSLog(@"shifting %i to the left", val);
    val = val << 5;
    NSLog(@"%i", val);
    NSLog(@"shifting %i to the right", val);
    val = val >> 5;
    NSLog(@"%i", val);
    
    // doesnt reverse
    int val2 = 255;
    NSLog(@"shifting %i to the right with a char", val2);
    val2 = ((unsigned char)(val2 >> 5) << 5);
    NSLog(@"%i", val2);
    NSLog(@"shifting %i to the left with a char", val2);
    val2 = ((unsigned char)(val2 << 5) >> 5);
    NSLog(@"%i", val2);
    
    // too large, would need 32 bit int to send
    int blueMask = 0xFF0000, greenMask = 0xFF00, redMask = 0xFF;
    int bgrValue = (b << 16) + (g << 8) + r;
    NSLog(@"b: %i", b << 16);
    NSLog(@"g: %i", g << 8);
    NSLog(@"bgrValue = %i", bgrValue);
    NSLog(@"blue: %i", ((bgrValue & blueMask) >> 16));
    NSLog(@"red: %i", ((bgrValue & redMask)));
    NSLog(@"green: %i", ((bgrValue & greenMask) >> 8));
    
    // color calculation
    int color = (r*6/256)*36 + (g*6/256)*6 + (b*6/256);
    NSLog(@"color: %i", color);
    
    //my own color shift
    int kolor = ((b&255 & 0xC0)+((g&255 & 0xE0) >> 2)+((r & 0xE0) >> 5))&0xFF;
    NSLog(@"kolor: %i", kolor);
    
    // string
    char str[] = "255,15,67";
    
    const char *p;
    for (p = strtok(str, ","); p; p = strtok(NULL, ",")) {
        NSLog(@"%s", p);
    }
    

}


@end
