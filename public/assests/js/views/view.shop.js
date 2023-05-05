/*
Name: 			View - Shop
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	9.9.0
*/

(function($) {

	'use strict';

	/*
	* Quantity
	*/
    $( document ).on('click', '.quantity .plus',function(){
        var $qty=$(this).parents('.quantity').find('.qty');
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal)) {
            $qty.val(currentVal + 1);
        }
    });

    $( document ).on('click', '.quantity .minus',function(){
        var $qty=$(this).parents('.quantity').find('.qty');
        var currentVal = parseInt($qty.val());
        if (!isNaN(currentVal) && currentVal > 1) {
            $qty.val(currentVal - 1);
        }
    });

    /*
    * Image Gallery Zoom
    */
    if($.fn.elevateZoom) {
        if( $('[data-zoom-image]').get(0) ) {
            $('[data-zoom-image]').each(function(){
                var $this = $(this);

                $this.elevateZoom({
                    responsive: true,
                    zoomWindowFadeIn: 350,
                    zoomWindowFadeOut: 200,
                    borderSize: 0,
                    zoomContainer: $this.parent(),
                    zoomType: 'inner',
                    cursor: 'grab'
                });
            });
        }
    }

    /*
    * Quick View Lightbox/Popup With Ajax
    */
    $('.quick-view').magnificPopup({
        type: 'ajax',
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: '',
        callbacks: {
            open: function() {
                $('html').addClass('lightbox-opened');
            },
            close: function() {
                $('html').removeClass('lightbox-opened');
                setTimeout(function(){
                    $('html').removeClass('lightbox-beforeclose');
                }, 500);
            },
            beforeClose: function() {
                $('html').addClass('lightbox-beforeclose');
            },
            ajaxContentAdded: function() {

                /*
                Thumb Gallery
                */
                $('.thumb-gallery-wrapper').each(function(){
                    var $thumbGalleryDetail = $(this).find('.thumb-gallery-detail'),
                        $thumbGalleryThumbs = $(this).find('.thumb-gallery-thumbs'),
                        flag = false,
                        duration = 300;

                    $thumbGalleryDetail
                        .owlCarousel({
                            items: 1,
                            margin: 10,
                            nav: true,
                            dots: false,
                            loop: false,
                            autoHeight: true,
                            navText: [],
                            rtl: ( $('html').attr('dir') == 'rtl' ) ? true : false
                        })
                        .on('changed.owl.carousel', function(e) {
                            if (!flag) {
                                flag = true;
                                $thumbGalleryThumbs.trigger('to.owl.carousel', [e.item.index-1, duration, true]);

                                $thumbGalleryThumbs.find('.owl-item').removeClass('selected');
                                $thumbGalleryThumbs.find('.owl-item').eq( e.item.index ).addClass('selected');
                                flag = false;
                            }
                        });

                    
                    $thumbGalleryThumbs
                        .owlCarousel({
                            margin: 15,
                            items: $(this).data('thumbs-items') ? $(this).data('thumbs-items') : 4,
                            nav: false,
                            center: $(this).data('thumbs-center') ? true : false,
                            dots: false,
                            rtl: ( $('html').attr('dir') == 'rtl' ) ? true : false
                        })
                        .on('click', '.owl-item', function() {
                            $thumbGalleryDetail.trigger('to.owl.carousel', [$(this).index(), duration, true]);
                        })
                        .on('changed.owl.carousel', function(e) {
                            if (!flag) {
                                flag = true;
                                $thumbGalleryDetail.trigger('to.owl.carousel', [e.item.index, duration, true]);
                                flag = false;
                            }
                        });

                    $thumbGalleryThumbs.find('.owl-item').eq(0).addClass('selected');
                        

                });

                /*
                * Image Gallery Zoom
                */
                if($.fn.elevateZoom) {
                    if( $('[data-zoom-image]').get(0) ) {
                        $('[data-zoom-image]').each(function(){
                            var $this = $(this);

                            $this.elevateZoom({
                                responsive: true,
                                zoomWindowFadeIn: 350,
                                zoomWindowFadeOut: 200,
                                borderSize: 0,
                                zoomContainer: $this.parent(),
                                zoomType: 'inner',
                                cursor: 'grab'
                            });
                        });
                    }
                }

                /*
                * Star Rating
                */ 
                if ($.isFunction($.fn['themePluginStarRating'])) {

                    $(function() {
                        $('[data-plugin-star-rating]:not(.manual)').each(function() {
                            var $this = $(this),
                                opts;

                            var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
                            if (pluginOptions)
                                opts = pluginOptions;

                            $this.themePluginStarRating(opts);
                        });
                    });

                }

            }
        }
    });

}).apply(this, [jQuery]);