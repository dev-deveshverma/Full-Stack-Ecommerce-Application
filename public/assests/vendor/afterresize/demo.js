$(document).ready( function() {
	$(window).afterResize( function() {
		alert('Resize event has finished');
	}, true, 100 );
});