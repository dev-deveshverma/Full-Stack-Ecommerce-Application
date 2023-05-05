/*
Name: 			Law Firm 2
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	9.9.0
*/

(function( $ ) {

	'use strict';

	/*
	* Custom See More Overlay
	*/
	$('.custom-seemore-overlay-button').on('click', function(e){
		e.preventDefault();

		var $this    = $(this),
			$wrapper = $this.closest('.custom-seemore-overlay');

		$wrapper.addClass('active');

		setTimeout(function(){
			$this.closest('.custom-seemore-overlay').animate({
				'max-height': $wrapper[0].scrollHeight
			}, function(){
				$this.remove();
				$wrapper.closest('.custom-seemore-overlay').css('max-height', 'none');
			});
		}, 200);
	});

}).apply( this, [ jQuery ]);