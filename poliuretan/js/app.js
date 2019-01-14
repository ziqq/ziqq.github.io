'use strict';

//Global Vars
var $window = $(window);
var $document = $(document);
var $html = $('html');
var $wrapper = $('.wrapper');
var $header = $('.header');
var $main = $('.main');
var $overlay = $('.js-overlay');

/**
 * Main
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */
var Main = {
    init: function init() {
        this.removePreloader();
        this.video();
        this.goTop();
        // this.setHeight();
        this.changeBgImage();

        //Stop drag Img
        $('img').on('dragstart', function (e) {
            e.preventDefault();
        });

        $window.on('resize', function () {
            console.log('---', 'window resize');
            Main.contentOffset();
            Main.changeBgImage();
        });
    },
    //Remove preloader
    removePreloader: function removePreloader() {
        setTimeout(function () {
            $('body').removeClass('loading');
        }, 1000);
    },
    goTop: function goTop() {
        $('.js-go-top').on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 800);
        });
    },
    inputs: {
        init: function init() {
            this.inputMask();
        },
        //Masked inputmask https://github.com/RobinHerbots/Inputmask
        inputMask: function inputMask() {
            if ($('.js-phone-mask').length) {
                $('.js-phone-mask').inputmask({
                    mask: '+7 (999) 999-99-99'
                });
            }
        }
    },
    video: function video() {
        var $videoContainer = $('.js-video');
        var $video = $videoContainer.find('video');
        var $playBtn = $videoContainer.find('.video__btn');

        $video.on('click', function (e) {
            if (this.paused) {
                this.play();
                $playBtn.hide();
            } else {
                this.pause();
                $playBtn.show();
            }
            e.preventDefault();
        });
    },
    // scrollEvents: function() {
    //     let headerHeight = $header.outerHeight(true);
    //     let $headerClone = $header
    //         .clone()
    //         .addClass('header--clone header--fixed')
    //         .insertAfter('.header');
    //     let $firstScreen = $document.find('.firstscreen');

    //     $window.on('scroll', function() {
    //         let scroll = $(this).scrollTop();

    //         if (scroll > headerHeight) {
    //             $headerClone.addClass('is-visible');
    //             $firstScreen.addClass('scale-out');
    //             Main.runTimeout = true;
    //         } else {
    //             $headerClone.removeClass('is-visible');
    //             $firstScreen.removeClass('scale-out');
    //             Main.runTimeout = false;
    //         }
    //     });
    // },
    contentOffset: function contentOffset() {
        var $firstScreen = $('.swiper-container');
        var $content = $('.content');

        $content.css('padding-top', $firstScreen.outerHeight(true));
    },
    // setHeight: function() {
    //     let width = $window.width();
    //     let windowHeight = $window.height();
    //     let headerHeight = $header.height();
    //     let $content = $('.content');

    //     // $window.on('resize', function() {
    //     //     if (width >= $window.width() || width <= $window.width()) {
    //     //         changeHeight();
    //     //     }
    //     // });
    //     // .on('scroll touchmove', function() {
    //     //     let scroll = $(this).scrollTop();
    //     //     if (scroll > 0) {
    //     //         $content.css('z-index', 99);
    //     //     } else {
    //     //         $content.css('z-index', 10);
    //     //     }
    //     // });

    //     // function changeHeight() {
    //     //     if ($(window).width() > 480) {
    //     //         $content.css('margin-top', windowHeight - headerHeight);
    //     //     } else {
    //     //         $content.css('padding-top', windowHeight - headerHeight);
    //     //     }
    //     // }
    //     // changeHeight();
    // },
    changeBgImage: function changeBgImage() {
        $('.firstscreen, .section--img').each(function () {
            var image = $(this).attr('data-bgimage');
            var smallImage = $(this).attr('data-bgimage-small');

            console.log('--- smallImage', smallImage);

            if ($(window).width() > 480) {
                if (!image == 'undefined') {
                    $(this).attr('style', 'background-image: url("' + image + '")');
                }
            } else {
                if (!smallImage == 'undefined') {
                    $(this).attr('style', 'background-image: url("' + smallImage + '")');
                } else {
                    $(this).attr('style', 'background-image: url("' + image + '")');
                }
            }
        });
    }
};

// Initialize slider

$(function () {
    $(Main.init());

    window.addEventListener('touchstart', function onFirstTouch() {
        // we could use a class
        document.body.classList.remove('no-touchevents');

        // we only need to know once that a human touched the screen, so we can stop listening now
        window.removeEventListener('touchstart', onFirstTouch, false);
    }, false);

    (function () {
        var timeout = false;
        var isMove = false;

        // let headerHeight = $header.outerHeight(true);
        // let $headerClone = $header
        //     .clone()
        //     .addClass('header--clone header--fixed')
        //     .insertAfter('.header');
        var $firstScreen = $document.find('.firstscreen');

        var sliderSelector = '.swiper-container';
        var $arrowPrev = $('.js-page-controls-arrow--prev');
        var $arrowNext = $('.js-page-controls-arrow--next');
        var page = void 0;

        function checkPage() {
            var pageNext = void 0,
                pagePrev = void 0;
            mySwiper.slides.each(function (e) {
                $('.page').hide().removeClass('is-active');

                if ($(this).hasClass('swiper-slide-active')) {
                    page = $(this).data('page');

                    pagePrev = mySwiper.slides.eq(e - 1).data('page-title');
                    pageNext = mySwiper.slides.eq(e + 1).data('page-title');

                    $arrowPrev.find('span').text(pagePrev);
                    $arrowNext.find('span').text(pageNext);
                }

                $('.page--' + page).show().addClass('is-active');
            });
        }

        var options = {
            init: false,
            loop: true,
            loopAdditionalSlides: 1,
            speed: 1200,
            effect: 'cube', // 'cube', 'fade', 'coverflow',
            cubeEffect: {
                shadow: false
                // slideShadows: true,
                // shadowOffset: 40
                // shadowScale: 0.94
            },
            grabCursor: true,
            // Events
            on: {
                imagesReady: function imagesReady() {
                    this.el.classList.remove('loading');
                },
                touchEnd: function touchEnd() {
                    setTimeout(function () {
                        isMove = false;
                    }, 300);
                },
                slideChangeTransitionEnd: function slideChangeTransitionEnd() {
                    if (!isMove) {
                        checkPage();
                    }
                }
            }
        };

        var mySwiper = new Swiper(sliderSelector, options);
        mySwiper.init();

        $window.on('scroll touchmove', function () {
            var scroll = $(this).scrollTop();

            if (scroll > 0) {
                // $headerClone.addClass('is-visible');
                $header.addClass('is-fixed');
                timeout = true;
                if ($(window).width() > 1024) {
                    $firstScreen.addClass('scale-out');
                }
            } else {
                // $headerClone.removeClass('is-visible');
                $header.removeClass('is-fixed');
                $firstScreen.removeClass('scale-out');
                timeout = false;
            }
        });

        $arrowPrev.on('click', function () {
            if (!timeout) {
                mySwiper.slidePrev();
            } else {
                goTop();
                setTimeout(function () {
                    mySwiper.slidePrev();
                }, 800);
            }
        });

        $arrowNext.on('click', function () {
            if (!timeout) {
                mySwiper.slideNext();
            } else {
                goTop();
                setTimeout(function () {
                    mySwiper.slideNext();
                }, 800);
            }
        });

        function goTop() {
            $('html, body').animate({
                scrollTop: 0
            }, 600);
        }
    })();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkd2luZG93IiwiJCIsIndpbmRvdyIsIiRkb2N1bWVudCIsImRvY3VtZW50IiwiJGh0bWwiLCIkd3JhcHBlciIsIiRoZWFkZXIiLCIkbWFpbiIsIiRvdmVybGF5IiwiTWFpbiIsImluaXQiLCJyZW1vdmVQcmVsb2FkZXIiLCJ2aWRlbyIsImdvVG9wIiwiY2hhbmdlQmdJbWFnZSIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwiY29uc29sZSIsImxvZyIsImNvbnRlbnRPZmZzZXQiLCJzZXRUaW1lb3V0IiwicmVtb3ZlQ2xhc3MiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiaW5wdXRzIiwiaW5wdXRNYXNrIiwibGVuZ3RoIiwiaW5wdXRtYXNrIiwibWFzayIsIiR2aWRlb0NvbnRhaW5lciIsIiR2aWRlbyIsImZpbmQiLCIkcGxheUJ0biIsInBhdXNlZCIsInBsYXkiLCJoaWRlIiwicGF1c2UiLCJzaG93IiwiJGZpcnN0U2NyZWVuIiwiJGNvbnRlbnQiLCJjc3MiLCJvdXRlckhlaWdodCIsImVhY2giLCJpbWFnZSIsImF0dHIiLCJzbWFsbEltYWdlIiwid2lkdGgiLCJhZGRFdmVudExpc3RlbmVyIiwib25GaXJzdFRvdWNoIiwiYm9keSIsImNsYXNzTGlzdCIsInJlbW92ZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ0aW1lb3V0IiwiaXNNb3ZlIiwic2xpZGVyU2VsZWN0b3IiLCIkYXJyb3dQcmV2IiwiJGFycm93TmV4dCIsInBhZ2UiLCJjaGVja1BhZ2UiLCJwYWdlTmV4dCIsInBhZ2VQcmV2IiwibXlTd2lwZXIiLCJzbGlkZXMiLCJoYXNDbGFzcyIsImRhdGEiLCJlcSIsInRleHQiLCJhZGRDbGFzcyIsIm9wdGlvbnMiLCJsb29wIiwibG9vcEFkZGl0aW9uYWxTbGlkZXMiLCJzcGVlZCIsImVmZmVjdCIsImN1YmVFZmZlY3QiLCJzaGFkb3ciLCJncmFiQ3Vyc29yIiwiaW1hZ2VzUmVhZHkiLCJlbCIsInRvdWNoRW5kIiwic2xpZGVDaGFuZ2VUcmFuc2l0aW9uRW5kIiwiU3dpcGVyIiwic2Nyb2xsIiwic2xpZGVQcmV2Iiwic2xpZGVOZXh0Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBTUEsVUFBVUMsRUFBRUMsTUFBRixDQUFoQjtBQUNBLElBQU1DLFlBQVlGLEVBQUVHLFFBQUYsQ0FBbEI7QUFDQSxJQUFNQyxRQUFRSixFQUFFLE1BQUYsQ0FBZDtBQUNBLElBQU1LLFdBQVdMLEVBQUUsVUFBRixDQUFqQjtBQUNBLElBQU1NLFVBQVVOLEVBQUUsU0FBRixDQUFoQjtBQUNBLElBQU1PLFFBQVFQLEVBQUUsT0FBRixDQUFkO0FBQ0EsSUFBTVEsV0FBV1IsRUFBRSxhQUFGLENBQWpCOztBQUVBOzs7OztBQUtBLElBQU1TLE9BQU87QUFDVEMsVUFBTSxnQkFBVztBQUNiLGFBQUtDLGVBQUw7QUFDQSxhQUFLQyxLQUFMO0FBQ0EsYUFBS0MsS0FBTDtBQUNBO0FBQ0EsYUFBS0MsYUFBTDs7QUFFQTtBQUNBZCxVQUFFLEtBQUYsRUFBU2UsRUFBVCxDQUFZLFdBQVosRUFBeUIsVUFBU0MsQ0FBVCxFQUFZO0FBQ2pDQSxjQUFFQyxjQUFGO0FBQ0gsU0FGRDs7QUFJQWxCLGdCQUFRZ0IsRUFBUixDQUFXLFFBQVgsRUFBcUIsWUFBVztBQUM1Qkcsb0JBQVFDLEdBQVIsQ0FBWSxLQUFaLEVBQW1CLGVBQW5CO0FBQ0FWLGlCQUFLVyxhQUFMO0FBQ0FYLGlCQUFLSyxhQUFMO0FBQ0gsU0FKRDtBQUtILEtBbEJRO0FBbUJUO0FBQ0FILHFCQUFpQiwyQkFBVztBQUN4QlUsbUJBQVcsWUFBTTtBQUNickIsY0FBRSxNQUFGLEVBQVVzQixXQUFWLENBQXNCLFNBQXRCO0FBQ0gsU0FGRCxFQUVHLElBRkg7QUFHSCxLQXhCUTtBQXlCVFQsV0FBTyxpQkFBVztBQUNkYixVQUFFLFlBQUYsRUFBZ0JlLEVBQWhCLENBQW1CLE9BQW5CLEVBQTRCLFVBQVNDLENBQVQsRUFBWTtBQUNwQ0EsY0FBRUMsY0FBRjtBQUNBakIsY0FBRSxZQUFGLEVBQWdC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QjtBQUMxQlIsaUNBQWE4QixRQUFiLENBQXNCLFdBQXRCO0FBQ0g7QUFDSixhQVBELE1BT087QUFDSDtBQUNBL0Qsd0JBQVFnQixXQUFSLENBQW9CLFVBQXBCO0FBQ0FpQiw2QkFBYWpCLFdBQWIsQ0FBeUIsV0FBekI7QUFDQWdDLDBCQUFVLEtBQVY7QUFDSDtBQUNKLFNBaEJEOztBQWtCQUcsbUJBQVcxQyxFQUFYLENBQWMsT0FBZCxFQUF1QixZQUFXO0FBQzlCLGdCQUFJLENBQUN1QyxPQUFMLEVBQWM7QUFDVlMseUJBQVNxQixTQUFUO0FBQ0gsYUFGRCxNQUVPO0FBQ0h2RTtBQUNBUSwyQkFBVyxZQUFNO0FBQ2IwQyw2QkFBU3FCLFNBQVQ7QUFDSCxpQkFGRCxFQUVHLEdBRkg7QUFHSDtBQUNKLFNBVEQ7O0FBV0ExQixtQkFBVzNDLEVBQVgsQ0FBYyxPQUFkLEVBQXVCLFlBQVc7QUFDOUIsZ0JBQUksQ0FBQ3VDLE9BQUwsRUFBYztBQUNWUyx5QkFBU3NCLFNBQVQ7QUFDSCxhQUZELE1BRU87QUFDSHhFO0FBQ0FRLDJCQUFXLFlBQU07QUFDYjBDLDZCQUFTc0IsU0FBVDtBQUNILGlCQUZELEVBRUcsR0FGSDtBQUdIO0FBQ0osU0FURDs7QUFXQSxpQkFBU3hFLEtBQVQsR0FBaUI7QUFDYmIsY0FBRSxZQUFGLEVBQWdCdUIsT0FBaEIsQ0FDSTtBQUNJQywyQkFBVztBQURmLGFBREosRUFJSSxHQUpKO0FBTUg7QUFDSixLQXpIRDtBQTBISCxDQXpJRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0dsb2JhbCBWYXJzXG5jb25zdCAkd2luZG93ID0gJCh3aW5kb3cpO1xuY29uc3QgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG5jb25zdCAkaHRtbCA9ICQoJ2h0bWwnKTtcbmNvbnN0ICR3cmFwcGVyID0gJCgnLndyYXBwZXInKTtcbmNvbnN0ICRoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XG5jb25zdCAkbWFpbiA9ICQoJy5tYWluJyk7XG5jb25zdCAkb3ZlcmxheSA9ICQoJy5qcy1vdmVybGF5Jyk7XG5cbi8qKlxuICogTWFpblxuICpcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XG4gKi9cbmNvbnN0IE1haW4gPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlUHJlbG9hZGVyKCk7XG4gICAgICAgIHRoaXMudmlkZW8oKTtcbiAgICAgICAgdGhpcy5nb1RvcCgpO1xuICAgICAgICAvLyB0aGlzLnNldEhlaWdodCgpO1xuICAgICAgICB0aGlzLmNoYW5nZUJnSW1hZ2UoKTtcblxuICAgICAgICAvL1N0b3AgZHJhZyBJbWdcbiAgICAgICAgJCgnaW1nJykub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHdpbmRvdy5vbigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tJywgJ3dpbmRvdyByZXNpemUnKTtcbiAgICAgICAgICAgIE1haW4uY29udGVudE9mZnNldCgpO1xuICAgICAgICAgICAgTWFpbi5jaGFuZ2VCZ0ltYWdlKCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgLy9SZW1vdmUgcHJlbG9hZGVyXG4gICAgcmVtb3ZlUHJlbG9hZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfSxcbiAgICBnb1RvcDogZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgODAwXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGlucHV0czoge1xuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRNYXNrKCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xuICAgICAgICBpbnB1dE1hc2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnKzcgKDk5OSkgOTk5LTk5LTk5J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICB2aWRlbzogZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCAkdmlkZW9Db250YWluZXIgPSAkKCcuanMtdmlkZW8nKTtcbiAgICAgICAgbGV0ICR2aWRlbyA9ICR2aWRlb0NvbnRhaW5lci5maW5kKCd2aWRlbycpO1xuICAgICAgICBsZXQgJHBsYXlCdG4gPSAkdmlkZW9Db250YWluZXIuZmluZCgnLnZpZGVvX19idG4nKTtcblxuICAgICAgICAkdmlkZW8ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICAgICAgICAgICAgJHBsYXlCdG4uaGlkZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgJHBsYXlCdG4uc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIC8vIHNjcm9sbEV2ZW50czogZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgIGxldCBoZWFkZXJIZWlnaHQgPSAkaGVhZGVyLm91dGVySGVpZ2h0KHRydWUpO1xuICAgIC8vICAgICBsZXQgJGhlYWRlckNsb25lID0gJGhlYWRlclxuICAgIC8vICAgICAgICAgLmNsb25lKClcbiAgICAvLyAgICAgICAgIC5hZGRDbGFzcygnaGVhZGVyLS1jbG9uZSBoZWFkZXItLWZpeGVkJylcbiAgICAvLyAgICAgICAgIC5pbnNlcnRBZnRlcignLmhlYWRlcicpO1xuICAgIC8vICAgICBsZXQgJGZpcnN0U2NyZWVuID0gJGRvY3VtZW50LmZpbmQoJy5maXJzdHNjcmVlbicpO1xuXG4gICAgLy8gICAgICR3aW5kb3cub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICAgICAgbGV0IHNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XG5cbiAgICAvLyAgICAgICAgIGlmIChzY3JvbGwgPiBoZWFkZXJIZWlnaHQpIHtcbiAgICAvLyAgICAgICAgICAgICAkaGVhZGVyQ2xvbmUuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAvLyAgICAgICAgICAgICAkZmlyc3RTY3JlZW4uYWRkQ2xhc3MoJ3NjYWxlLW91dCcpO1xuICAgIC8vICAgICAgICAgICAgIE1haW4ucnVuVGltZW91dCA9IHRydWU7XG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgICAgICRoZWFkZXJDbG9uZS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgIC8vICAgICAgICAgICAgICRmaXJzdFNjcmVlbi5yZW1vdmVDbGFzcygnc2NhbGUtb3V0Jyk7XG4gICAgLy8gICAgICAgICAgICAgTWFpbi5ydW5UaW1lb3V0ID0gZmFsc2U7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH0sXG4gICAgY29udGVudE9mZnNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCAkZmlyc3RTY3JlZW4gPSAkKCcuc3dpcGVyLWNvbnRhaW5lcicpO1xuICAgICAgICBsZXQgJGNvbnRlbnQgPSAkKCcuY29udGVudCcpO1xuXG4gICAgICAgICRjb250ZW50LmNzcygncGFkZGluZy10b3AnLCAkZmlyc3RTY3JlZW4ub3V0ZXJIZWlnaHQodHJ1ZSkpO1xuICAgIH0sXG4gICAgLy8gc2V0SGVpZ2h0OiBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgbGV0IHdpZHRoID0gJHdpbmRvdy53aWR0aCgpO1xuICAgIC8vICAgICBsZXQgd2luZG93SGVpZ2h0ID0gJHdpbmRvdy5oZWlnaHQoKTtcbiAgICAvLyAgICAgbGV0IGhlYWRlckhlaWdodCA9ICRoZWFkZXIuaGVpZ2h0KCk7XG4gICAgLy8gICAgIGxldCAkY29udGVudCA9ICQoJy5jb250ZW50Jyk7XG5cbiAgICAvLyAgICAgLy8gJHdpbmRvdy5vbigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgIC8vICAgICBpZiAod2lkdGggPj0gJHdpbmRvdy53aWR0aCgpIHx8IHdpZHRoIDw9ICR3aW5kb3cud2lkdGgoKSkge1xuICAgIC8vICAgICAvLyAgICAgICAgIGNoYW5nZUhlaWdodCgpO1xuICAgIC8vICAgICAvLyAgICAgfVxuICAgIC8vICAgICAvLyB9KTtcbiAgICAvLyAgICAgLy8gLm9uKCdzY3JvbGwgdG91Y2htb3ZlJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgIC8vICAgICBsZXQgc2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcbiAgICAvLyAgICAgLy8gICAgIGlmIChzY3JvbGwgPiAwKSB7XG4gICAgLy8gICAgIC8vICAgICAgICAgJGNvbnRlbnQuY3NzKCd6LWluZGV4JywgOTkpO1xuICAgIC8vICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgLy8gICAgICAgICAkY29udGVudC5jc3MoJ3otaW5kZXgnLCAxMCk7XG4gICAgLy8gICAgIC8vICAgICB9XG4gICAgLy8gICAgIC8vIH0pO1xuXG4gICAgLy8gICAgIC8vIGZ1bmN0aW9uIGNoYW5nZUhlaWdodCgpIHtcbiAgICAvLyAgICAgLy8gICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xuICAgIC8vICAgICAvLyAgICAgICAgICRjb250ZW50LmNzcygnbWFyZ2luLXRvcCcsIHdpbmRvd0hlaWdodCAtIGhlYWRlckhlaWdodCk7XG4gICAgLy8gICAgIC8vICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAvLyAgICAgICAgICRjb250ZW50LmNzcygncGFkZGluZy10b3AnLCB3aW5kb3dIZWlnaHQgLSBoZWFkZXJIZWlnaHQpO1xuICAgIC8vICAgICAvLyAgICAgfVxuICAgIC8vICAgICAvLyB9XG4gICAgLy8gICAgIC8vIGNoYW5nZUhlaWdodCgpO1xuICAgIC8vIH0sXG4gICAgY2hhbmdlQmdJbWFnZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5maXJzdHNjcmVlbiwgLnNlY3Rpb24tLWltZycpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgaW1hZ2UgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtYmdpbWFnZScpO1xuICAgICAgICAgICAgbGV0IHNtYWxsSW1hZ2UgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtYmdpbWFnZS1zbWFsbCcpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tIHNtYWxsSW1hZ2UnLCBzbWFsbEltYWdlKTtcblxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNDgwKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpbWFnZSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXG4gICAgICAgICAgICAgICAgICAgICAgICAnc3R5bGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtaW1hZ2U6IHVybChcIicgKyBpbWFnZSArICdcIiknXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNtYWxsSW1hZ2UgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3N0eWxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCInICsgc21hbGxJbWFnZSArICdcIiknXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3N0eWxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCInICsgaW1hZ2UgKyAnXCIpJ1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuLy8gSW5pdGlhbGl6ZSBzbGlkZXJcblxuJChmdW5jdGlvbigpIHtcbiAgICAkKE1haW4uaW5pdCgpKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAndG91Y2hzdGFydCcsXG4gICAgICAgIGZ1bmN0aW9uIG9uRmlyc3RUb3VjaCgpIHtcbiAgICAgICAgICAgIC8vIHdlIGNvdWxkIHVzZSBhIGNsYXNzXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ25vLXRvdWNoZXZlbnRzJyk7XG5cbiAgICAgICAgICAgIC8vIHdlIG9ubHkgbmVlZCB0byBrbm93IG9uY2UgdGhhdCBhIGh1bWFuIHRvdWNoZWQgdGhlIHNjcmVlbiwgc28gd2UgY2FuIHN0b3AgbGlzdGVuaW5nIG5vd1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBvbkZpcnN0VG91Y2gsIGZhbHNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICApO1xuXG4gICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgdGltZW91dCA9IGZhbHNlO1xuICAgICAgICBsZXQgaXNNb3ZlID0gZmFsc2U7XG5cbiAgICAgICAgLy8gbGV0IGhlYWRlckhlaWdodCA9ICRoZWFkZXIub3V0ZXJIZWlnaHQodHJ1ZSk7XG4gICAgICAgIC8vIGxldCAkaGVhZGVyQ2xvbmUgPSAkaGVhZGVyXG4gICAgICAgIC8vICAgICAuY2xvbmUoKVxuICAgICAgICAvLyAgICAgLmFkZENsYXNzKCdoZWFkZXItLWNsb25lIGhlYWRlci0tZml4ZWQnKVxuICAgICAgICAvLyAgICAgLmluc2VydEFmdGVyKCcuaGVhZGVyJyk7XG4gICAgICAgIGxldCAkZmlyc3RTY3JlZW4gPSAkZG9jdW1lbnQuZmluZCgnLmZpcnN0c2NyZWVuJyk7XG5cbiAgICAgICAgbGV0IHNsaWRlclNlbGVjdG9yID0gJy5zd2lwZXItY29udGFpbmVyJztcbiAgICAgICAgbGV0ICRhcnJvd1ByZXYgPSAkKCcuanMtcGFnZS1jb250cm9scy1hcnJvdy0tcHJldicpO1xuICAgICAgICBsZXQgJGFycm93TmV4dCA9ICQoJy5qcy1wYWdlLWNvbnRyb2xzLWFycm93LS1uZXh0Jyk7XG4gICAgICAgIGxldCBwYWdlO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrUGFnZSgpIHtcbiAgICAgICAgICAgIGxldCBwYWdlTmV4dCwgcGFnZVByZXY7XG4gICAgICAgICAgICBteVN3aXBlci5zbGlkZXMuZWFjaChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgJCgnLnBhZ2UnKVxuICAgICAgICAgICAgICAgICAgICAuaGlkZSgpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnc3dpcGVyLXNsaWRlLWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2UgPSAkKHRoaXMpLmRhdGEoJ3BhZ2UnKTtcblxuICAgICAgICAgICAgICAgICAgICBwYWdlUHJldiA9IG15U3dpcGVyLnNsaWRlcy5lcShlIC0gMSkuZGF0YSgncGFnZS10aXRsZScpO1xuICAgICAgICAgICAgICAgICAgICBwYWdlTmV4dCA9IG15U3dpcGVyLnNsaWRlcy5lcShlICsgMSkuZGF0YSgncGFnZS10aXRsZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICRhcnJvd1ByZXYuZmluZCgnc3BhbicpLnRleHQocGFnZVByZXYpO1xuICAgICAgICAgICAgICAgICAgICAkYXJyb3dOZXh0LmZpbmQoJ3NwYW4nKS50ZXh0KHBhZ2VOZXh0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkKCcucGFnZS0tJyArIHBhZ2UpXG4gICAgICAgICAgICAgICAgICAgIC5zaG93KClcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBpbml0OiBmYWxzZSxcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgICBsb29wQWRkaXRpb25hbFNsaWRlczogMSxcbiAgICAgICAgICAgIHNwZWVkOiAxMjAwLFxuICAgICAgICAgICAgZWZmZWN0OiAnY3ViZScsIC8vICdjdWJlJywgJ2ZhZGUnLCAnY292ZXJmbG93JyxcbiAgICAgICAgICAgIGN1YmVFZmZlY3Q6IHtcbiAgICAgICAgICAgICAgICBzaGFkb3c6IGZhbHNlXG4gICAgICAgICAgICAgICAgLy8gc2xpZGVTaGFkb3dzOiB0cnVlLFxuICAgICAgICAgICAgICAgIC8vIHNoYWRvd09mZnNldDogNDBcbiAgICAgICAgICAgICAgICAvLyBzaGFkb3dTY2FsZTogMC45NFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdyYWJDdXJzb3I6IHRydWUsXG4gICAgICAgICAgICAvLyBFdmVudHNcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgaW1hZ2VzUmVhZHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRvdWNoRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTW92ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2xpZGVDaGFuZ2VUcmFuc2l0aW9uRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc01vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrUGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBteVN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyU2VsZWN0b3IsIG9wdGlvbnMpO1xuICAgICAgICBteVN3aXBlci5pbml0KCk7XG5cbiAgICAgICAgJHdpbmRvdy5vbignc2Nyb2xsIHRvdWNobW92ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XG5cbiAgICAgICAgICAgIGlmIChzY3JvbGwgPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gJGhlYWRlckNsb25lLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcygnaXMtZml4ZWQnKTtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiAxMDI0KSB7XG4gICAgICAgICAgICAgICAgICAgICRmaXJzdFNjcmVlbi5hZGRDbGFzcygnc2NhbGUtb3V0Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyAkaGVhZGVyQ2xvbmUucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICAgICAgICAgICRmaXJzdFNjcmVlbi5yZW1vdmVDbGFzcygnc2NhbGUtb3V0Jyk7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkYXJyb3dQcmV2Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCF0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgbXlTd2lwZXIuc2xpZGVQcmV2KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGdvVG9wKCk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG15U3dpcGVyLnNsaWRlUHJldigpO1xuICAgICAgICAgICAgICAgIH0sIDgwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRhcnJvd05leHQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICBteVN3aXBlci5zbGlkZU5leHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ29Ub3AoKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbXlTd2lwZXIuc2xpZGVOZXh0KCk7XG4gICAgICAgICAgICAgICAgfSwgODAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gZ29Ub3AoKSB7XG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNjAwXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSkoKTtcbn0pO1xuIl19
