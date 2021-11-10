<template>
    <div class="view_Weather">
        <!-- {{weatherData.wea}}/{{weatherData.win}} -->
        <div class="weather_box" id="weather_box2"></div>
    </div>
</template>

<script setup>
import sun_cen from '../Weather/imgs/sun_cen.png'
// import man from './man'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {getWeather} from "@/api/index.js"
import {toRefs,reactive,onMounted} from 'vue'
            var loader = new GLTFLoader();
			var camera, scene, renderer, dirLight, dirLightHeper, hemiLight, hemiLightHelper, pont,mixer2;
			var sunMi = null
			var mixers = [];
			var mixers2 = [];

            var mesh  = null
			var model  = null  // man
			var stats;
            var direction = 0
			var vertexShader =`			varying vec3 vWorldPosition;

void main() {

	vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
	vWorldPosition = worldPosition.xyz;

	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}`
            var fragmentShader = `			uniform vec3 topColor;
			uniform vec3 bottomColor;
			uniform float offset;
			uniform float exponent;

			varying vec3 vWorldPosition;

			void main() {

				float h = normalize( vWorldPosition + offset ).y;
				gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );

			}`
			var clock = new THREE.Clock();

			function init() {

				var container = document.getElementById( 'weather_box2' );

				camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 5000 );
				camera.position.set( 0, 0, 250 );

				scene = new THREE.Scene();
				scene.background = new THREE.Color().setHSL( 0.2, 0, 1 );
				scene.fog = new THREE.Fog( scene.background, 1, 5000 );

				// LIGHTS

				hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
				hemiLight.color.setHSL( 0.6, 1, 0.6 );
				hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
				hemiLight.position.set( 0, 50, 0 );
				scene.add( hemiLight );

				// hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
				// scene.add( hemiLightHelper );


				dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
				dirLight.color.setHSL( 0.1, 1, 0.95 );
				dirLight.position.set( - 1, 75, 1 );
				dirLight.position.multiplyScalar( 30 );
				scene.add( dirLight );

				dirLight.castShadow = true;

				dirLight.shadow.mapSize.width = 4048;
				dirLight.shadow.mapSize.height = 3048;

				var d = 100;

				dirLight.shadow.camera.left = - d;
				dirLight.shadow.camera.right = d;
				dirLight.shadow.camera.top = d;
				dirLight.shadow.camera.bottom = - d;

				dirLight.shadow.camera.far = 3500;
				dirLight.shadow.bias = - 0.0001;

				dirLightHeper = new THREE.DirectionalLightHelper( dirLight, 10 );
				scene.add( dirLightHeper );

				// GROUND

				var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
				var groundMat = new THREE.MeshLambertMaterial( { color: 0xffffff } );
				groundMat.color.setHSL( 0.095, 1, 0.75 );

				var ground = new THREE.Mesh( groundGeo, groundMat );
				ground.position.y = - 33;
				ground.rotation.x = - Math.PI / 2;
				ground.receiveShadow = true;
				scene.add( ground );

				// SKYDOME

				var uniforms = {
					"topColor": { value: new THREE.Color( 0x0077ff ) },
					"bottomColor": { value: new THREE.Color( 0xffffff ) },
					"offset": { value: 33 },
					"exponent": { value: 0.6 }
				};
				uniforms[ "topColor" ].value.copy( hemiLight.color );

				scene.fog.color.copy( uniforms[ "bottomColor" ].value );

				var skyGeo = new THREE.SphereBufferGeometry( 4000, 32, 15 );
				var skyMat = new THREE.ShaderMaterial( {
					uniforms: uniforms,
					vertexShader: vertexShader,
					fragmentShader: fragmentShader,
					side: THREE.BackSide
				} );

				var sky = new THREE.Mesh( skyGeo, skyMat );
				scene.add( sky );

                crane()
				// RENDERER
				Man()
				sun()
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );
				renderer.outputEncoding = THREE.sRGBEncoding;
				renderer.shadowMap.enabled = true;
				// STATS

				// stats = new Stats();
				// container.appendChild( stats.dom );

				//

				window.addEventListener( 'resize', onWindowResize, false );


			}

			// 白鹤
            function crane(){
				// MODEL

				

				loader.load( 'models/Flamingo.glb', function ( gltf ) {

					mesh = gltf.scene.children[ 0 ];

					var s = 0.15;
					mesh.scale.set( s, s,s);
					mesh.position.y = 40;
                    mesh.position.x = 145
					mesh.rotation.y = - 1;

					mesh.castShadow = true;
					mesh.receiveShadow = true;

					scene.add( mesh );
					var mixer = new THREE.AnimationMixer( mesh );
					mixer.clipAction( gltf.animations[ 0 ] ).setDuration( 1 ).play();
					mixers.push( mixer );

				} );
			}

            function Man(){
				loader.load( 'models/Xbot.glb', function ( gltf ) {

					model = gltf.scene.children[ 0 ];
					console.log(model)
				    var a = .2;
					model.scale.set( a, a,a);
					model.position.y = -33;
                    model.position.x = 0
					// model.position.z = 0
					// model.rotation.y = - 1;
					model.traverse( function ( object ) {

						if ( object.isMesh ) object.castShadow = true;

					} );
					// model.castShadow = true;
					// model.receiveShadow = true;
					scene.add( model );


					// model.traverse( function ( object ) {

					// 	if ( object.isMesh ) object.castShadow = true;

					// } );

					mixer2 = gltf.animations;
					mixer2 = new THREE.AnimationMixer( model );
					console.log(gltf)
                    mixer2.clipAction( gltf.animations[ 1 ] ).setDuration( 1 ).play();
					mixers.push( mixer2 );
					// numAnimations = animations.length;

					// for ( let i = 0; i !== numAnimations; ++ i ) {

					// 	let clip = animations[ i ];
					// 	const name = clip.name;

					// 	if ( baseActions[ name ] ) {

					// 		const action = mixer2.clipAction( clip );
					// 		activateAction( action );
					// 		baseActions[ name ].action = action;
					// 		allActions.push( action );

					// 	} else if ( additiveActions[ name ] ) {

					// 		// Make the clip additive and remove the reference frame

					// 		THREE.AnimationUtils.makeClipAdditive( clip );

					// 		if ( clip.name.endsWith( '_pose' ) ) {

					// 			clip = THREE.AnimationUtils.subclip( clip, clip.name, 2, 3, 30 );

					// 		}

					// 		const action = mixer2.clipAction( clip );
					// 		activateAction( action );
					// 		additiveActions[ name ].action = action;
					// 		allActions.push( action );

					// 	}

					// }
				} );
			}
             
			function sun(){
				let sunimg = new THREE.TextureLoader().load(sun_cen)
				  let sun_m = new THREE.MeshBasicMaterial({map:sunimg,side: THREE.DoubleSide,
                                depthTest: false,
                                transparent: true,
                                })
				let sunJ = new THREE.PlaneGeometry(48.1,49.6)
				sunMi = new THREE.Mesh(sunJ,sun_m)
				// sunMi.rotation.z = 1.5
				// sunMi.rotation.y = 0
				// scene.add(sunMi)

				let geometry = new THREE.SphereGeometry(5,10,10);
                let material = new THREE.MeshLambertMaterial({color: 0xFFCC00});
                let mesh = new THREE.Mesh(geometry,material);
                scene.add(mesh)
			} 


			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();
				// stats.update();

			}

			function render() {

				var delta = clock.getDelta();

				for ( var i = 0; i < mixers.length; i ++ ) {

					mixers[ i ].update( delta );

				}

				// for ( var i = 0; i < mixers2.length; i ++ ) {

				// 	mixers2[ i ].update( delta );

				// }
                if(mesh){
                    // mesh.position.x -=delta*9
                    if(mesh.position.x>=window.innerWidth/2*0.15){
                        // mesh.position.x -=delta*20
                        direction = -delta*9
                        mesh.rotation.y = -1
                    }else if(mesh.position.x<=-window.innerWidth/2*0.15){
                        // mesh.position.x +=delta*20
                        direction = delta*9
                        mesh.rotation.y = 1
                        
                    }
                    mesh.position.x = mesh.position.x+ direction
                    // console.log(mesh.position.x)
                }
                // console.log(mesh)
				renderer.render( scene, camera );

			}
    onMounted(() => {
        	init();
			// console.log(man)
			animate();
    })
</script>

<style lang="scss" scoped>
.view_Weather{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    // background-color: aqua;
    // opacity: .6;
    z-index: 4;
    .weather_box{
        width: 100%;
        height: 100%;
    }
}
</style>