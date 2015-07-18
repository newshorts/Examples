//
//  ViewController.m
//  localSiteInWebviewCommunication
//
//  Created by Mike Newell on 7/17/15.
//  Copyright (c) 2015 Mike Newell. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

@synthesize webView, resourcePath;

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
    [webView setDelegate:self];
    
    resourcePath = [[NSBundle mainBundle] pathForResource:@"index" ofType:@"html" inDirectory:@"www"];
    NSURL *url = [NSURL URLWithString:resourcePath];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [webView loadRequest:request];
    
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


- (BOOL) webView:(UIWebView*)webView shouldStartLoadWithRequest:(NSURLRequest*)request navigationType:(UIWebViewNavigationType)navigationType
{
    NSURL *URL = [request URL];
    if ([[URL scheme] isEqualToString:@"mike"]) {
        // parse the rest of the URL object and execute functions
        NSLog(@"received url with scheme: %@", [URL scheme]);
    }
    return YES;
}

// webview finished loading
- (void) webViewDidFinishLoad:(UIWebView *)__webView
{
    //Execute javascript method or pure javascript if needed
    [webView stringByEvaluatingJavaScriptFromString:@"testObjectiveCMethod();"];
}

@end
