/*
Name:           Demo SEO 3
Written by:     Okler Themes - (http://www.okler.net)
Theme Version:  9.9.0
*/

(function( $ ) {
	
	'use strict';

	/*
	Mouse Hover Split
	*/
	const left = document.getElementById("side-left");

	const handleMove = e => {
	  left.style.width = `${e.clientX / window.innerWidth * 100}%`;
	}

	document.onmousemove = e => handleMove(e);

	document.ontouchmove = e => handleMove(e.touches[0]);

	$(window).on('load resize', function() {
		var height = $('.mouse-hover-split .side').height();
		$('.mouse-hover-split').css('min-height', height);
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
