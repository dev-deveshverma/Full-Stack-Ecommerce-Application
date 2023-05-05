/*
Name: 			Business Consulting 2
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	9.9.0
*/

(function( $ ) {

	'use strict';

	// Accordion
	$("[data-parent='#accordionServices']").on("click", function() {
		var trigger = $(this);
		$("#accordionServices .collapse.show").each(function() {
			if (trigger.attr("href") != ("#" + $(this).attr("id"))) {
				$(this).removeClass("show");
			}
		});
	});
	
}).apply( this, [ jQuery ]);