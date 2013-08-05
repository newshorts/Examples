window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function(/* function */ callback, /* DOMElement */ element){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

function frameConverter(video,canvas) {

    // Set up our frame converter
    this.video = video;
    this.viewport = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    // color palettes
    this.palettes = new Array();
    this.palettes[0] = $('.palette0');
    this.palettes[1] = $('.palette1');
    this.palettes[2] = $('.palette2');
    this.palettes[3] = $('.palette3');
    // Create the frame-buffer canvas
    this.framebuffer = document.createElement("canvas");
    this.framebuffer.width = this.width;
    this.framebuffer.height = this.height;
    this.ctx = this.framebuffer.getContext("2d");
    // Default video effect is blur
    this.effect = JSManipulate.blur;
    // user imageFilterLibrary or a custom image filter
    this.useImageFilterLibrary = false;
    // set color thief
    this.colorThief = new ColorThief();
    // image
    this.image = document.getElementById('image');
    // This variable used to pass ourself to event call-backs
    var self = this;
    // Start rendering when the video is playing
    this.video.addEventListener("play", function() {
        render();
    }, false);

    // Change the image effect to be applied  
    this.setEffect = function(effect){
        if(effect in JSManipulate){
            this.effect = JSManipulate[effect];
        }
    }

    function render() {
        if (this.video.paused || this.video.ended) {
            return;
        }

        window.webkitRequestAnimationFrame(render);
        self.renderFrame();
    }

    // Compute and display the next frame 
    this.renderFrame = function() {

        if(this.useImageFilterLibrary) {
            // Acquire a video frame from the video element
            this.ctx.drawImage(this.video, 0, 0, this.video.videoWidth,
                    this.video.videoHeight,0,0,this.width, this.height);
            var data = this.ctx.getImageData(0, 0, this.width, this.height);
            // Apply image effect
            this.effect.filter(data,this.effect.defaultValues);
            // Render to viewport
            this.viewport.putImageData(data, 0, 0);
            return;
        }

        if(!this.useImageFilterLibrary) {

            var palette = this.colorThief.getPalette(this.video, 4);
            console.log(palette)
            for(var i = 0; i < palette.length; i++) {
                this.palettes[i].css({
                    'background-color': 'rgb('+palette[i][0]+', '+palette[i][1]+', '+palette[i][2]+')'
                });
                
                // TODO - figure out how to place the color in the sketch
//                if(i = 2) {
//                    RGB1 = palette[i][0];
//                    RGB2 = palette[i][1];
//                    RGB3 = palette[i][2];
//                }
                
            }


            return palette;
        }

    };

};