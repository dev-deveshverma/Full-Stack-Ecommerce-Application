/*
Name:           Demo Business Consulting 4
Written by:     Okler Themes - (http://www.okler.net)
Theme Version:  9.9.0
*/


(function( $ ) {

	'use strict';

	// Particles 1
	particlesJS("particles-1", {
	  "particles": {
	    "number": {
	      "value": 30,
	      "density": {
	        "enable": true,
	        "value_area": 800
	      }
	    },
	    "color": {
	      "value": "#ffffff"
	    },
	    "shape": {
	      "type": "image",
	      "stroke": {
	        "width": 0,
	        "color": "#000000"
	      },
	      "polygon": {
	        "nb_sides": 5
	      },
	      "image": {
	        "src": "img/demos/business-consulting-4/generic/generic-7.png",
	        "width": 100,
	        "height": 100
	      }
	    },
	    "opacity": {
	      "value": 1,
	      "random": true,
	      "anim": {
	        "enable": true,
	        "speed": 1,
	        "opacity_min": 0,
	        "sync": false
	      }
	    },
	    "size": {
	      "value": 48.10236182596568,
	      "random": true,
	      "anim": {
	        "enable": false,
	        "speed": 4,
	        "size_min": 0.3,
	        "sync": false
	      }
	    },
	    "line_linked": {
	      "enable": false,
	      "distance": 150,
	      "color": "#ffffff",
	      "opacity": 0.4,
	      "width": 1
	    },
	    "move": {
	      "enable": true,
	      "speed": 1,
	      "direction": "none",
	      "random": true,
	      "straight": false,
	      "out_mode": "out",
	      "bounce": false,
	      "attract": {
	        "enable": false,
	        "rotateX": 600,
	        "rotateY": 600
	      }
	    }
	  },
	  "interactivity": {
	    "detect_on": "canvas",
	    "events": {
	      "onhover": {
	        "enable": true,
	        "mode": "bubble"
	      },
	      "onclick": {
	        "enable": true,
	        "mode": "repulse"
	      },
	      "resize": true
	    },
	    "modes": {
	      "grab": {
	        "distance": 400,
	        "line_linked": {
	          "opacity": 1
	        }
	      },
	      "bubble": {
	        "distance": 250,
	        "size": 0,
	        "duration": 2,
	        "opacity": 0,
	        "speed": 3
	      },
	      "repulse": {
	        "distance": 400,
	        "duration": 0.4
	      },
	      "push": {
	        "particles_nb": 4
	      },
	      "remove": {
	        "particles_nb": 2
	      }
	    }
	  },
	  "retina_detect": true
	});

}).apply( this, [ jQuery ]);