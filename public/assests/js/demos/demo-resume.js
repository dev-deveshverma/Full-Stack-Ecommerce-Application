/*
Name: 			Resume
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	9.9.0
*/

(function( $ ) {

	'use strict';

	// About Me
	$('#aboutMeMoreBtn').on('click', function() {
		$(this).hide();
		$('#aboutMeMore').toggleClass('about-me-more-visible');
		return false;
	});

	/*
	* Timeline
	*/
	var timelineHeightAdjust = {
		$timeline: $('#timeline'),
		$timelineBar: $('#timeline .timeline-bar'),
		$firstTimelineItem: $('#timeline .timeline-box').first(),
		$lastTimelineItem: $('#timeline .timeline-box').last(),

		build: function() {
			var self = this;

			self.adjustHeight();
		},
		adjustHeight: function() {
			var self                = this,
				calcFirstItemHeight = self.$firstTimelineItem.outerHeight(true) / 2,
				calcLastItemHeight  = self.$lastTimelineItem.outerHeight(true) / 2;

			// Set Timeline Bar Top and Bottom
			self.$timelineBar.css({
				top: calcFirstItemHeight,
				bottom: calcLastItemHeight
			});
		}
	}

	if( $('#timeline').get(0) ) {
		setTimeout(function(){
			// Adjust Timeline Height On Resize
			$(window).afterResize(function() {
				timelineHeightAdjust.build();
			});
		}, 1000);

		timelineHeightAdjust.build();
	}

	/*
	* Header Image Anim
	*/
	var lastScrollTop = 0;

	$(window).on('scroll', function(){
	   var st = $(this).scrollTop();
	   
	   if (st > lastScrollTop){
	   		$('img[custom-anim]').css({
	   			transform: 'translate(0, -'+ st +'px)'
	   		});
	   } else {
	      $('img[custom-anim]').css({
	   			transform: 'translate(0, '+ -Math.abs(st) +'px)'
	   		});
	   }
	   lastScrollTop = st;
	});

}).apply( this, [ jQuery ]);