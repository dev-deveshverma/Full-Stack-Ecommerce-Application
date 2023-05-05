/*
Name: 			Elements - Lightboxes - Examples
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	9.9.0
*/

(function( $ ) {

	'use strict';

	/*
	Popup with video or map
	*/
	theme.fn.execOnceTroughEvent( $('.popup-youtube, .popup-vimeo, .popup-gmaps'), 'mouseover.trigger.iframe.lightbox', function(){
		$(this).magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false
		});
	});

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

	theme.fn.execOnceTroughEvent( $('.popup-with-move-anim'), 'mouseover.trigger.slide.lightbox', function(){
		$(this).magnificPopup({
			type: 'inline',

			fixedContentPos: false,
			fixedBgPos: true,

			overflowY: 'auto',

			closeBtnInside: true,
			preloader: false,

			midClick: true,
			removalDelay: 300,
			mainClass: 'my-mfp-slide-bottom'
		});
	});

	/*
	Form
	*/
	theme.fn.execOnceTroughEvent( $('.popup-with-form'), 'mouseover.trigger.form.lightbox', function(){
		$(this).magnificPopup({
			type: 'inline',
			preloader: false,
			focus: '#name',
			callbacks: {
				open: function() {
					$('html').addClass('lightbox-opened');
				},
				close: function() {
					$('html').removeClass('lightbox-opened');
				}
			}
		});
	});

	/*
	Ajax
	*/
	theme.fn.execOnceTroughEvent( $('.simple-ajax-popup'), 'mouseover.trigger.ajax.lightbox', function(){
		$(this).magnificPopup({
			type: 'ajax',
			callbacks: {
				open: function() {
					$('html').addClass('lightbox-opened');
				},
				close: function() {
					$('html').removeClass('lightbox-opened');
				}
			}
		});
	});

}).apply( this, [ jQuery ]);