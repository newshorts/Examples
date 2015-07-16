/*jslint */
/*global AdobeEdge: false, window: false, document: false, console:false, alert: false */
(function (compId) {

    "use strict";
    var im='images/',
        aud='media/',
        vid='media/',
        js='js/',
        fonts = {
        },
        opts = {
            'gAudioPreloadPreference': 'auto',
            'gVideoPreloadPreference': 'auto'
        },
        resources = [
        ],
        scripts = [
        ],
        symbols = {
            "stage": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'Text',
                            type: 'text',
                            rect: ['-280px', '128px', 'auto', 'auto', 'auto', 'auto'],
                            text: "Hello World",
                            font: ['Arial, Helvetica, sans-serif', [46, "px"], "rgba(255,255,255,1.00)", "normal", "none", "", "break-word", "nowrap"],
                            transform: [[],['360']]
                        },
                        {
                            id: 'microphone-grey2',
                            type: 'image',
                            rect: ['253px', '206px', '43px', '82px', 'auto', 'auto'],
                            cursor: 'pointer',
                            fill: ["rgba(0,0,0,0)",im+"microphone-grey.png",'0px','0px']
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: [undefined, undefined, '550px', '309px'],
                            overflow: 'hidden',
                            fill: ["rgba(0,0,0,1.00)"]
                        }
                    }
                },
                timeline: {
                    duration: 500,
                    autoPlay: true,
                    data: [
                        [
                            "eid10",
                            "left",
                            0,
                            500,
                            "linear",
                            "${Text}",
                            '-280px',
                            '156px'
                        ],
                        [
                            "eid12",
                            "rotateZ",
                            0,
                            500,
                            "linear",
                            "${Text}",
                            '360deg',
                            '0deg'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("demo_edgeActions.js");
})("EDGE-174933755");
