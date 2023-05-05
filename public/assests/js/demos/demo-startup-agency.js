/*
Name: 			Startup Agency
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	9.9.0
*/

(function( $ ) {

	'use strict';

	/*
    SVG Morphing
    */
    if( $('#st0_start').get(0) ) {
	    var shape1 = KUTE.fromTo('#st0_start', {
			path: '#st0_start' 
		}, { 
			path: '#st0_end' 
		}, {
			duration: 10000,
			easing	: 'easingQuadraticInOut',
			repeat: 20,
			repeatDelay: 1000,
			yoyo: true
		}).start();
	}

	if( $('#st1_start').get(0) ) {
	    var shape1 = KUTE.fromTo('#st1_start', {
			path: '#st1_start' 
		}, { 
			path: '#st1_end' 
		}, {
			duration: 10000,
			easing	: 'easingQuadraticInOut',
			repeat: 20,
			repeatDelay: 1000,
			yoyo: true
		}).start();
	}

	if( $('#st2_start').get(0) ) {
	    var shape1 = KUTE.fromTo('#st2_start', {
			path: '#st2_start' 
		}, { 
			path: '#st2_end' 
		}, {
			duration: 10000,
			easing	: 'easingQuadraticInOut',
			repeat: 20,
			repeatDelay: 1000,
			yoyo: true
		}).start();
	}

	if( $('#st3_start').get(0) ) {
	    var shape1 = KUTE.fromTo('#st3_start', {
			path: '#st3_start' 
		}, { 
			path: '#st3_end' 
		}, {
			duration: 10000,
			easing	: 'easingQuadraticInOut',
			repeat: 20,
			repeatDelay: 1000,
			yoyo: true
		}).start();
	}

	/*
	* SVG Aspect Ratio
	*/
	function aspectRatioSVG() {
		if( $(window).width() < 2000 ) {
			$('svg[preserveAspectRatio]').each(function(){
				$(this).attr('preserveAspectRatio', 'xMinYMin');
			});
		} else {
			$('svg[preserveAspectRatio]').each(function(){
				$(this).attr('preserveAspectRatio', 'none');
			});
		}
	}

	aspectRatioSVG();
	$(window).on('resize', function(){
		aspectRatioSVG();
	});

}).apply( this, [ jQuery ]);