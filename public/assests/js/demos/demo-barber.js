/*
Name: 			Barber
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	9.9.0
*/

(function( $ ) {

	'use strict';

    $(window).on('load', function(){

        if( $( '.custom-instagram-feed-carousel' ).get(0) ) {

            theme.fn.intObs('.custom-instagram-feed-carousel', function(){
                var $this = $( this );
         
                $.ajax({
                    url: 'php/instagram-token.php?get_token=true',
                    type: 'get',
                    dataType: 'json'
                })
                .done(function(data) {
                    if( data.status == 'success' ) {
                        var InstagramToken = data.response,        
                            feed = new Instafeed({
                            accessToken: InstagramToken,
                            target: $this[0],
                            template: 
                                '<div>' +
                                    '<a target="_blank" href="{{link}}">' +
                                        '<img src="{{image}}" class="img-fluid" alt="{{caption}}" />' +
                                    '</a>' +
                                '</div>',
                            after: function(){
                                var $wrapper = $this;

                                $wrapper.addClass('owl-carousel').owlCarousel({
                                    responsive: {
                                        0: {
                                            items: 1
                                        },
                                        575: {
                                            items: 2
                                        },
                                        767: {
                                            items: 3
                                        },
                                        991: {
                                            items: 5
                                        },
                                        1440: {
                                            items: 7
                                        }
                                    },
                                    nav: false,
                                    dots: false,
                                    loop: true,
                                    navText: [],
                                    autoplay: true,
                                    autoplayTimeout: 6000,
                                    rtl: ( $('html').attr('dir') == 'rtl' ) ? true : false
                                });
                            }
                        });

                        feed.run();
                
                    } else {
                        console.log('Instagram Feed Error: Token file not found. If you did not setup your access token yet, please check the template documentation at "Instagram" section.');
                    }
                    
                })
                .fail(function() {
                    console.log('Instagram Feed Error: By some reason the AJAX could not complete with success. Make sure you are running your project trough a local or online server.');
                });
                
            }, {});

        }

    });

}).apply( this, [ jQuery ]);