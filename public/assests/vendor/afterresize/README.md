# afterResize.js

If you have ever used jQuery's .resize() method to detect a window resize you may be aware that most browsers don't wait for the resize event to finish before it triggers a callback. Instead the event and it's callback is fired rapidly until the resize is complete.

This very simple jQuery plugin is designed to emulate an 'after resize' event. It works by adding the callback to a queue to be executed after a duration. If the event is triggered again before the end of this duration, it is restarted and the callback will not execute until the duration can finish.

## Example

```javascript
$(document).ready( function() {
	$(window).afterResize( function() {
		alert('Resize event has finished');
	}, true, 100 );
});
```

## Licence

Do with it what you wish.