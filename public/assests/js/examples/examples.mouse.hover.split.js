/*
Name: 			Mouse Hover Split
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	9.9.0
*/

(function( $ ) {

	'use strict';

	// Mouse Hover Split
	const left = document.getElementById("side-left");

	const handleMove = e => {
	  left.style.width = `${e.clientX / window.innerWidth * 100}%`;
	}

	document.onmousemove = e => handleMove(e);

	document.ontouchmove = e => handleMove(e.touches[0]);	

}).apply( this, [ jQuery ]);