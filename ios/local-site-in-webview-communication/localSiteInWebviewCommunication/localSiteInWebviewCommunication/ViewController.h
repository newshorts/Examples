//
//  ViewController.h
//  localSiteInWebviewCommunication
//
//  Created by Mike Newell on 7/17/15.
//  Copyright (c) 2015 Mike Newell. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ViewController : UIViewController <UIWebViewDelegate>

@property (weak, nonatomic) IBOutlet UIWebView *webView;
@property (weak, nonatomic) NSString *resourcePath;

- (BOOL)webView:(UIWebView*)webView shouldStartLoadWithRequest:(NSURLRequest*)request navigationType:(UIWebViewNavigationType)navigationType;

@end

