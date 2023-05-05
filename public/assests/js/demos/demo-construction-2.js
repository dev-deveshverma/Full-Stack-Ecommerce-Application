/*
Name: 			Construction 2
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	9.9.0
*/

(function ($) {

	'use strict';

	// Load More - Projects
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

			self.$btn.css('visibility', 'hidden');
			self.$loader.show();

			// Ajax
			$.ajax({
				url: 'ajax/demo-construction-2-ajax-projects-load-more-' + (parseInt(self.currentPage)+1) + '.html',
				complete: function(data) {

					var $items = $(data.responseText);

					setTimeout(function() {

						self.$wrapper.append($items)

						self.$wrapper.isotope('appended', $items);

						self.currentPage++;

						if(self.currentPage < self.pages) {
							self.$btn.css('visibility', 'visible').blur();
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

	// Thumb Gallery
	var $customThumbGalleryDetail = $('#customThumbGalleryDetail'),
		$customThumbGalleryThumbs = $('#customThumbGalleryThumbs'),
		flag = false,
		duration = 300;

	$customThumbGalleryDetail
		.owlCarousel({
			items: 1,
			margin: 10,
			nav: false,
			dots: false,
			loop: false,
			navText: [],
			rtl: ( $('html').attr('dir') == 'rtl' ) ? true : false
		})
		.on('changed.owl.carousel', function(e) {
			if (!flag) {
				flag = true;
				$customThumbGalleryThumbs.trigger('to.owl.carousel', [e.item.index-1, duration, true]);
				flag = false;
			}
		});

	$customThumbGalleryThumbs
		.owlCarousel({
			margin: 15,
			items: 4,
			nav: false,
			center: false,
			dots: false,
			rtl: ( $('html').attr('dir') == 'rtl' ) ? true : false
		})
		.on('click', '.owl-item', function() {
			$customThumbGalleryDetail.trigger('to.owl.carousel', [$(this).index(), duration, true]);
		})
		.on('changed.owl.carousel', function(e) {
			if (!flag) {
				flag = true;
				$customThumbGalleryDetail.trigger('to.owl.carousel', [e.item.index, duration, true]);
				flag = false;
			}
		});

}).apply(this, [jQuery]);