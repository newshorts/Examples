/**
 * @author arodic / http://aleksandarrodic.com
 * @author Sann-Remy Chea / http://srchea.com/
 *
 * Audio texture
 */

/**
 * AudioTexture - loads a sound file and creates a THREE.Texture with fft data
 *
 * @param {String} url - sound file url
 * @constructor
 */

THREE.AudioTexture = function(url) {

  var scope = this;

  this.size = 16;
  this.smoothingTimeConstant = 0.9;
  this.fftSize = 1024;
  this.fftMax = 255;

  var _fftBuffer = [];
  this.fftBuffer = [];

  this.playing = false;

  this.canvas = document.createElement('canvas');
  this.canvas.width = this.canvas.height = this.size;

  // document.body.appendChild(this.canvas);
  // this.canvas.style.position = "fixed";
  // // this.canvas.style.background = "black";
  // this.canvas.style.zIndex = 1000;
  // this.canvas.style.width = "50%";
  // this.canvas.style.height = "50%";

  this.ctx2D = this.canvas.getContext('2d');

  var imageData = this.ctx2D.createImageData(this.size, this.size);
  this.texture = new THREE.Texture(imageData);

  var buffer;
  this.source = null;
  this.analyser = null;

  try {
    if (typeof webkitAudioContext === 'function') {
      this.ctxAudio = new webkitAudioContext();
    } else {
      this.ctxAudio = new AudioContext();
    }
  } catch (e) {
    console.error('WebAudio not supported');
  }

  var request = new XMLHttpRequest();
  request.responseType = 'arraybuffer';
  request.open('GET', url, true);
  request.send(null);

  this.onAudioUpdated = function() {};

  request.onload = function() {
    scope.ctxAudio.decodeAudioData(
      request.response,

      function(buffer) {
        if (!buffer) {
          console.error('Error decoding file data');
          return;
        }

        scope.analyser = scope.ctxAudio.createAnalyser();
        scope.analyser.smoothingTimeConstant = scope.smoothingTimeConstant;
        scope.analyser.fftSize = scope.fftSize;

        scope.source = scope.ctxAudio.createBufferSource();
        scope.source.buffer = buffer;
        scope.source.loop = true;

        scope.source.connect(scope.analyser);
        scope.analyser.connect(scope.ctxAudio.destination);

        scope.play();

      },
      function(error) {
        console.error('Decoding error:' + error);
      }
    );
  };

  this.analyze = function() {
    _fftBuffer = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(_fftBuffer);
    this.fftBuffer = _fftBuffer.subarray(0, this.fftMax);

    var a = 0;
    for (var i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = this.fftBuffer[a]; // r is equal to the band
      imageData.data[i + 1] = 0;
      imageData.data[i + 2] = 0;
      imageData.data[i + 3] = this.fftMax;
      a++;
    }

    this.texture.needsUpdate = true;

    this.ctx2D.putImageData(imageData, 0, 0);

    this.onAudioUpdated(this);

    if (this.playing) requestAnimationFrame(this.analyze.bind(this));
  };

  request.onerror = function() {
    console.error('buffer: XHR error');
  };

  this.play = function() {
    if (!this.playing && this.source) {
      this.playing = true;
      this.source.start(0);
      this.analyze();
    }
  };

  this.stop = function() {
    this.playing = false;
    this.source.stop(0);
  };

};