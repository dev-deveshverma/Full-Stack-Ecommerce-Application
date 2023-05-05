/*
Name: 			Industry & Factory
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	9.9.0
*/

(function( $ ) {

	'use strict';

	/*
	* SVG Aspect Ratio
	*/
	function aspectRatioSVG() {
		if( $(window).width() < 2000 ) {
			$('svg[preserveAspectRatio]:not(.custom-svg-btn-background)').each(function(){
				$(this).attr('preserveAspectRatio', 'xMinYMin');
			});
		} else {
			$('svg[preserveAspectRatio]:not(.custom-svg-btn-background)').each(function(){
				$(this).attr('preserveAspectRatio', 'none');
			});
		}
	}

	aspectRatioSVG();
	$(window).on('resize', function(){
		aspectRatioSVG();
	});

	/*
	* Play Video
	*/
	var $videoBox = $('.custom-featured-box-with-video');

	$videoBox.find('.custom-trigger-play-video').on('click', function(e){
		e.preventDefault();

		var $this = $(this);

		// Show Loading Dots
		$this
			.css('height', $this.outerHeight())
			.html( '<div class="bounce-loader"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>' );

		setTimeout(function(){
			
			// Hide Video Poster
			$videoBox
				.find('.featured-box-background')
				.addClass('hide');

			// Hide Video Box Content
			$videoBox
				.find('.box-content')
				.addClass('hide');

			// Turn the video active
			$videoBox
				.find('.custom-featured-box-video')
				.addClass('active');

			// Play video
			setTimeout(function(){
				$videoBox
					.find('.custom-featured-box-video')
					.get(0)
					.play();
			}, 500);
		}, 1000);
	});

}).apply( this, [ jQuery ]);