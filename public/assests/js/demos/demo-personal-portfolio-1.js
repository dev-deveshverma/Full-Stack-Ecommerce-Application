/*
Name:           Demo Personal Portfolio 1
Written by:     Okler Themes - (http://www.okler.net)
Theme Version:  9.9.0
*/

(function( $ ) {
	
	'use strict';

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
					xPercent: -100 * (images.length - 1),
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
					generateCircleExpand();

				}, 500);

			});

			/*
			Circle Expand
			*/
			var generateCircleExpand = function() {

				let section = document.getElementById('circleSection'),
				    dot = document.getElementById("circleDot");

				gsap.set(dot, {
				    width: "142vmax",
				    height: "142vmax",
				    xPercent: -50,
				    yPercent: -50,
				    top: "50%",
				    left: "50%"
				});

				let tl1 = gsap.timeline({
					    	scrollTrigger: {
						        trigger: section,
						        start: "-50%",
						        end: "0%",
								scrub: 2, 
						        invalidateOnRefresh: true,
						    },
						    defaults: {
						        ease: "none"
						    }
						});

				tl1
				    .fromTo(dot, {
				        	scale: 0
					    }, {
					        x: 0,
					        y: 0,
					        ease: "power3.in",
					        scale: 1
					    });

			}

			// Init GSAP Elements
			generateScroller();
			generateCircleExpand();


		} else {

			theme.fn.showErrorMessage('Failed to Load File', 'Failed to load: GSAP - Include the following file(s): (vendor/gsap/gsap.min.js)');

		}

		/*
		Spotlight Cursor Text - Credits: https://codepen.io/carolineartz/pen/rNaGQYo
		*/
		if( $('.spotlight-cursor-text').length ) {
			if (typeof gsap !== 'undefined') {

				document.body.addEventListener('mousemove', evt => {
					const mouseX = evt.clientX;
					const mouseY = evt.clientY;

					gsap.to('.shape', {
						x: mouseX,
						y: mouseY,
						stagger: -0.1
					});
				});

			} else {

				theme.fn.showErrorMessage('Failed to Load File', 'Failed to load: GSAP - Include the following file(s): (vendor/gsap/gsap.min.js)');

			}
		}

	}

}).apply( this, [ jQuery ]);
