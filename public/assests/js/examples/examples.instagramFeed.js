/*
Name:           InstagramFeed - Examples
Written by:     Okler Themes - (http://www.okler.net)
Theme Version:  9.9.0
*/
(function($) {

    'use strict';
    
    theme.fn.intObs('.instagram-feed', function(){
        var $this = $( this ),
            type  = $this.data('type');
 
        $.ajax({
            url: 'php/instagram-token.php?get_token=true',
            type: 'get',
            dataType: 'json'
        })
        .done(function(data) {
            if( data.status == 'success' ) {
                var InstagramToken = data.response;

                switch ( type ) {
                    case 'basic':

                        var feed = new Instafeed({
                            accessToken: InstagramToken,
                            target: $this[0],
                            template:
                                '<div class="col-4 mb-4 pt-2">'+ 
                                    '<a href="{{link}}" target="_blank">' +
                                        '<span class="thumb-info thumb-info-lighten thumb-info-centered-info thumb-info-no-borders">' +
                                            '<span class="thumb-info-wrapper">' +
                                                '<img src="{{image}}" class="img-fluid" alt="{{caption}}" />' +
                                            '</span>' +
                                        '</span>' +
                                    '</a>' +
                                '</div>',
                            after: function(){
                                var $wrapper = $this,
                                    html = $wrapper.html();

                                // Build Html
                                $wrapper
                                    .html('')
                                    .append('<div class="row"></div>')
                                    .find('.row')
                                    .append(html);
                            }
                        });

                        feed.run();

                        break;

                    case 'carousel':

                        var feed = new Instafeed({
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
                                    items: 1,
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

                        break;

                    case 'nomargins':

                        var feed = new Instafeed({
                            accessToken: InstagramToken,
                            target: $this[0],
                            template:
                                '<div class="col-6 col-xl-4 px-0">'+ 
                                    '<a href="{{link}}" target="_blank">' +
                                        '<span class="thumb-info thumb-info-lighten thumb-info-centered-info thumb-info-no-borders">' +
                                            '<span class="thumb-info-wrapper">' +
                                                '<img src="{{image}}" class="img-fluid" alt="{{caption}}" />' +
                                            '</span>' +
                                        '</span>' +
                                    '</a>' +
                                '</div>',
                             after: function(){
                                var $wrapper = $this,
                                    html = $wrapper.html();

                                // Build Html
                                $wrapper
                                    .html('')
                                    .append('<div class="row mx-0"></div>')
                                    .find('.row')
                                    .append(html);
                            }
                        });

                        feed.run();

                        break;

                }

            } else {
                console.log('Instagram Feed Error: Token file not found. If you did not setup your access token yet, please check the template documentation at "Instagram" section.');
            }
            
        })
        .fail(function() {
            console.log('Instagram Feed Error: By some reason the AJAX could not complete with success. Make sure you are running your project trough a local or online server.');
        });
        
    }, {});
            
}).apply(this, [jQuery]);