/*
Name: 			Wedding
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	9.9.0
*/

(function( $ ) {

	'use strict';

	/*
	Slider
	*/
	$('#revolutionSlider').revolution({
		sliderType: 'standard',
		sliderLayout: 'fullwidth',
		delay: 9000,
		responsiveLevels: [1920, 1200, 992, 500],
		gridwidth: [1920, 1200, 992, 500],
		gridheight: 780,
		disableProgressBar: 'on',
		spinner: 'spinner3',
		parallax: {
			type: "mouse",
			origo: "slidercenter",
			speed: 2000,
			levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
		},
		navigation: {
			arrows: {
				style: "hades",
				enable: false,
				hide_onmobile: false,
				hide_onleave: false,
				tmp: '<div class="tp-arr-allwrapper"><div class="tp-arr-imgholder"></div></div>',
				left: {
					h_align: "left",
					v_align: "center",
					h_offset: 10,
					v_offset: 0
				},
				right: {
					h_align: "right",
					v_align: "center",
					h_offset: 10,
					v_offset: 0
				}
			}
		}
	});

	$('#revolutionSlider2').revolution({
		sliderType: 'standard',
		sliderLayout: 'fullwidth',
		delay: 9000,
		responsiveLevels: [1920, 1200, 992, 500],
		gridwidth: [1920, 1200, 992, 500],
		gridheight: 575,
		disableProgressBar: 'on',
		spinner: 'spinner3',
		parallax: {
			type: "mouse",
			origo: "slidercenter",
			speed: 2000,
			levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
		},
		navigation: {
			arrows: {
				style: "hades",
				enable: false,
				hide_onmobile: false,
				hide_onleave: false,
				tmp: '<div class="tp-arr-allwrapper"><div class="tp-arr-imgholder"></div></div>',
				left: {
					h_align: "left",
					v_align: "center",
					h_offset: 10,
					v_offset: 0
				},
				right: {
					h_align: "right",
					v_align: "center",
					h_offset: 10,
					v_offset: 0
				}
			}
		}
	});

	// Our History Gallery
	var clickedItem,
		removeShowThumbsTimeout,
		portfolioLightboxOptions = {
		type: 'inline',

		fixedContentPos: true,
		fixedBgPos: true,

		overflowY: 'hidden',

		closeBtnInside: true,
		preloader: false,

		midClick: true,
		removalDelay: 300,
		mainClass: 'wedding-portfolio-gallery',

		callbacks: {
			open: function(){
				$('#thumbGalleryDetail').owlCarousel().trigger('refresh.owl.carousel');
				$('#thumbGalleryDetail').owlCarousel().trigger('to.owl.carousel', [clickedItem, 0]);

				$('#thumbGalleryThumbs').owlCarousel('refresh');

				removeShowThumbsTimeout = setTimeout(function(){
					$('#thumbGalleryThumbs').removeClass('show-thumbs');
				}, 3000);

				$(document).on('keydown', function( event ) {
				    if(event.keyCode == 37) {
				        $('#thumbGalleryDetail').trigger('prev.owl')
				    }
				    if(event.keyCode == 39) {
				        $('#thumbGalleryDetail').trigger('next.owl')
				    }
				});

				
			},
			close: function(){
				clearTimeout(removeShowThumbsTimeout);
				$('#thumbGalleryThumbs').addClass('show-thumbs');
				$(document).off('keydown');
			}
		}
	}

	var clickedItem = '';
	if( $('a[href="#ourHistoryLightbox"]').length ) {
		$('a[href="#ourHistoryLightbox"]').on('click', function(){
			clickedItem = $(this).parent().index();
		});

		$('a[href="#ourHistoryLightbox"]').magnificPopup(portfolioLightboxOptions);
	}

	/*
	Thumb Gallery
	*/
	if( $('#ourHistoryLightbox').get(0) ) {
		var $thumbGalleryDetail = $('#thumbGalleryDetail'),
			$thumbGalleryThumbs = $('#thumbGalleryThumbs'),
			flag = false,
			duration = 300;

		$thumbGalleryDetail
			.owlCarousel({
				items: 1,
				margin: 10,
				nav: true,
				dots: false,
				loop: false,
				navText: [],
				rtl: (($('html[dir="rtl"]').get(0)) ? true : false),
				onRefreshed: function(e){
					setTimeout(function(){
						$('.mfp-wrap.wedding-portfolio-gallery').css('opacity',1);
					}, 300);
				}
			})
			.on('changed.owl.carousel', function(e) {
				if (!flag) {
					flag = true;
					$thumbGalleryThumbs.trigger('to.owl.carousel', [e.item.index-1, duration, true]);

					// add class to active thumb
					$thumbGalleryThumbs.find('.owl-item').removeClass('active-thumb');
					$thumbGalleryThumbs.find('.owl-item:eq('+ e.item.index +')').addClass('active-thumb');

					flag = false;
				}
			});

		$thumbGalleryThumbs
			.owlCarousel({
				margin: 15,
				items: 15,
				nav: false,
				center: false,
				dots: false,
				pagination: false,
				rtl: (($('html[dir="rtl"]').get(0)) ? true : false)
			})
			.on('click', '.owl-item', function() {
				$thumbGalleryDetail.trigger('to.owl.carousel', [$(this).index(), duration, true]);

				// add class to active thumb
				$thumbGalleryThumbs.find('.owl-item').removeClass('active-thumb');
				$(this).addClass('active-thumb');
			});

		// Set first item with active-thumb
		$thumbGalleryThumbs.find('.owl-item:eq(0)').addClass('active-thumb');

	}

}).apply( this, [ jQuery ]);