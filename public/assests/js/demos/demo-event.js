/*
Name:           Event
Written by:     Okler Themes - (http://www.okler.net)
Theme Version:  9.9.0
*/

(function( $ ) {
	
	'use strict';

	/*
	Dialog with CSS animation
	*/
	theme.fn.execOnceTroughEvent( $('.popup-with-zoom-anim'), 'mouseover.trigger.zoom.lightbox', function(){
		$(this).magnificPopup({
			type: 'inline',

			fixedContentPos: false,
			fixedBgPos: true,

			overflowY: 'auto',

			closeBtnInside: true,
			preloader: false,

			midClick: true,
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in'
		});
	});

}).apply( this, [ jQuery ]);
