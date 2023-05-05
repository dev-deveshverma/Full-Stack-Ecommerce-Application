/*
Name: 			Elements - Animations - Examples
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	9.9.0
*/

(function( $ ) {

	'use strict';

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

	/*
	Scroll Rotate Up/Down
	*/
	if( $('.scroll-rotate').length ) {
		$('.scroll-rotate').each(function() {

			var elem = $(this);

			$(window).on('scroll', function() {
				elem.css('transform', 'translatex(-50%) translatey(-50%) rotate(' + window.scrollY * 0.25 + 'deg)');
				elem.css('top', (elem.height()/2) + 'px');
				elem.css('left', (elem.width()/2) + 'px');
			});

		});

		$(window).trigger('scroll');
	}

	/*
	GSAP Text Reveal
	*/
	if (typeof gsap !== 'undefined') {

		if( $('.gsap-text-wrapper').length ) {

			// Animation 1
			$('.gsap-text-wrapper[data-gsap-text-anim-1]').each(function() {

				var wrapper = $(this),
					text = wrapper.find('>:first-child')[0];

				wrapper.css('perspective', '100px');

				var tl1Options = $.extend(true, {}, {
						toggleActions: 'restart none none none',
						duration: 1.3,
						opacity: 0,
						rotationX: -90,
						transformOrigin: '50% 50% -100',
						stagger: .25,
						ease: 'expo.out'
					},
					theme.fn.getOptions(wrapper.data('plugin-options'))
				);

				var tl1 = gsap.timeline({
				    scrollTrigger: {
				        trigger: wrapper,
				        toggleActions: tl1Options.toggleActions
				    }
				});

				tl1.from(text, tl1Options);

			});

			// Animation 2
			$('.gsap-text-wrapper[data-gsap-text-anim-2]').each(function() {

				var wrapper = $(this),
					text = wrapper.find('>:first-child');

				var tl2 = gsap.timeline({
				    scrollTrigger: {
				        trigger: wrapper,
				        toggleActions: 'restart none none none'
				    }
				});

				text.html(function(i, html) {
				  var chars = $.trim(html).split("");

				  return '<span class="d-inline-block ws-pre-wrap">' + chars.join('</span><span class="d-inline-block ws-pre-wrap">') + '</span>';
				});

				var targetsSpans = wrapper.find('span');

				tl2.staggerFromTo(targetsSpans, 2, {
				    opacity: 0,
				    y: 90,
				    ease: Elastic.easeOut.config(1.2, 0.5)
				}, {
				    opacity: 1,
				    y: 0,
				    ease: Elastic.easeOut.config(1.2, 0.5)
				}, 0.03);

			});


		}

	} else {

		theme.fn.showErrorMessage('Failed to Load File', 'Failed to load: GSAP - Include the following file(s): (vendor/gsap/gsap.min.js)');

	}

}).apply( this, [ jQuery ]);