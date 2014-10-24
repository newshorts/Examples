/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Demo = function(c) {
    
    // public
//    this.cameraRig;
    this.dae;
    
    // private
    var _cardboard = c || new Cardboard(),
        cameraRig,
        self = this;
    
    /**
     * Set the scene with threejs
     * @returns {undefined}
     */
    var makeRig = function () {
        THREE.Object3D.call(self);
        cameraRig = new THREE.Object3D();
        cameraRig.add(_cardboard.camera);
        _cardboard.scene.add(cameraRig);
    };
    
    /**
     * complete the scene
     * @returns {undefined}
     */
    var complete = function() {
        var ambientLight = new THREE.AmbientLight(0x333333);
        cameraRig.add(ambientLight);

        _cardboard.camera.position.z = 0.01;
        _cardboard.controls.object = cameraRig;
        _cardboard.controls.object.rotation.reorder('YXZ');
    };
    
    /**
     * Load a simple demo model from an external source
     * @returns {undefined}
     */
    var loadDemoModel = function() {
        var loader = new THREE.ColladaLoader();
        loader.options.convertUpAxis = true;
        loader.load( 'octopusshoe.dae', function colladaReady( collada ) {
            var dae = collada.scene;
            dae.scale.x = dae.scale.y = dae.scale.z = 3;
            dae.children[2].children[0].material = new THREE.MeshLambertMaterial( { color:  0xf1341a, ambient: 0xf1341a})
            _cardboard.scene.add(dae)
            self.dae = dae;
        });
    };
    
    /**
     * Load another model and render it "x" number of times in different positions
     * @param {int} numModels - the number of models to add to the scene
     * @returns {undefined}
     */
    var loadDemoModels = function(numModels) {
        
        var numModels = numModels || 20;
        
        var loader2 = new THREE.ColladaLoader();
        loader2.options.convertUpAxis = true;
        loader2.load( 'asics-lowpoly.dae', function colladaReady( collada ) {

            var dae2 = collada.scene;

            var material2 = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                shininess: 40,
                map: THREE.ImageUtils.loadTexture('map.jpg')
            });
            dae2.children[2].children[0].material=material2;

            for (var i = 0; i < numModels; i++) {
                var mesh = new THREE.Mesh( dae2.children[2].children[0].geometry, material2 );
                mesh.scale.x = mesh.scale.y = mesh.scale.z = 3;
                mesh.position.set((Math.random()-.5)*10,(Math.random()-.5)*10,(Math.random()-.5)*10)
                mesh.rotation.set(10*Math.random(),10*Math.random(),10*Math.random())
                _cardboard.scene.add(mesh)
            };
            
            self.dae = dae2;

        } );
    };
    
    /**
     * Add a box around the models with a pretty scene
     * @returns {undefined}
     */
    var addSkyBox = function() {
        var skyBoxTexture = THREE.ImageUtils.loadTextureCube([
            'textures/skybox_grey/skybox_px.jpg', // x-axis
            'textures/skybox_grey/skybox_nx.jpg',
            'textures/skybox_grey/skybox_py.jpg', // y-axis
            'textures/skybox_grey/skybox_ny.jpg',
            'textures/skybox_grey/skybox_pz.jpg', // z-axis
            'textures/skybox_grey/skybox_nz.jpg'
        ]);
        
        var skyBoxShader = THREE.ShaderLib['cube'];
        skyBoxShader.uniforms['tCube'].value = skyBoxTexture;

        var skyBoxMaterial = new THREE.ShaderMaterial({
            fragmentShader: skyBoxShader.fragmentShader,
            vertexShader: skyBoxShader.vertexShader,
            uniforms: skyBoxShader.uniforms,
            depthWrite: false,
            side: THREE.BackSide
        });

        var skyBox = new THREE.Mesh(
            new THREE.BoxGeometry(20, 20, 20),
            skyBoxMaterial
        );

        _cardboard.scene.add(skyBox);
    };
    
    /**
     * Add extra lighting to the scene
     * @returns {undefined}
     */
    var addExtraLighting = function() {
        
        var keyLight = new THREE.DirectionalLight(0xffffff, 0.1);
        keyLight.position.set(5, 10, 10);
        var fillLight = new THREE.DirectionalLight(0xffffff, 0.1);
        fillLight.position.set(-10, -22, 10);
        var backLight = new THREE.DirectionalLight(0xffffff, 0.9);
        backLight.position.set(5, -5, -9);

        cameraRig.add(keyLight);
        cameraRig.add(fillLight);
        cameraRig.add(backLight);
    };
    
    // public
    this.init = function() {
        makeRig();
        complete();
    };
    
    this.initWithModel = function() {
        makeRig();
        loadDemoModel();
        complete();
    };
    
    this.initWithBoxAndLighting = function(model) {
        var model = model || false;
        makeRig();
        if(model) {
            loadDemoModel();
        }
        addSkyBox();
        addExtraLighting();
        complete();
    };
    
    this.initAllThePills = function() {
        makeRig();
        loadDemoModel();
        loadDemoModels();
        addSkyBox();
        addExtraLighting();
        complete();
    };
    
    /**
     * 
     * @param {type} filePath - the filename + path
     * @param {type} color - the color of the material
     * @param {type} scale - scale the object
     * @returns {undefined}
     */
    this.loadModel = function(filePath, color, scale) {
        
        var scale = scale || {
            x: 3,
            y: 3,
            z: 3
        };
        
        var color = color || 0xf1341a;
        
        var loader = new THREE.ColladaLoader();
        loader.options.convertUpAxis = true;
        loader.load( filePath, function colladaReady( collada ) {
            var dae = collada.scene;
            dae.scale.x = scale.x;
            dae.scale.y = scale.y;
            dae.scale.z = scale.z;
//            dae.children[2].children[0].material = new THREE.MeshLambertMaterial( { color:  color, ambient: 0xf1341a})
            _cardboard.scene.add(dae)
            self.dae = dae;
            var texture = THREE.ImageUtils.loadTexture('textures/gt500/Interior.jpg');
            dae.children[0].children[0].material = new THREE.MeshLambertMaterial({map:texture});
        });
        
    }
    
    /**
     * 
     * @returns {undefined}
     */
    this.addCustomBox = function(path) {
        
        var path = path || 'textures/skybox_grey/skybox_%%.jpg';
        
        var skyBoxTexture = THREE.ImageUtils.loadTextureCube([
            path.replace('%%', 'px'),
            path.replace('%%', 'nx'),
            path.replace('%%', 'py'),
            path.replace('%%', 'ny'),
            path.replace('%%', 'pz'),
            path.replace('%%', 'nz')
        ]);
        
        var skyBoxShader = THREE.ShaderLib['cube'];
        skyBoxShader.uniforms['tCube'].value = skyBoxTexture;

        var skyBoxMaterial = new THREE.ShaderMaterial({
            fragmentShader: skyBoxShader.fragmentShader,
            vertexShader: skyBoxShader.vertexShader,
            uniforms: skyBoxShader.uniforms,
            depthWrite: false,
            side: THREE.BackSide
        });

        var skyBox = new THREE.Mesh(
            new THREE.BoxGeometry(20, 20, 20),
            skyBoxMaterial
        );

        _cardboard.scene.add(skyBox);
    };
    
    /**
     * Add
     * @returns {undefined}
     */
    this.addCustomSphere = function(path) {
        var geometry = new THREE.SphereGeometry( 50, 32, 32 );
        var texture = new THREE.ImageUtils.loadTexture(path);
        var material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: texture
        });
        
        // make it doublesided so we can see it from the inside
        material.side = THREE.DoubleSide;
        var world = new THREE.Mesh(geometry, material);
        world.rotation.y = 4;
        
        _cardboard.scene.add( world );
    };
    
    /**
     * Add video sphere to the scene
     * @returns {obj} with containing video, videoImage, videoImageContext, videoTexture
     */
    this.addCustomVideoSphere = function(path, width, height) {
        
        var video, videoImage, videoImageContext, videoTexture;
        
        video = document.createElement( 'video' );
        video.src = path;
        video.load();
        video.play();
        
        // for mobile
        video.addEventListener('playing', function(evt) {
            alert('playing')
        }, false);
        
        videoImage = document.createElement( 'canvas' );
        videoImage.width = width;
        videoImage.height = height;

        videoImageContext = videoImage.getContext( '2d' );
        videoImageContext.fillStyle = '#000000';
        videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

        videoTexture = new THREE.Texture( videoImage );
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;

        var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true, side:THREE.DoubleSide } );
        var movieGeometry = new THREE.SphereGeometry( 50, 32, 32 );
        var movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );
        movieScreen.position.set(0,0,-25);
        _cardboard.scene.add(movieScreen);
        
        window.addEventListener('touchstart', function(evt) {
//            alert('touched')
            video.play();
        }, false);
        
        return {
            video: video,
            videoImage: videoImage,
            videoImageContext: videoImageContext,
            videoTexture: videoTexture
        };
        
    };
    
    this.getCameraRig = function() {
        return cameraRig;
    }
    
};


    