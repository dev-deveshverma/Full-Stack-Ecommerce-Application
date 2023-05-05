/*
Name: 			Architecture 2
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	9.9.0
*/

(function( $ ) {

	'use strict';

	/*
	* Slider Background
	*/
	var $slider = $('#slider'),
		direction = '';

	$slider.on('click', '.owl-next', function(){
		direction = 'next';
	});

	$slider.on('click', '.owl-prev', function(){
		direction = 'prev';
	});

	$slider.on('changed.owl.carousel', function(e){
		
		$('.custom-slider-background .custom-slider-background-image-stage').each(function(){
			var $stage       = $(this),
				$stageOuter  = $stage.closest('.custom-slider-background-image-stage-outer'),
				$currentItem = $stage.find('.custom-slider-background-image-item').eq( e.item.index ),
				nItems       = $stage.find('.custom-slider-background-image-item').length;

			var distance = $stage.hasClass('reverse') ? ( $currentItem.outerHeight() * nItems ) - ( $currentItem.outerHeight() * ( e.item.index + 1 ) ) : $currentItem.outerHeight() * e.item.index,
				mathSymbol = $stage.hasClass('reverse') ? '-' : '-'; 

			$stage.css({
				transform: 'translate3d(0, '+ mathSymbol + distance +'px, 0)'
			});
		});

	});

	// Once we have all ready, show the slider
	$slider.on('initialized.owl.carousel', function(){
		setTimeout(function(){
			$('.custom-slider-background').addClass('show');
		}, 800);
	});

	// Hide nav on first load of page
	$slider.on('initialized.owl.carousel', function(){
		setTimeout(function(){
			$slider.find('.owl-nav').addClass('hide');
		}, 200);
	});

	// Show nav once the slider animation is completed
	$('.custom-slider-background').parent().on('transitionend', function(){
		setTimeout(function(){
			$slider.find('.owl-nav').addClass('show');
			$('.custom-slider-background').addClass('custom-box-shadow-1');
		}, 2000);
	});

	/*
	* Page Header
	*/
	$('.custom-page-header-1-wrapper > div').on('animationend', function(){
		setTimeout(function(){
			$('.custom-page-header-1-wrapper').addClass('custom-box-shadow-1');
		}, 1000);
	});

	/*
	* Load More - Projects
	*/
	var loadMore = {

		pages: 0,
		currentPage: 1,
		$wrapper: $('#loadMoreWrapper'),
		$btn: $('#loadMore'),
		$btnWrapper: $('#loadMoreBtnWrapper'),
		$loader: $('#loadMoreLoader'),

		build: function() {

			var self = this

			self.pages = self.$wrapper.data('total-pages');

			if(self.pages <= 1) {

				self.$btnWrapper.remove();
				return;

			} else {

				// init isotope
				self.$wrapper.isotope();

				self.$btn.on('click', function() {
					self.loadMore();
				});

				// Lazy Load
				if(self.$btn.hasClass('btn-lazy-load')) {
					theme.fn.intObs( '#loadMore', "$('#loadMore').trigger('click');", {
						rootMargin: '0px 0px 0px 0px'
					} );
				}

			}

		},
		loadMore: function() {

			var self = this;

			self.$btn.css({
				opacity: 0
			});
			self.$loader.show();

			// Ajax
			$.ajax({
				url: 'ajax/demo-architecture-2-ajax-projects-load-more-' + (parseInt(self.currentPage)+1) + '.html',
				complete: function(data) {

					var $items = $(data.responseText);

					setTimeout(function() {

						self.$wrapper.append($items)

						self.$wrapper.isotope('appended', $items);

						self.currentPage++;

						if(self.currentPage < self.pages) {
							self.$btn.css({
								opacity: 1
							}).blur();
						} else {
							self.$btnWrapper.remove();
						}

						self.$loader.hide();

					}, 1000);

				}
			});

		}

	}

	if($('#loadMoreWrapper').get(0)) {
		loadMore.build();
	}

}).apply( this, [ jQuery ]);