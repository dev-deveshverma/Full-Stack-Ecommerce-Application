/*
Name: 			Band
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	9.9.0
*/

(function( $ ) {

	'use strict';

    /*
    * Add "active" class to animate Custom Porto SVG Logo
    */
    $(window).on('load', function(){
        setTimeout(function(){
            $('.custom-porto-svg-logo').addClass('active');
        }, 1000);
    });

	/*
	* Scroll and Focus
	*/
	function scrollAndFocus($this, scrollTarget, focusTarget, scrollOffset, scrollAgain) {
		(function($) {

			$('body').addClass('scrolling');

			// if it's inside a header menu
			if( $($this).closest('#mainNav').length ) {
				$($this).parents('.collapse.show').collapse('hide');
			}

			$('html, body').animate({
				scrollTop: $(scrollTarget).offset().top - (scrollOffset ? scrollOffset : 0)
			}, 300, function() {
				$('body').removeClass('scrolling');

				setTimeout(function(){
					$(focusTarget).focus();
				}, 500);

				if( scrollAgain ) {
					$('html, body').animate({
						scrollTop: $(scrollTarget).offset().top - (scrollOffset ? scrollOffset : 0)
					});
				}
			});
		})(jQuery);
	}

	$('[data-scroll-and-focus]').on('click', function() {
		scrollAndFocus($(this), '#contact', '#name', 70, true);
	});

}).apply( this, [ jQuery ]);