var canvasDiv = document.getElementById('particle-canvas');
var options = {
  particleColor: '#FFAC22',
  background: '#ffffff',
  height: '300px',
  interactive: true,
  speed: 'medium',
  density: 'high'
};
var particleCanvas = new ParticleNetwork(canvasDiv, options);
