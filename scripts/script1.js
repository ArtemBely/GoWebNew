var site = site || {};
site.window = $(window);
site.document = $(document);
site.Width = site.window.width();
site.Height = site.window.height();

var Background = function() {

};

Background.headparticle = function() {

   if ( !Modernizr.webgl ) {
      alert('Your browser dosent support WebGL');
   }

   var camera, scene, renderer;
   var mouseX = 0, mouseY = 0;
   var p;

   var windowHalfX = site.Width / 2;
   var windowHalfY = site.Height / 2;

   Background.camera = new THREE.PerspectiveCamera( 35, site.Width / site.Height, 1, 2000 );
   Background.camera.position.z = 300;

   // scene
   Background.scene = new THREE.Scene();

   // texture
   var manager = new THREE.LoadingManager();
   manager.onProgress = function ( item, loaded, total ) {
      //console.log('webgl, twice??');
      //console.log( item, loaded, total );
   };


   // particles
   var p_geom = new THREE.Geometry();
   var p_material = new THREE.ParticleBasicMaterial({
      color: 0xFFAC22,
      size: 1.5
   });

   // model
   var loader = new THREE.OBJLoader( manager );
   loader.load( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/40480/head.obj', function ( object ) {

      object.traverse( function ( child ) {

         if ( child instanceof THREE.Mesh ) {

            // child.material.map = texture;

            var scale = 8;

            $(child.geometry.vertices).each(function() {
               p_geom.vertices.push(new THREE.Vector3(this.x * scale, this.y * scale, this.z * scale));
            })
         }
      });

      Background.scene.add(p)
   });

   p = new THREE.ParticleSystem(
      p_geom,
      p_material
   );

   Background.renderer = new THREE.WebGLRenderer({ alpha: true });
   Background.renderer.setSize( site.Width, site.Height );
   Background.renderer.setClearColor(0x000000, 0);

   $('.particlehead').append(Background.renderer.domElement);
   $('.particlehead').on('mousemove', onDocumentMouseMove);
   site.window.on('resize', onWindowResize);

   function onWindowResize() {
      windowHalfX = site.Width / 2;
      windowHalfY = site.Height / 2;
      //console.log(windowHalfX);

      Background.camera.aspect = site.Width / site.Height;
      Background.camera.updateProjectionMatrix();

      Background.renderer.setSize( site.Width, site.Height );
   }

   function onDocumentMouseMove( event ) {
      mouseX = ( event.clientX - windowHalfX ) / 2;
      mouseY = ( event.clientY - windowHalfY ) / 2;
   }

   Background.animate = function() {

      Background.ticker = TweenMax.ticker;
      Background.ticker.addEventListener("tick", Background.animate);

      render();
   }

   function render() {
      Background.camera.position.x += ( (-mouseX * .5) - Background.camera.position.x ) * .05;
      Background.camera.position.y += ( -(-mouseY * .5) - Background.camera.position.y ) * .05;

      Background.camera.lookAt( Background.scene.position );

      Background.renderer.render( Background.scene, Background.camera );
   }

   render();

   Background.animate();
};


Background.headparticle();

var w = c.width = window.innerWidth
	,	h = c.height = window.innerHeight
	, ctx = c.getContext( '2d' )
	,	particles = []
	,	dirs = [
		{ x: Math.cos( Math.PI * 2 / 6 ), y: Math.sin( Math.PI * 2 / 6 ) },
		{ x: Math.cos( Math.PI * 2 / 6 * 2 ), y: Math.sin( Math.PI * 2 / 6 * 2 ) },
		{ x: Math.cos( Math.PI * 2 / 6 * 3 ), y: Math.sin( Math.PI * 2 / 6 * 3 ) },
		{ x: Math.cos( Math.PI * 2 / 6 * 4 ), y: Math.sin( Math.PI * 2 / 6 * 4 ) },
		{ x: Math.cos( Math.PI * 2 / 6 * 5 ), y: Math.sin( Math.PI * 2 / 6 * 5 ) },
		{ x: Math.cos( Math.PI * 2 / 6 * 6 ), y: Math.sin( Math.PI * 2 / 6 * 6 ) },
	],
	len = 20;

var tick = 0;
function anim(){

	window.requestAnimationFrame( anim );

	tick += .1;

	ctx.shadowBlur = 0;
	ctx.globalCompositeOperation = 'source-over';
	ctx.fillStyle = 'rgba(0,0,0,.04)';
	ctx.fillRect( 0, 0, w, h );

	ctx.shadowBlur = 3;
	ctx.globalCompositeOperation = 'light';

	if( particles.length < 100 && Math.random() < .5 )
		particles.push({
			tick: tick,
			sx: w/2,
			sy: h/2,
			x: 0,
			y: 0,
			dir: ( Math.random() * 3 |0 ) * 2,
			askDir: false,
			time: 0
		});

	particles.map(function( particle ){
		if( particle.askDir ){
			particle.dir = Math.random() < .5 ?
				( particle.dir + 1 ) % 6 :
				( particle.dir + 5 ) % 6;
			particle.askDir = false;
		}

		++particle.time;

		var dir = dirs[particle.dir];
		particle.x += dir.x * 1.5;
		particle.y += dir.y * 1.5;

		if( particle.x*particle.x + particle.y*particle.y >= len*len ){
			particle.sx += dir.x * len;
			particle.sy += dir.y * len;

			particle.x = particle.y = 0;
			particle.askDir = true;

			if( Math.random() < .05 ){
				particle.sx = w/2;
				particle.sy = h/2;
				particle.dir = ( Math.random() * 3 |0 ) * 2;
				particle.askDir = false;
				particle.tick = tick;
			}
		}

		var color =  'hsla(37,100%,57%,.9)'.replace( 'hue', particle.tick );
		ctx.shadowColor = ctx.fillStyle = color;
		var x = particle.sx + particle.x
			,	y = particle.sy + particle.y
		ctx.fillRect( x, y, 2.5, 2.5 );

		for( var i = .5; i < Math.random(); i += .1 ){
			ctx.fillRect( x + ( Math.random() -.5 ) * 20, y + ( Math.random() - .5 ) * 20, 1.5, 1.5 );
		}
	})
}

ctx.fillStyle = '#111';
ctx.fillRect( 0, 0, w, h );
anim();

window.addEventListener( 'resize', function(){
	w = c.width = window.innerWidth;
	h = c.height = window.innerHeight;
	particles.length = 0;
	ctx.fillStyle = '#111';
	ctx.fillRect( 0, 0, w, h );
})
