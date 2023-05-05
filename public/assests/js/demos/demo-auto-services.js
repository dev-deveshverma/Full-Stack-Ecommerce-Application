/*
Name: 			Auto Services
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	9.9.0
*/

(function( $ ) {

	'use strict';

	/*
	* Datepicker
	*/

	// Fix datepicker issue when using body with margin (notice top bar)
	var datepicker = $.fn.datepicker;
	$.fn.datepicker = function () {
        var result = datepicker.apply(this, arguments);

        this.on('show', function (e) {
            var $target = $(this),
                $picker = $target.data('datepicker').picker,
                top;

            if ($picker.hasClass('datepicker-orient-top')) {
                top = $target.offset().top - $picker.outerHeight() - parseInt($picker.css('marginTop'));
            } else {
                top = $target.offset().top + $target.outerHeight() + parseInt($picker.css('marginTop'));
            }

            $picker.offset({top: top});
        });

        return result;
    }

    // Initialize Datepickers on the page
	$('.custom-datepicker').each(function(){
		$(this).datepicker();
	});

	/*
	* Timepicker
	*/
	$('.custom-timepicker').each(function(){
		$(this).timepicker({
			disableMousewheel: true,
			icons: {
				up: 'fas fa-chevron-up',
				down: 'fas fa-chevron-down'
			}
		});
	});

}).apply( this, [ jQuery ]);