/*
Name: 			RealEstate
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	9.9.0
*/

'use strict';

/*
Header
*/

// Search Properties
var $headerWrapper = $('#headerSearchProperties'),
	$window = $(window);

$headerWrapper.on('click', function() {
	if ($window.width() > 992) {
		$headerWrapper.addClass('open');
	}
});

$(document).mouseup(function(e) {
	if (!$headerWrapper.is(e.target) && $headerWrapper.has(e.target).length === 0) {
		$headerWrapper.removeClass('open');
	}
});

$('#propertiesFormHeader').validate({
	onkeyup: false,
	onclick: false,
	onfocusout: false,
	errorPlacement: function(error, element) {
		if (element.attr('type') == 'radio' || element.attr('type') == 'checkbox') {
			error.appendTo(element.parent().parent());
		} else {
			error.insertAfter(element);
		}
	}
});

// Thumb Gallery
var $thumbGalleryDetail1 = $('#thumbGalleryDetail'),
	$thumbGalleryThumbs1 = $('#thumbGalleryThumbs'),
	flag = false,
	duration = 300;

$thumbGalleryDetail1
	.owlCarousel({
		items: 1,
		margin: 10,
		nav: true,
		dots: false,
		loop: false,
		navText: [],
		rtl: ( $('html').attr('dir') == 'rtl' ) ? true : false
	})
	.on('changed.owl.carousel', function(e) {
		if (!flag) {
			flag = true;
			$thumbGalleryThumbs1.trigger('to.owl.carousel', [e.item.index-1, duration, true]);
			flag = false;
		}
	});

$thumbGalleryThumbs1
	.owlCarousel({
		margin: 15,
		items: 4,
		nav: false,
		center: false,
		dots: false,
		rtl: ( $('html').attr('dir') == 'rtl' ) ? true : false
	})
	.on('click', '.owl-item', function() {
		$thumbGalleryDetail1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
	})
	.on('changed.owl.carousel', function(e) {
		if (!flag) {
			flag = true;
			$thumbGalleryDetail1.trigger('to.owl.carousel', [e.item.index, duration, true]);
			flag = false;
		}
	});
