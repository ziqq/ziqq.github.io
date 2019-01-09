'use strict';

$(function () {
    if ($(window).width() <= 480) {
        var lastScrollTop = 0;
        var header = $('.header');
        var headerClone = $('<div class="header-clone">').css('height', header.innerHeight()).insertBefore(header).hide();
        $(window).scroll(function (event) {
            var st = $(this).scrollTop();
            if (st > lastScrollTop) {
                header.removeClass('is-fixed');
                headerClone.hide();
            } else {
                header.addClass('is-fixed');
                headerClone.show();
            }
            lastScrollTop = st;
        });
    }

    //City hover
    $('.js-city-hover').click(function () {
        $(this).toggleClass('is-active');
    });
    $(document).click(function (event) {
        if ($(event.target).closest('.js-city-hover').length) return;
        $('.js-city-hover').removeClass('is-active');
        event.stopPropagation();
    });

    if ($(window).width() <= 1199) {
        $('.js-mobile-menu-btn').appendTo('.header__bottom');
    }

    if ($(window).width() <= 1024) {
        $('<a href="javascript:void(0);" class="js-mobile-menu-btn toggle-menu"><span></span></a>').prependTo('.header__bottom');
    }

    //Mobile Munu
    if ($(window).width() <= 480) {
        var _header = $('.header');

        $('.js-logo').prependTo(_header);
        $('<div class="block-move">').insertAfter('.wrapper');
        $('js-mobile-menu-btn').insertAfter('.logo_mobile');
        $('.js-action').prependTo('.menu__inner');
        $('.js-mobile-menu-btn').prependTo(_header);
        $('.callback').appendTo(_header);
        $('.js-user-enter').appendTo('.block-move');
        $('.js-search-block').appendTo('.block-move');
    }

    $('.js-mobile-menu-btn').click(function () {
        $(this).toggleClass('on');
        $('.js-menu').slideToggle();
        if ($('.go-top').hasClass('is-visible')) {
            $('.go-top').removeClass('is-visible');
        } else {
            $('.go-top').addClass('is-visible');
        }
        $('.js-filter-open').toggleClass('is-disable');
        if ($('body').hasClass('is-fixed-bg')) {
            $('body').removeClass('is-fixed-bg');
        } else {
            $('body').addClass('is-fixed-bg');
        }
        return false;
    });

    $(document).mouseup(function (e) {
        var div = $('.js-menu, .js-user-enter, .js-search-block, .js-mobile-menu-btn, .js-filter');
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            $('.js-mobile-menu-btn').removeClass('on');
            $('.js-filter-open').removeClass('is-disable');
            $('body').removeClass('is-fixed-bg');
            if ($('.go-top').hasClass('is-visible')) {
                $('.go-top').removeClass('is-visible');
            } else {
                $('.go-top').removeClass('is-visible');
            }
            if ($(window).width() <= 1024) {
                $('.js-menu').slideUp();
            }
        }
    });

    //Search
    $('.js-search').keyup(function () {
        if ($(this).val() != '') {
            $('.search__result').slideDown();
        } else if ($(this).val() == '') {
            $('.search__result').slideUp();
        }
    });

    //Auth Close
    if ($(window).width() <= 480) {
        $('.js-auth').click(function () {
            $('.js-user-enter').addClass('is-open');
        });

        $('.js-search').click(function () {
            $('.js-search-block').addClass('is-open');
        });
    }
    $('.js-close').click(function () {
        $('.js-user-enter').removeClass('is-open');
        $('.js-search-block').removeClass('is-open');
    });

    $('.js-tab-item').not(':first').hide();
    $('.js-tab').click(function () {
        $('.js-tab').removeClass('is-active');
        $(this).addClass('is-active');
        $('.js-tab-item').hide().eq($(this).index()).fadeIn();
    }).eq(0).addClass('is-active');

    $('.js-tab-item--clone').not(':first').hide();
    $('.js-tab--clone').click(function () {
        $('.js-tab--clone').removeClass('is-active');
        $(this).addClass('is-active');
        $('.js-tab-item--clone').hide().eq($(this).index()).fadeIn();
    }).eq(0).addClass('is-active');

    //Product Slider
    if ($('.product-slider').length) {
        $('.product-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.product-slider__nav',
            arrows: false
        });
        $('.product-slider__nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.product-slider',
            centerMode: true,
            focusOnSelect: true,
            arrows: false,
            vertical: true,

            responsive: [{
                breakpoint: 1025,
                settings: {
                    vertical: false
                }
            }]
        });
    }
    //Section slider
    if ($('.js-slider').length) {
        $('.js-slider').slick({
            // autoplay: true,
            autoplaySpeed: 5000,
            speed: 2000,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            appendArrows: '.main-slider .slider__dots',

            dots: true,
            customPaging: function customPaging(slider, i) {
                return i + 1 + '/' + slider.slideCount;
            },
            appendDots: '.main-slider .slider__dots'
        });
    }

    //Section slider
    if ($('.js-addition-slider').length) {
        $('.js-addition-slider').slick({
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 2000,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            appendArrows: '.slider-addition .slider__dots',
            centerPadding: 0,

            dots: true,
            customPaging: function customPaging(slider, i) {
                return i + 1 + '/' + slider.slideCount;
            },
            appendDots: '.slider-addition .slider__dots',

            responsive: [{
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3
                }

            }, {
                breakpoint: 769,
                settings: {
                    slidesToShow: 3
                }

            }, {
                breakpoint: 481,
                settings: {
                    slidesToShow: 1
                }

            }, {
                breakpoint: 426,
                settings: {
                    slidesToShow: 1
                }

            }]
        });
    }

    if ($('.js-slider-brands').length) {
        $('.js-slider-brands').slick({
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 2000,
            infinite: true,
            slidesToShow: 7,
            slidesToScroll: 1,
            arrows: true,
            appendArrows: '.slider-brands .slider__dots',
            centerPadding: 0,

            dots: true,
            customPaging: function customPaging(slider, i) {
                return i + 1 + '/' + slider.slideCount;
            },
            appendDots: '.slider-brands .slider__dots',

            responsive: [{
                breakpoint: 1025,
                settings: {
                    slidesToShow: 6
                }

            }, {
                breakpoint: 769,
                settings: {
                    slidesToShow: 5
                }

            }, {
                breakpoint: 481,
                settings: {
                    slidesToShow: 3
                }

            }, {
                breakpoint: 376,
                settings: {
                    slidesToShow: 2
                }

            }]
        });
    }

    if ($('.js-similar-slider').length) {
        $('.js-similar-slider').slick({
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 2000,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            appendArrows: '.slider-similar .slider__dots',
            centerPadding: 0,

            dots: true,
            customPaging: function customPaging(slider, i) {
                return i + 1 + '/' + slider.slideCount;
            },
            appendDots: '.slider-similar .slider__dots',

            responsive: [{
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3
                }

            }, {
                breakpoint: 769,
                settings: {
                    slidesToShow: 3
                }

            }, {
                breakpoint: 481,
                settings: {
                    slidesToShow: 1
                }

            }, {
                breakpoint: 426,
                settings: {
                    slidesToShow: 1
                }

            }]
        });
    }

    //News Slider
    if ($('.js-news-slider').length) {
        $('.js-news-slider').slick({
            // autoplay: true,
            autoplaySpeed: 2000,
            speed: 2000,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            appendArrows: '.slider-news .slider__dots',
            centerMode: true,

            dots: true,
            customPaging: function customPaging(slider, i) {
                return i + 1 + '/' + slider.slideCount;
            },
            appendDots: '.slider-news .slider__dots',

            responsive: [{
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2
                }

            }, {
                breakpoint: 481,
                settings: {
                    slidesToShow: 1
                }

            }]
        });
    }
    $('.js-tab-content').not(':first').hide();
    $('.js-tab').on('click', function () {
        $('.js-tab').removeClass('is-active');
        $(this).addClass('is-active');
        $('.js-tab-content').hide().eq($(this).index()).show();
        heightses();
    });

    $('.js-choice-payment').on('click', function () {
        $('.js-tab').removeClass('is-active');
        $('.js-basket-pay').addClass('is-active');
        $('.js-tab-content').hide().filter('.tab-item_pay').show();
        $('.page-title').replaceWith('<h1 class="page-title">Оплата</h1>');
    });

    $('.js-address').on('click', function () {
        $('.js-tab').removeClass('is-active');
        $('.js-basket-adress').addClass('is-active');
        $('.js-tab-content').hide().filter('.tab-item_delivery').show();
        $('.page-title').replaceWith('<h1 class="page-title">Адрес доставки</h1>');
    });

    $('.js-basket-card').on('click', function () {
        $('.page-title').replaceWith('<h1 class="page-title">Корзина</h1>');
    });

    $('.js-basket-pay').on('click', function () {
        $('.page-title').replaceWith('<h1 class="page-title">Оплата</h1>');
    });

    $('.js-basket-adress').on('click', function () {
        $('.page-title').replaceWith('<h1 class="page-title">Адрес доставки</h1>');
    });

    //LK

    $('.lk-item__content').hide().prev().on('click', function () {
        $(this).parents('.lk-item__wrap').find('.lk-item__content').not(this).slideUp().prev().removeClass('is-active');
        $(this).next().not(':visible').slideDown().prev().addClass('is=active');
    });

    //Filter
    $('.js-filter-top-item').on('click', function () {
        $('.js-filter-top-item').removeClass('is-active');
        $(this).addClass('is-active');
    });
    $(document).on('click', function (e) {
        if ($(e.target).closest('.js-filter-top-item, .js-filter').length) return;
        $('.js-filter-top-item').removeClass('is-active');
        $('.js-filter').removeClass('is-open');
        $('.go-top').removeAttr('style');
        $('body').removeClass('is-fixed-bg');
        $('.mask').removeAttr('style');
        e.stopPropagation();
    });

    $('.js-filter-sorting').on('click', function () {
        $('.js-filter-sorting').removeClass('is-active');
        $(this).addClass('is-active');
    });

    $('.js-filter-open').on('click', function () {
        $('.js-filter').addClass('is-open');
        $('.go-top').css('display', 'none');
        $('body').addClass('is-fixed-bg');

        if ($(window).width() >= 480) {
            $('.mask').css('display', 'block');
        }

        return false;
    });

    $('.js-filter-close').on('click', function () {
        $('.js-filter').removeClass('is-open');
        $('.go-top').removeAttr('style');
        $('body').removeClass('is-fixed-bg');
        $('.mask').removeAttr('style');
    });

    $('.js-checkbox-title').on('click', function () {
        if ($(this).find('input[type=checkbox]').is(':checked')) {
            $(this).addClass('is-active');
        } else {
            $(this).removeClass('is-active');
        }
    });

    $('.js-filter-showmore').on('click', function () {
        $(this).parent('.filter-item__list').find('.checkbox').removeClass('hidden');
        $(this).hide();
        return false;
    });

    if ($(window).width() <= 480) {
        $('.js-filter').appendTo('.block-move');
        $('.js-filter-open').html('фильтр').appendTo('.block-move');
    }

    if ($('.js-header-catalog').length) {
        var header = $('.header');
        var catHead = $('.js-header-catalog');
        if ($(window).width() > 480) {
            $(window).scroll(function () {
                var winScrollTop = $(this).scrollTop();
                if (winScrollTop >= header.height()) {
                    catHead.addClass('is-visible');
                } else {
                    catHead.removeClass('is-visible');
                }
            });
        }
    }

    if ($('.filter-top__wrap').length) {
        var fSmWrap = $('.filter-top__wrap');
        var fSmWrapClone = $('<div class="empty">').css('height', fSmWrap.outerHeight(true)).insertAfter(fSmWrap).hide();
        var fSmWrapOffset = fSmWrap.offset().top;
        if ($(window).width() > 480) {
            $(window).scroll(function () {
                var winScrollTop = $(this).scrollTop();
                if (winScrollTop >= fSmWrapOffset - fSmWrap.outerHeight() * 2) {
                    fSmWrap.addClass('is-fixed');
                    fSmWrapClone.show();
                } else {
                    fSmWrap.removeClass('is-fixed');
                    fSmWrapClone.hide();
                }
            });
        }
    }

    if ($(window).width() > 768) {
        $('.city-dropdown, .popup, .filter__content, .filter-top__inner, .favorite__inner, .cart__inner, .search__result').niceScroll({
            cursorcolor: '#baab82',
            horizrailenabled: false,
            autohidemode: false,
            boxzoom: false,
            verge: '500',
            cursorwidth: '4px',
            cursorborder: 'none',
            cursorborderradius: '0'
        });
    }

    $('.city-dropdown, .popup, .filter__content, .filter-top__inner, .favorite__inner, .cart__inner, search__result').mouseover(function () {
        $(this).getNiceScroll().resize();
    });

    //Mask
    if ($('.phone-mask').length) {
        $('.phone-mask').mask('+7(999) 999-9999');
    }

    //Custom Input
    if ($('.js-sa-input').length) {
        $('.js-sa-input').focus(function () {
            $(this).parent('.sa-input__box').addClass('is-focus');
        }).blur(function () {
            if ($(this).val() == '') {
                $(this).parent('.sa-input__box').removeClass('is-focus');
            }
        });
    }

    //equalheights
    function heightses() {
        $('.product-item__title').height('auto').equalHeights();
    }
    $(window).resize(function () {
        heightses();
    });

    if ($('.product-item__title').length) {
        heightses();
    }

    //product text
    $('.js-product-desc-text').click(function () {
        $(this).prev('.product-desc__inner').css('max-height', '100%');
        $(this).css('display', 'none');
    });

    $('.seo-text__desc').not(':first').hide();
    $('.seo-text__readnext').click(function () {
        $('.seo-text__desc').slideDown('450');
    });

    $('.js-extra-item').click(function () {
        $('.js-extra-item').removeClass('is-visible');
        $(this).addClass('is-visible');
    });
    $(document).click(function (event) {
        if ($(event.target).closest('.extra-item').length) return;
        $('.js-extra-item').removeClass('is-visible');
        event.stopPropagation();
    });

    //Popup
    if ($('.js-fancybox').length) {
        $('.js-fancybox').fancybox({
            touch: false,
            width: '100%',
            maxWidth: '560px',
            height: 'auto',
            margin: 0,
            padding: 0,
            closeSpeed: 0,
            helpers: {
                overlay: {
                    locked: false
                }
            }
        });
    }
    $('.js-popup--close').click(function () {
        $.fancybox.close();
    });

    $('.js-bookit--open').on('click', function () {
        $('.bookit').addClass('is-active');
    });
    $('.js-bookit--close').on('click', function () {
        $('.bookit').removeClass('is-active');
    });

    $('img').on('dragstart', function (event) {
        event.preventDefault();
    });

    //map-text close
    $('.js-map-text-close').click(function () {
        $('.map__text').addClass('is-close');
    });
    $('.js-map-shops').click(function () {
        $('.map__text').removeClass('is-close');
    });

    //about nav
    $('.about-nav__item').click(function () {
        $('.about-nav__item').removeClass('is-active');
        $(this).addClass('is-active');
    });

    if ($(window).width() <= 480) {
        $('.news .about-nav').appendTo('.news .container');
        $('.js-product-title').insertAfter('.breadcrumbs');
    }

    //footer accordeon
    if ($(window).width() <= 480) {
        $('.footer .footer-list').hide().prev().click(function () {
            $(this).parents('.footer').find('.footer-list').not(this).slideUp().prev().removeClass('is-active');
            $(this).next().not(':visible').slideDown().prev().addClass('is-active');
        });
    }

    //Go to top
    $('.go-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > $(this).height()) {
            $('.go-top').addClass('is-visible');
        } else {
            $('.go-top').removeClass('is-visible');
        }
    });

    //Map
    if ($('#map').length) {
        var init = function init() {
            myMap = new ymaps.Map('map', {
                center: [52.01662042, 47.81215808],
                zoom: 14
            });

            myMap.behaviors.disable(['scrollZoom']);

            myMap.controls.remove('searchControl').remove('trafficControl').remove('typeSelector').add('routeEditor');

            myPin = new ymaps.GeoObjectCollection({}, {
                iconLayout: 'default#image',
                iconImageHref: 'img/general/map-pin.svg',
                iconImageSize: [30, 42],
                iconImageOffset: [-3, -42]
            });

            myPlacemark1 = new ymaps.Placemark([52.02289564, 47.82915305], {
                balloonContentHeader: '<span class="map-pin__title"> Тц, ГринХаус, Салон Sunangel</span>',
                balloonContentBody: '<span class="map-shop__place">ул. Трнавская, 24</span><span class="map-shop__time"><i class="fa fa-clock-o"></i>10:00 — 22:00</span><span class="map-shop__phone"><i class="fa fa-phone-square"></i><a href="tel:">+7 (999) 000-00-00</a></span>',
                hintContent: 'Sunangel'
            });

            myPlacemark2 = new ymaps.Placemark([52.01096799, 47.79694039], {
                balloonContentHeader: '<span class="map-pin__title"> Тц, Оранж, Салон Sunangel</span>',
                balloonContentBody: '<span class="map-shop__place">ул. Волжская, 100</span><span class="map-shop__time"><i class="fa fa-clock-o"></i>9:00 — 21:00</span><span class="map-shop__phone"><i class="fa fa-phone-square"></i><a href="tel:">+7 (999) 000-00-00</a></span>',
                hintContent: 'Sunangel'
            });

            myPin.add(myPlacemark1).add(myPlacemark2);
            myMap.geoObjects.add(myPin);

            $('.js-fancybox--map').fancybox({
                afterLoad: function afterLoad() {
                    myMap.redraw();
                }
            });
        };

        ymaps.ready(init);
        var myMap, myPlacemark1, myPlacemark2, myPin;
    }
});