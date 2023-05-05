/*
Name: 			SEO 2
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	9.9.0
*/

(function( $ ) {

	'use strict';

	/**
	 * Custom Simple Form Validation
	 *
	 */
	$('.custom-form-simple-validation').each(function(){
		$(this).validate({
			onkeyup: false,
			onclick: false,
			onfocusout: false,
			errorPlacement: function(error, element) {
				if (element.attr('type') == 'radio' || element.attr('type') == 'checkbox') {
					error.appendTo(element.closest('.form-group'));
				} else {
					error.insertAfter(element);
				}
			}
		});
	});

}).apply( this, [ jQuery ]);