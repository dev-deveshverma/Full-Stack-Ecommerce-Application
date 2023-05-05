/*
Name: 			Elements - Carousels - Examples
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	9.9.0
*/

(function( $ ) {

	'use strict';

	/*
	Carousel
	*/
	$('#carousel').owlCarousel({
		loop: true,
		responsive: {
			0: {
				items: 1
			},
			479: {
				items: 1
			},
			768: {
				items: 2
			},
			979: {
				items: 3
			},
			1199: {
				items: 6
			}
		},
		navText: [],
		margin: 10,
		autoWidth: false,
		items: 6,
		rtl: ( $('html').attr('dir') == 'rtl' ) ? true : false
	});

	/*
	Videos
	*/
	$('#videos').owlCarousel({
		items:1,
		merge:true,
		loop:true,
		margin:10,
		video:true,
		lazyLoad:true,
		center:true,
		responsive:{
			480:{
				items:2
			},
			600:{
				items:4
			}
		},
		rtl: ( $('html').attr('dir') == 'rtl' ) ? true : false
	});

	/*
	Horizontal Scroller Section
	*/
	if( $('.horizontal-scroller-item').length ) {
		if (typeof gsap !== 'undefined') {

			// Copy Original HTML to clone on Resize.
			var originalScrollHTML = $('.horizontal-scroller').html();

			// Generate Scroller
			var generateScroller = function() {

				let images = gsap.utils.toArray('.horizontal-scroller-item');

				gsap.to(images, {
					xPercent: -100 * (images.length - ( $(window).width() > 991 ? 3 : 1 )),
					ease: 'none',
					scrollTrigger: {
						trigger: '.horizontal-scroller',
						pin: true,
						scrub: 1,
						snap: 1 / (images.length - 1),
						end: () => '+=' + document.querySelector('.horizontal-scroller-images').offsetWidth
					}
				});

			};

			// Resize Event removing and restarting
			$(window).afterResize(function() {

				setTimeout(function() {

					scrollerInitialized = false;

					let Alltrigger = ScrollTrigger.getAll();

					for (let i = 0; i < Alltrigger.length; i++) {
						Alltrigger[i].kill(true);
					}

					$('.horizontal-scroller-wrapper').empty().html('<section class="horizontal-scroller bg-dark">' + originalScrollHTML + '</section>');

					generateScroller();

				}, 500);

			});

			generateScroller();

		} else {

			theme.fn.showErrorMessage('Failed to Load File', 'Failed to load: GSAP - Include the following file(s): (vendor/gsap/gsap.min.js)');

		}
	}

}).apply( this, [ jQuery ]);