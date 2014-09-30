/**
 * @author arodic / http://aleksandarrodic.com
 *
 * Simple test shader
 */

THREE.MoleculeNetworkShader = {

	uniforms: {
		"tFft": { type: "t", value: null},
		"opacity": { type: "f", value: 1}
	},

	vertexShader: [

		"varying vec2 vUv;",

		"float rand(vec2 co){",
		"  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);",
		"}",

		"void main() {",
			"vUv = vec2(rand(uv), rand(uv.yx));",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
		"}"

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D tFft;",
		"uniform float opacity;",
		"varying vec2 vUv;",
		
		"void main() {",
			"float fft = texture2D(tFft, vUv).r / 3.0;",
			"if (fft < 0.1) discard;",
			"gl_FragColor = vec4( 1.,1.,1., fft * opacity );",
		"}"

	].join("\n")

};

THREE.MoleculeSheildShader = {

	uniforms: {
		"tFft": { type: "t", value: null },
		"opacity": { type: "f", value: 1}
	},

	vertexShader: [

		"varying vec2 vUv;",

		"float rand(vec2 co){",
		"    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);",
		"}",

		"void main() {",
			"vUv = vec2(rand(uv), rand(uv.yx));",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
		"}"

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D tFft;",
    "varying vec2 vUv;",
		
		"void main() {",
			"float fft = texture2D(tFft, vUv).r / 3.0;",
			"if (fft < 0.25) discard;",
			"gl_FragColor = vec4( 1.,1.,1., fft );",
		"}"

	].join("\n")

};