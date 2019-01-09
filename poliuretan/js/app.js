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
        this.setHeight();

        //Stop drag Img
        $('img').on('dragstart', function (e) {
            e.preventDefault();
        });

        $window.on('resize', function () {
            Main.contentOffset();
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
    setHeight: function setHeight() {
        var width = $window.width();
        var windowHeight = $window.height();
        var headerHeight = $header.height();
        var $content = $('.content');

        $window.on('resize', function () {
            if (width >= $window.width() || width <= $window.width()) {
                changeHeight();
            }
        });
        // .on('scroll touchmove', function() {
        //     let scroll = $(this).scrollTop();
        //     if (scroll > 0) {
        //         $content.css('z-index', 99);
        //     } else {
        //         $content.css('z-index', 10);
        //     }
        // });

        // function changeHeight() {
        //     if ($(window).width() > 480) {
        //         $content.css('margin-top', windowHeight - headerHeight);
        //     } else {
        //         $content.css('padding-top', windowHeight - headerHeight);
        //     }
        // }
        // changeHeight();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkd2luZG93IiwiJCIsIndpbmRvdyIsIiRkb2N1bWVudCIsImRvY3VtZW50IiwiJGh0bWwiLCIkd3JhcHBlciIsIiRoZWFkZXIiLCIkbWFpbiIsIiRvdmVybGF5IiwiTWFpbiIsImluaXQiLCJyZW1vdmVQcmVsb2FkZXIiLCJ2aWRlbyIsImdvVG9wIiwic2V0SGVpZ2h0Iiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJjb250ZW50T2Zmc2V0Iiwic2V0VGltZW91dCIsInJlbW92ZUNsYXNzIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImlucHV0cyIsImlucHV0TWFzayIsImxlbmd0aCIsImlucHV0bWFzayIsIm1hc2siLCIkdmlkZW9Db250YWluZXIiLCIkdmlkZW8iLCJmaW5kIiwiJHBsYXlCdG4iLCJwYXVzZWQiLCJwbGF5IiwiaGlkZSIsInBhdXNlIiwic2hvdyIsIiRmaXJzdFNjcmVlbiIsIiRjb250ZW50IiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJ3aWR0aCIsIndpbmRvd0hlaWdodCIsImhlaWdodCIsImhlYWRlckhlaWdodCIsImNoYW5nZUhlaWdodCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbkZpcnN0VG91Y2giLCJib2R5IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInRpbWVvdXQiLCJpc01vdmUiLCJzbGlkZXJTZWxlY3RvciIsIiRhcnJvd1ByZXYiLCIkYXJyb3dOZXh0IiwicGFnZSIsImNoZWNrUGFnZSIsInBhZ2VOZXh0IiwicGFnZVByZXYiLCJteVN3aXBlciIsInNsaWRlcyIsImVhY2giLCJoYXNDbGFzcyIsImRhdGEiLCJlcSIsInRleHQiLCJhZGRDbGFzcyIsIm9wdGlvbnMiLCJsb29wIiwibG9vcEFkZGl0aW9uYWxTbGlkZXMiLCJzcGVlZCIsImVmZmVjdCIsImN1YmVFZmZlY3QiLCJzaGFkb3ciLCJncmFiQ3Vyc29yIiwiaW1hZ2VzUmVhZHkiLCJlbCIsInRvdWNoRW5kIiwic2xpZGVDaGFuZ2VUcmFuc2l0aW9uRW5kIiwiU3dpcGVyIiwic2Nyb2xsIiwic2xpZGVQcmV2Iiwic2xpZGVOZXh0Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBTUEsVUFBVUMsRUFBRUMsTUFBRixDQUFoQjtBQUNBLElBQU1DLFlBQVlGLEVBQUVHLFFBQUYsQ0FBbEI7QUFDQSxJQUFNQyxRQUFRSixFQUFFLE1BQUYsQ0FBZDtBQUNBLElBQU1LLFdBQVdMLEVBQUUsVUFBRixDQUFqQjtBQUNBLElBQU1NLFVBQVVOLEVBQUUsU0FBRixDQUFoQjtBQUNBLElBQU1PLFFBQVFQLEVBQUUsT0FBRixDQUFkO0FBQ0EsSUFBTVEsV0FBV1IsRUFBRSxhQUFGLENBQWpCOztBQUVBOzs7OztBQUtBLElBQU1TLE9BQU87QUFDVEMsVUFBTSxnQkFBVztBQUNiLGFBQUtDLGVBQUw7QUFDQSxhQUFLQyxLQUFMO0FBQ0EsYUFBS0MsS0FBTDtBQUNBLGFBQUtDLFNBQUw7O0FBRUE7QUFDQWQsVUFBRSxLQUFGLEVBQVNlLEVBQVQsQ0FBWSxXQUFaLEVBQXlCLFVBQVNDLENBQVQsRUFBWTtBQUNqQ0EsY0FBRUMsY0FBRjtBQUNILFNBRkQ7O0FBSUFsQixnQkFBUWdCLEVBQVIsQ0FBVyxRQUFYLEVBQXFCLFlBQVc7QUFDNUJOLGlCQUFLUyxhQUFMO0FBQ0gsU0FGRDtBQUdILEtBZlE7QUFnQlQ7QUFDQVAscUJBQWlCLDJCQUFXO0FBQ3hCUSxtQkFBVyxZQUFNO0FBQ2JuQixjQUFFLE1BQUYsRUFBVW9CLFdBQVYsQ0FBc0IsU0FBdEI7QUFDSCxTQUZELEVBRUcsSUFGSDtBQUdILEtBckJRO0FBc0JUUCxXQUFPLGlCQUFXO0FBQ2RiLFVBQUUsWUFBRixFQUFnQmUsRUFBaEIsQ0FBbUIsT0FBbkIsRUFBNEIsVUFBU0MsQ0FBVCxFQUFZO0FBQ3BDQSxjQUFFQyxjQUFGO0FBQ0FqQixjQUFFLFlBQUYsRUFBZ0JxQixPQUFoQixDQUNJO0FBQ0lDLDJCQUFXO0FBRGYsYUFESixFQUlJLEdBSko7QUFNSCxTQVJEO0FBU0gsS0FoQ1E7QUFpQ1RDLFlBQVE7QUFDSmIsY0FBTSxnQkFBVztBQUNiLGlCQUFLYyxTQUFMO0FBQ0gsU0FIRztBQUlKO0FBQ0FBLG1CQUFXLHFCQUFXO0FBQ2xCLGdCQUFJeEIsRUFBRSxnQkFBRixFQUFvQnlCLE1BQXhCLEVBQWdDO0FBQzVCekIsa0JBQUUsZ0JBQUYsRUFBb0IwQixTQUFwQixDQUE4QjtBQUMxQkMsMEJBQU07QUFEb0IsaUJBQTlCO0FBR0g7QUFDSjtBQVhHLEtBakNDO0FBOENUZixXQUFPLGlCQUFXO0FBQ2QsWUFBSWdCLGtCQUFrQjVCLEVBQUUsV0FBRixDQUF0QjtBQUNBLFlBQUk2QixTQUFTRCxnQkFBZ0JFLElBQWhCLENBQXFCLE9BQXJCLENBQWI7QUFDQSxZQUFJQyxXQUFXSCxnQkFBZ0JFLElBQWhCLENBQXFCLGFBQXJCLENBQWY7O0FBRUFELGVBQU9kLEVBQVAsQ0FBVSxPQUFWLEVBQW1CLFVBQVNDLENBQVQsRUFBWTtBQUMzQixnQkFBSSxLQUFLZ0IsTUFBVCxFQUFpQjtBQUNiLHFCQUFLQyxJQUFMO0FBQ0FGLHlCQUFTRyxJQUFUO0FBQ0gsYUFIRCxNQUdPO0FBQ0gscUJBQUtDLEtBQUw7QUFDQUoseUJBQVNLLElBQVQ7QUFDSDtBQUNEcEIsY0FBRUMsY0FBRjtBQUNILFNBVEQ7QUFVSCxLQTdEUTtBQThEVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsbUJBQWUseUJBQVc7QUFDdEIsWUFBSW1CLGVBQWVyQyxFQUFFLG1CQUFGLENBQW5CO0FBQ0EsWUFBSXNDLFdBQVd0QyxFQUFFLFVBQUYsQ0FBZjs7QUFFQXNDLGlCQUFTQyxHQUFULENBQWEsYUFBYixFQUE0QkYsYUFBYUcsV0FBYixDQUF5QixJQUF6QixDQUE1QjtBQUNILEtBekZRO0FBMEZUMUIsZUFBVyxxQkFBVztBQUNsQixZQUFJMkIsUUFBUTFDLFFBQVEwQyxLQUFSLEVBQVo7QUFDQSxZQUFJQyxlQUFlM0MsUUFBUTRDLE1BQVIsRUFBbkI7QUFDQSxZQUFJQyxlQUFldEMsUUFBUXFDLE1BQVIsRUFBbkI7QUFDQSxZQUFJTCxXQUFXdEMsRUFBRSxVQUFGLENBQWY7O0FBRUFELGdCQUFRZ0IsRUFBUixDQUFXLFFBQVgsRUFBcUIsWUFBVztBQUM1QixnQkFBSTBCLFNBQVMxQyxRQUFRMEMsS0FBUixFQUFULElBQTRCQSxTQUFTMUMsUUFBUTBDLEtBQVIsRUFBekMsRUFBMEQ7QUFDdERJO0FBQ0g7QUFDSixTQUpEO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUF0SFEsQ0FBYjs7QUF5SEE7O0FBRUE3QyxFQUFFLFlBQVc7QUFDVEEsTUFBRVMsS0FBS0MsSUFBTCxFQUFGOztBQUVBVCxXQUFPNkMsZ0JBQVAsQ0FDSSxZQURKLEVBRUksU0FBU0MsWUFBVCxHQUF3QjtBQUNwQjtBQUNBNUMsaUJBQVM2QyxJQUFULENBQWNDLFNBQWQsQ0FBd0JDLE1BQXhCLENBQStCLGdCQUEvQjs7QUFFQTtBQUNBakQsZUFBT2tELG1CQUFQLENBQTJCLFlBQTNCLEVBQXlDSixZQUF6QyxFQUF1RCxLQUF2RDtBQUNILEtBUkwsRUFTSSxLQVRKOztBQVlBLEtBQUMsWUFBVztBQUNSLFlBQUlLLFVBQVUsS0FBZDtBQUNBLFlBQUlDLFNBQVMsS0FBYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSWhCLGVBQWVuQyxVQUFVNEIsSUFBVixDQUFlLGNBQWYsQ0FBbkI7O0FBRUEsWUFBSXdCLGlCQUFpQixtQkFBckI7QUFDQSxZQUFJQyxhQUFhdkQsRUFBRSwrQkFBRixDQUFqQjtBQUNBLFlBQUl3RCxhQUFheEQsRUFBRSwrQkFBRixDQUFqQjtBQUNBLFlBQUl5RCxhQUFKOztBQUVBLGlCQUFTQyxTQUFULEdBQXFCO0FBQ2pCLGdCQUFJQyxpQkFBSjtBQUFBLGdCQUFjQyxpQkFBZDtBQUNBQyxxQkFBU0MsTUFBVCxDQUFnQkMsSUFBaEIsQ0FBcUIsVUFBUy9DLENBQVQsRUFBWTtBQUM3QmhCLGtCQUFFLE9BQUYsRUFDS2tDLElBREwsR0FFS2QsV0FGTCxDQUVpQixXQUZqQjs7QUFJQSxvQkFBSXBCLEVBQUUsSUFBRixFQUFRZ0UsUUFBUixDQUFpQixxQkFBakIsQ0FBSixFQUE2QztBQUN6Q1AsMkJBQU96RCxFQUFFLElBQUYsRUFBUWlFLElBQVIsQ0FBYSxNQUFiLENBQVA7O0FBRUFMLCtCQUFXQyxTQUFTQyxNQUFULENBQWdCSSxFQUFoQixDQUFtQmxELElBQUksQ0FBdkIsRUFBMEJpRCxJQUExQixDQUErQixZQUEvQixDQUFYO0FBQ0FOLCtCQUFXRSxTQUFTQyxNQUFULENBQWdCSSxFQUFoQixDQUFtQmxELElBQUksQ0FBdkIsRUFBMEJpRCxJQUExQixDQUErQixZQUEvQixDQUFYOztBQUVBViwrQkFBV3pCLElBQVgsQ0FBZ0IsTUFBaEIsRUFBd0JxQyxJQUF4QixDQUE2QlAsUUFBN0I7QUFDQUosK0JBQVcxQixJQUFYLENBQWdCLE1BQWhCLEVBQXdCcUMsSUFBeEIsQ0FBNkJSLFFBQTdCO0FBQ0g7O0FBRUQzRCxrQkFBRSxZQUFZeUQsSUFBZCxFQUNLckIsSUFETCxHQUVLZ0MsUUFGTCxDQUVjLFdBRmQ7QUFHSCxhQWxCRDtBQW1CSDs7QUFFRCxZQUFJQyxVQUFVO0FBQ1YzRCxrQkFBTSxLQURJO0FBRVY0RCxrQkFBTSxJQUZJO0FBR1ZDLGtDQUFzQixDQUhaO0FBSVZDLG1CQUFPLElBSkc7QUFLVkMsb0JBQVEsTUFMRSxFQUtNO0FBQ2hCQyx3QkFBWTtBQUNSQyx3QkFBUTtBQUNSO0FBQ0E7QUFDQTtBQUpRLGFBTkY7QUFZVkMsd0JBQVksSUFaRjtBQWFWO0FBQ0E3RCxnQkFBSTtBQUNBOEQsNkJBQWEsdUJBQVc7QUFDcEIseUJBQUtDLEVBQUwsQ0FBUTdCLFNBQVIsQ0FBa0JDLE1BQWxCLENBQXlCLFNBQXpCO0FBQ0gsaUJBSEQ7QUFJQTZCLDBCQUFVLG9CQUFXO0FBQ2pCNUQsK0JBQVcsWUFBVztBQUNsQmtDLGlDQUFTLEtBQVQ7QUFDSCxxQkFGRCxFQUVHLEdBRkg7QUFHSCxpQkFSRDtBQVNBMkIsMENBQTBCLG9DQUFXO0FBQ2pDLHdCQUFJLENBQUMzQixNQUFMLEVBQWE7QUFDVEs7QUFDSDtBQUNKO0FBYkQ7QUFkTSxTQUFkOztBQStCQSxZQUFJRyxXQUFXLElBQUlvQixNQUFKLENBQVczQixjQUFYLEVBQTJCZSxPQUEzQixDQUFmO0FBQ0FSLGlCQUFTbkQsSUFBVDs7QUFFQVgsZ0JBQVFnQixFQUFSLENBQVcsa0JBQVgsRUFBK0IsWUFBVztBQUN0QyxnQkFBSW1FLFNBQVNsRixFQUFFLElBQUYsRUFBUXNCLFNBQVIsRUFBYjs7QUFFQSxnQkFBSTRELFNBQVMsQ0FBYixFQUFnQjtBQUNaO0FBQ0E1RSx3QkFBUThELFFBQVIsQ0FBaUIsVUFBakI7QUFDQWhCLDBCQUFVLElBQVY7QUFDQSxvQkFBSXBELEVBQUVDLE1BQUYsRUFBVXdDLEtBQVYsS0FBb0IsSUFBeEIsRUFBOEI7QUFDMUJKLGlDQUFhK0IsUUFBYixDQUFzQixXQUF0QjtBQUNIO0FBQ0osYUFQRCxNQU9PO0FBQ0g7QUFDQTlELHdCQUFRYyxXQUFSLENBQW9CLFVBQXBCO0FBQ0FpQiw2QkFBYWpCLFdBQWIsQ0FBeUIsV0FBekI7QUFDQWdDLDBCQUFVLEtBQVY7QUFDSDtBQUNKLFNBaEJEOztBQWtCQUcsbUJBQVd4QyxFQUFYLENBQWMsT0FBZCxFQUF1QixZQUFXO0FBQzlCLGdCQUFJLENBQUNxQyxPQUFMLEVBQWM7QUFDVlMseUJBQVNzQixTQUFUO0FBQ0gsYUFGRCxNQUVPO0FBQ0h0RTtBQUNBTSwyQkFBVyxZQUFNO0FBQ2IwQyw2QkFBU3NCLFNBQVQ7QUFDSCxpQkFGRCxFQUVHLEdBRkg7QUFHSDtBQUNKLFNBVEQ7O0FBV0EzQixtQkFBV3pDLEVBQVgsQ0FBYyxPQUFkLEVBQXVCLFlBQVc7QUFDOUIsZ0JBQUksQ0FBQ3FDLE9BQUwsRUFBYztBQUNWUyx5QkFBU3VCLFNBQVQ7QUFDSCxhQUZELE1BRU87QUFDSHZFO0FBQ0FNLDJCQUFXLFlBQU07QUFDYjBDLDZCQUFTdUIsU0FBVDtBQUNILGlCQUZELEVBRUcsR0FGSDtBQUdIO0FBQ0osU0FURDs7QUFXQSxpQkFBU3ZFLEtBQVQsR0FBaUI7QUFDYmIsY0FBRSxZQUFGLEVBQWdCcUIsT0FBaEIsQ0FDSTtBQUNJQywyQkFBVztBQURmLGFBREosRUFJSSxHQUpKO0FBTUg7QUFDSixLQXpIRDtBQTBISCxDQXpJRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0dsb2JhbCBWYXJzXG5jb25zdCAkd2luZG93ID0gJCh3aW5kb3cpO1xuY29uc3QgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG5jb25zdCAkaHRtbCA9ICQoJ2h0bWwnKTtcbmNvbnN0ICR3cmFwcGVyID0gJCgnLndyYXBwZXInKTtcbmNvbnN0ICRoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XG5jb25zdCAkbWFpbiA9ICQoJy5tYWluJyk7XG5jb25zdCAkb3ZlcmxheSA9ICQoJy5qcy1vdmVybGF5Jyk7XG5cbi8qKlxuICogTWFpblxuICpcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XG4gKi9cbmNvbnN0IE1haW4gPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlUHJlbG9hZGVyKCk7XG4gICAgICAgIHRoaXMudmlkZW8oKTtcbiAgICAgICAgdGhpcy5nb1RvcCgpO1xuICAgICAgICB0aGlzLnNldEhlaWdodCgpO1xuXG4gICAgICAgIC8vU3RvcCBkcmFnIEltZ1xuICAgICAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkd2luZG93Lm9uKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIE1haW4uY29udGVudE9mZnNldCgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIC8vUmVtb3ZlIHByZWxvYWRlclxuICAgIHJlbW92ZVByZWxvYWRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH0sXG4gICAgZ29Ub3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDgwMFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBpbnB1dHM6IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0TWFzaygpO1xuICAgICAgICB9LFxuICAgICAgICAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcbiAgICAgICAgaW5wdXRNYXNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OSdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgdmlkZW86IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgJHZpZGVvQ29udGFpbmVyID0gJCgnLmpzLXZpZGVvJyk7XG4gICAgICAgIGxldCAkdmlkZW8gPSAkdmlkZW9Db250YWluZXIuZmluZCgndmlkZW8nKTtcbiAgICAgICAgbGV0ICRwbGF5QnRuID0gJHZpZGVvQ29udGFpbmVyLmZpbmQoJy52aWRlb19fYnRuJyk7XG5cbiAgICAgICAgJHZpZGVvLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICAgICAgICAgICRwbGF5QnRuLmhpZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICRwbGF5QnRuLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICAvLyBzY3JvbGxFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICBsZXQgaGVhZGVySGVpZ2h0ID0gJGhlYWRlci5vdXRlckhlaWdodCh0cnVlKTtcbiAgICAvLyAgICAgbGV0ICRoZWFkZXJDbG9uZSA9ICRoZWFkZXJcbiAgICAvLyAgICAgICAgIC5jbG9uZSgpXG4gICAgLy8gICAgICAgICAuYWRkQ2xhc3MoJ2hlYWRlci0tY2xvbmUgaGVhZGVyLS1maXhlZCcpXG4gICAgLy8gICAgICAgICAuaW5zZXJ0QWZ0ZXIoJy5oZWFkZXInKTtcbiAgICAvLyAgICAgbGV0ICRmaXJzdFNjcmVlbiA9ICRkb2N1bWVudC5maW5kKCcuZmlyc3RzY3JlZW4nKTtcblxuICAgIC8vICAgICAkd2luZG93Lm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgICAgIGxldCBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xuXG4gICAgLy8gICAgICAgICBpZiAoc2Nyb2xsID4gaGVhZGVySGVpZ2h0KSB7XG4gICAgLy8gICAgICAgICAgICAgJGhlYWRlckNsb25lLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgLy8gICAgICAgICAgICAgJGZpcnN0U2NyZWVuLmFkZENsYXNzKCdzY2FsZS1vdXQnKTtcbiAgICAvLyAgICAgICAgICAgICBNYWluLnJ1blRpbWVvdXQgPSB0cnVlO1xuICAgIC8vICAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICAkaGVhZGVyQ2xvbmUucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAvLyAgICAgICAgICAgICAkZmlyc3RTY3JlZW4ucmVtb3ZlQ2xhc3MoJ3NjYWxlLW91dCcpO1xuICAgIC8vICAgICAgICAgICAgIE1haW4ucnVuVGltZW91dCA9IGZhbHNlO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KTtcbiAgICAvLyB9LFxuICAgIGNvbnRlbnRPZmZzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgJGZpcnN0U2NyZWVuID0gJCgnLnN3aXBlci1jb250YWluZXInKTtcbiAgICAgICAgbGV0ICRjb250ZW50ID0gJCgnLmNvbnRlbnQnKTtcblxuICAgICAgICAkY29udGVudC5jc3MoJ3BhZGRpbmctdG9wJywgJGZpcnN0U2NyZWVuLm91dGVySGVpZ2h0KHRydWUpKTtcbiAgICB9LFxuICAgIHNldEhlaWdodDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCB3aWR0aCA9ICR3aW5kb3cud2lkdGgoKTtcbiAgICAgICAgbGV0IHdpbmRvd0hlaWdodCA9ICR3aW5kb3cuaGVpZ2h0KCk7XG4gICAgICAgIGxldCBoZWFkZXJIZWlnaHQgPSAkaGVhZGVyLmhlaWdodCgpO1xuICAgICAgICBsZXQgJGNvbnRlbnQgPSAkKCcuY29udGVudCcpO1xuXG4gICAgICAgICR3aW5kb3cub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHdpZHRoID49ICR3aW5kb3cud2lkdGgoKSB8fCB3aWR0aCA8PSAkd2luZG93LndpZHRoKCkpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VIZWlnaHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIC5vbignc2Nyb2xsIHRvdWNobW92ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyAgICAgbGV0IHNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XG4gICAgICAgIC8vICAgICBpZiAoc2Nyb2xsID4gMCkge1xuICAgICAgICAvLyAgICAgICAgICRjb250ZW50LmNzcygnei1pbmRleCcsIDk5KTtcbiAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgJGNvbnRlbnQuY3NzKCd6LWluZGV4JywgMTApO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KTtcblxuICAgICAgICAvLyBmdW5jdGlvbiBjaGFuZ2VIZWlnaHQoKSB7XG4gICAgICAgIC8vICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcbiAgICAgICAgLy8gICAgICAgICAkY29udGVudC5jc3MoJ21hcmdpbi10b3AnLCB3aW5kb3dIZWlnaHQgLSBoZWFkZXJIZWlnaHQpO1xuICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICAkY29udGVudC5jc3MoJ3BhZGRpbmctdG9wJywgd2luZG93SGVpZ2h0IC0gaGVhZGVySGVpZ2h0KTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBjaGFuZ2VIZWlnaHQoKTtcbiAgICB9XG59O1xuXG4vLyBJbml0aWFsaXplIHNsaWRlclxuXG4kKGZ1bmN0aW9uKCkge1xuICAgICQoTWFpbi5pbml0KCkpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICd0b3VjaHN0YXJ0JyxcbiAgICAgICAgZnVuY3Rpb24gb25GaXJzdFRvdWNoKCkge1xuICAgICAgICAgICAgLy8gd2UgY291bGQgdXNlIGEgY2xhc3NcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbm8tdG91Y2hldmVudHMnKTtcblxuICAgICAgICAgICAgLy8gd2Ugb25seSBuZWVkIHRvIGtub3cgb25jZSB0aGF0IGEgaHVtYW4gdG91Y2hlZCB0aGUgc2NyZWVuLCBzbyB3ZSBjYW4gc3RvcCBsaXN0ZW5pbmcgbm93XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG9uRmlyc3RUb3VjaCwgZmFsc2UpO1xuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICk7XG5cbiAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCB0aW1lb3V0ID0gZmFsc2U7XG4gICAgICAgIGxldCBpc01vdmUgPSBmYWxzZTtcblxuICAgICAgICAvLyBsZXQgaGVhZGVySGVpZ2h0ID0gJGhlYWRlci5vdXRlckhlaWdodCh0cnVlKTtcbiAgICAgICAgLy8gbGV0ICRoZWFkZXJDbG9uZSA9ICRoZWFkZXJcbiAgICAgICAgLy8gICAgIC5jbG9uZSgpXG4gICAgICAgIC8vICAgICAuYWRkQ2xhc3MoJ2hlYWRlci0tY2xvbmUgaGVhZGVyLS1maXhlZCcpXG4gICAgICAgIC8vICAgICAuaW5zZXJ0QWZ0ZXIoJy5oZWFkZXInKTtcbiAgICAgICAgbGV0ICRmaXJzdFNjcmVlbiA9ICRkb2N1bWVudC5maW5kKCcuZmlyc3RzY3JlZW4nKTtcblxuICAgICAgICBsZXQgc2xpZGVyU2VsZWN0b3IgPSAnLnN3aXBlci1jb250YWluZXInO1xuICAgICAgICBsZXQgJGFycm93UHJldiA9ICQoJy5qcy1wYWdlLWNvbnRyb2xzLWFycm93LS1wcmV2Jyk7XG4gICAgICAgIGxldCAkYXJyb3dOZXh0ID0gJCgnLmpzLXBhZ2UtY29udHJvbHMtYXJyb3ctLW5leHQnKTtcbiAgICAgICAgbGV0IHBhZ2U7XG5cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tQYWdlKCkge1xuICAgICAgICAgICAgbGV0IHBhZ2VOZXh0LCBwYWdlUHJldjtcbiAgICAgICAgICAgIG15U3dpcGVyLnNsaWRlcy5lYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAkKCcucGFnZScpXG4gICAgICAgICAgICAgICAgICAgIC5oaWRlKClcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdzd2lwZXItc2xpZGUtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZSA9ICQodGhpcykuZGF0YSgncGFnZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VQcmV2ID0gbXlTd2lwZXIuc2xpZGVzLmVxKGUgLSAxKS5kYXRhKCdwYWdlLXRpdGxlJyk7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VOZXh0ID0gbXlTd2lwZXIuc2xpZGVzLmVxKGUgKyAxKS5kYXRhKCdwYWdlLXRpdGxlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGFycm93UHJldi5maW5kKCdzcGFuJykudGV4dChwYWdlUHJldik7XG4gICAgICAgICAgICAgICAgICAgICRhcnJvd05leHQuZmluZCgnc3BhbicpLnRleHQocGFnZU5leHQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICQoJy5wYWdlLS0nICsgcGFnZSlcbiAgICAgICAgICAgICAgICAgICAgLnNob3coKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGluaXQ6IGZhbHNlLFxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgIGxvb3BBZGRpdGlvbmFsU2xpZGVzOiAxLFxuICAgICAgICAgICAgc3BlZWQ6IDEyMDAsXG4gICAgICAgICAgICBlZmZlY3Q6ICdjdWJlJywgLy8gJ2N1YmUnLCAnZmFkZScsICdjb3ZlcmZsb3cnLFxuICAgICAgICAgICAgY3ViZUVmZmVjdDoge1xuICAgICAgICAgICAgICAgIHNoYWRvdzogZmFsc2VcbiAgICAgICAgICAgICAgICAvLyBzbGlkZVNoYWRvd3M6IHRydWUsXG4gICAgICAgICAgICAgICAgLy8gc2hhZG93T2Zmc2V0OiA0MFxuICAgICAgICAgICAgICAgIC8vIHNoYWRvd1NjYWxlOiAwLjk0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ3JhYkN1cnNvcjogdHJ1ZSxcbiAgICAgICAgICAgIC8vIEV2ZW50c1xuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBpbWFnZXNSZWFkeTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgnbG9hZGluZycpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdG91Y2hFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNNb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzbGlkZUNoYW5nZVRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTW92ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tQYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IG15U3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXJTZWxlY3Rvciwgb3B0aW9ucyk7XG4gICAgICAgIG15U3dpcGVyLmluaXQoKTtcblxuICAgICAgICAkd2luZG93Lm9uKCdzY3JvbGwgdG91Y2htb3ZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgc2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcblxuICAgICAgICAgICAgaWYgKHNjcm9sbCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyAkaGVhZGVyQ2xvbmUuYWRkQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDEwMjQpIHtcbiAgICAgICAgICAgICAgICAgICAgJGZpcnN0U2NyZWVuLmFkZENsYXNzKCdzY2FsZS1vdXQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vICRoZWFkZXJDbG9uZS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2lzLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgJGZpcnN0U2NyZWVuLnJlbW92ZUNsYXNzKCdzY2FsZS1vdXQnKTtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRhcnJvd1ByZXYub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICBteVN3aXBlci5zbGlkZVByZXYoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ29Ub3AoKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbXlTd2lwZXIuc2xpZGVQcmV2KCk7XG4gICAgICAgICAgICAgICAgfSwgODAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGFycm93TmV4dC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghdGltZW91dCkge1xuICAgICAgICAgICAgICAgIG15U3dpcGVyLnNsaWRlTmV4dCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBnb1RvcCgpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBteVN3aXBlci5zbGlkZU5leHQoKTtcbiAgICAgICAgICAgICAgICB9LCA4MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBnb1RvcCgpIHtcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA2MDBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9KSgpO1xufSk7XG4iXX0=
