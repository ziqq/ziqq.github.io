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
    }
    // setHeight: function() {
    //     let width = $window.width();
    //     let windowHeight = $window.height();
    //     let headerHeight = $header.height();
    //     let $content = $('.content');

    //     $window.on('resize', function() {
    //         if (width >= $window.width() || width <= $window.width()) {
    //             changeHeight();
    //         }
    //     });
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
    // }
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkd2luZG93IiwiJCIsIndpbmRvdyIsIiRkb2N1bWVudCIsImRvY3VtZW50IiwiJGh0bWwiLCIkd3JhcHBlciIsIiRoZWFkZXIiLCIkbWFpbiIsIiRvdmVybGF5IiwiTWFpbiIsImluaXQiLCJyZW1vdmVQcmVsb2FkZXIiLCJ2aWRlbyIsImdvVG9wIiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJjb250ZW50T2Zmc2V0Iiwic2V0VGltZW91dCIsInJlbW92ZUNsYXNzIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImlucHV0cyIsImlucHV0TWFzayIsImxlbmd0aCIsImlucHV0bWFzayIsIm1hc2siLCIkdmlkZW9Db250YWluZXIiLCIkdmlkZW8iLCJmaW5kIiwiJHBsYXlCdG4iLCJwYXVzZWQiLCJwbGF5IiwiaGlkZSIsInBhdXNlIiwic2hvdyIsIiRmaXJzdFNjcmVlbiIsIiRjb250ZW50IiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJhZGRFdmVudExpc3RlbmVyIiwib25GaXJzdFRvdWNoIiwiYm9keSIsImNsYXNzTGlzdCIsInJlbW92ZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ0aW1lb3V0IiwiaXNNb3ZlIiwic2xpZGVyU2VsZWN0b3IiLCIkYXJyb3dQcmV2IiwiJGFycm93TmV4dCIsInBhZ2UiLCJjaGVja1BhZ2UiLCJwYWdlTmV4dCIsInBhZ2VQcmV2IiwibXlTd2lwZXIiLCJzbGlkZXMiLCJlYWNoIiwiaGFzQ2xhc3MiLCJkYXRhIiwiZXEiLCJ0ZXh0IiwiYWRkQ2xhc3MiLCJvcHRpb25zIiwibG9vcCIsImxvb3BBZGRpdGlvbmFsU2xpZGVzIiwic3BlZWQiLCJlZmZlY3QiLCJjdWJlRWZmZWN0Iiwic2hhZG93IiwiZ3JhYkN1cnNvciIsImltYWdlc1JlYWR5IiwiZWwiLCJ0b3VjaEVuZCIsInNsaWRlQ2hhbmdlVHJhbnNpdGlvbkVuZCIsIlN3aXBlciIsInNjcm9sbCIsIndpZHRoIiwic2xpZGVQcmV2Iiwic2xp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QUFiLEVBQWdCO0FBQ1o7QUFDQXRFLHdCQUFRd0QsUUFBUixDQUFpQixVQUFqQjtBQUNBaEIsMEJBQVUsSUFBVjtBQUNBLG9CQUFJOUMsRUFBRUMsTUFBRixFQUFVNEUsS0FBVixLQUFvQixJQUF4QixFQUE4QjtBQUMxQnpDLGlDQUFhMEIsUUFBYixDQUFzQixXQUF0QjtBQUNIO0FBQ0osYUFQRCxNQU9PO0FBQ0g7QUFDQXhELHdCQUFRYSxXQUFSLENBQW9CLFVBQXBCO0FBQ0FpQiw2QkFBYWpCLFdBQWIsQ0FBeUIsV0FBekI7QUFDQTJCLDBCQUFVLEtBQVY7QUFDSDtBQUNKLFNBaEJEOztBQWtCQUcsbUJBQVduQyxFQUFYLENBQWMsT0FBZCxFQUF1QixZQUFXO0FBQzlCLGdCQUFJLENBQUNnQyxPQUFMLEVBQWM7QUFDVlMseUJBQVN1QixTQUFUO0FBQ0gsYUFGRCxNQUVPO0FBQ0hqRTtBQUNBSywyQkFBVyxZQUFNO0FBQ2JxQyw2QkFBU3VCLFNBQVQ7QUFDSCxpQkFGRCxFQUVHLEdBRkg7QUFHSDtBQUNKLFNBVEQ7O0FBV0E1QixtQkFBV3BDLEVBQVgsQ0FBYyxPQUFkLEVBQXVCLFlBQVc7QUFDOUIsZ0JBQUksQ0FBQ2dDLE9BQUwsRUFBYztBQUNWUyx5QkFBU3dCLFNBQVQ7QUFDSCxhQUZELE1BRU87QUFDSGxFO0FBQ0FLLDJCQUFXLFlBQU07QUFDYnFDLDZCQUFTd0IsU0FBVDtBQUNILGlCQUZELEVBRUcsR0FGSDtBQUdIO0FBQ0osU0FURDs7QUFXQSxpQkFBU2xFLEtBQVQsR0FBaUI7QUFDYmIsY0FBRSxZQUFGLEVBQWdCb0IsT0FBaEIsQ0FDSTtBQUNJQywyQkFBVztBQURmLGFBREosRUFJSSxHQUpKO0FBTUg7QUFDSixLQXpIRDtBQTBISCxDQXpJRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0dsb2JhbCBWYXJzXG5jb25zdCAkd2luZG93ID0gJCh3aW5kb3cpO1xuY29uc3QgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG5jb25zdCAkaHRtbCA9ICQoJ2h0bWwnKTtcbmNvbnN0ICR3cmFwcGVyID0gJCgnLndyYXBwZXInKTtcbmNvbnN0ICRoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XG5jb25zdCAkbWFpbiA9ICQoJy5tYWluJyk7XG5jb25zdCAkb3ZlcmxheSA9ICQoJy5qcy1vdmVybGF5Jyk7XG5cbi8qKlxuICogTWFpblxuICpcbiAqIEBhdXRob3IgQW50b24gVXN0aW5vZmYgPGEuYS51c3Rpbm9mZkBnbWFpbC5jb20+XG4gKi9cbmNvbnN0IE1haW4gPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlUHJlbG9hZGVyKCk7XG4gICAgICAgIHRoaXMudmlkZW8oKTtcbiAgICAgICAgdGhpcy5nb1RvcCgpO1xuICAgICAgICAvLyB0aGlzLnNldEhlaWdodCgpO1xuXG4gICAgICAgIC8vU3RvcCBkcmFnIEltZ1xuICAgICAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkd2luZG93Lm9uKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIE1haW4uY29udGVudE9mZnNldCgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIC8vUmVtb3ZlIHByZWxvYWRlclxuICAgIHJlbW92ZVByZWxvYWRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH0sXG4gICAgZ29Ub3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuanMtZ28tdG9wJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDgwMFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBpbnB1dHM6IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0TWFzaygpO1xuICAgICAgICB9LFxuICAgICAgICAvL01hc2tlZCBpbnB1dG1hc2sgaHR0cHM6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9JbnB1dG1hc2tcbiAgICAgICAgaW5wdXRNYXNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKCcuanMtcGhvbmUtbWFzaycpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQoJy5qcy1waG9uZS1tYXNrJykuaW5wdXRtYXNrKHtcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJys3ICg5OTkpIDk5OS05OS05OSdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgdmlkZW86IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgJHZpZGVvQ29udGFpbmVyID0gJCgnLmpzLXZpZGVvJyk7XG4gICAgICAgIGxldCAkdmlkZW8gPSAkdmlkZW9Db250YWluZXIuZmluZCgndmlkZW8nKTtcbiAgICAgICAgbGV0ICRwbGF5QnRuID0gJHZpZGVvQ29udGFpbmVyLmZpbmQoJy52aWRlb19fYnRuJyk7XG5cbiAgICAgICAgJHZpZGVvLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICAgICAgICAgICRwbGF5QnRuLmhpZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICRwbGF5QnRuLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICAvLyBzY3JvbGxFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICBsZXQgaGVhZGVySGVpZ2h0ID0gJGhlYWRlci5vdXRlckhlaWdodCh0cnVlKTtcbiAgICAvLyAgICAgbGV0ICRoZWFkZXJDbG9uZSA9ICRoZWFkZXJcbiAgICAvLyAgICAgICAgIC5jbG9uZSgpXG4gICAgLy8gICAgICAgICAuYWRkQ2xhc3MoJ2hlYWRlci0tY2xvbmUgaGVhZGVyLS1maXhlZCcpXG4gICAgLy8gICAgICAgICAuaW5zZXJ0QWZ0ZXIoJy5oZWFkZXInKTtcbiAgICAvLyAgICAgbGV0ICRmaXJzdFNjcmVlbiA9ICRkb2N1bWVudC5maW5kKCcuZmlyc3RzY3JlZW4nKTtcblxuICAgIC8vICAgICAkd2luZG93Lm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgICAgIGxldCBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xuXG4gICAgLy8gICAgICAgICBpZiAoc2Nyb2xsID4gaGVhZGVySGVpZ2h0KSB7XG4gICAgLy8gICAgICAgICAgICAgJGhlYWRlckNsb25lLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgLy8gICAgICAgICAgICAgJGZpcnN0U2NyZWVuLmFkZENsYXNzKCdzY2FsZS1vdXQnKTtcbiAgICAvLyAgICAgICAgICAgICBNYWluLnJ1blRpbWVvdXQgPSB0cnVlO1xuICAgIC8vICAgICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgICAgICAkaGVhZGVyQ2xvbmUucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAvLyAgICAgICAgICAgICAkZmlyc3RTY3JlZW4ucmVtb3ZlQ2xhc3MoJ3NjYWxlLW91dCcpO1xuICAgIC8vICAgICAgICAgICAgIE1haW4ucnVuVGltZW91dCA9IGZhbHNlO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KTtcbiAgICAvLyB9LFxuICAgIGNvbnRlbnRPZmZzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgJGZpcnN0U2NyZWVuID0gJCgnLnN3aXBlci1jb250YWluZXInKTtcbiAgICAgICAgbGV0ICRjb250ZW50ID0gJCgnLmNvbnRlbnQnKTtcblxuICAgICAgICAkY29udGVudC5jc3MoJ3BhZGRpbmctdG9wJywgJGZpcnN0U2NyZWVuLm91dGVySGVpZ2h0KHRydWUpKTtcbiAgICB9XG4gICAgLy8gc2V0SGVpZ2h0OiBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgbGV0IHdpZHRoID0gJHdpbmRvdy53aWR0aCgpO1xuICAgIC8vICAgICBsZXQgd2luZG93SGVpZ2h0ID0gJHdpbmRvdy5oZWlnaHQoKTtcbiAgICAvLyAgICAgbGV0IGhlYWRlckhlaWdodCA9ICRoZWFkZXIuaGVpZ2h0KCk7XG4gICAgLy8gICAgIGxldCAkY29udGVudCA9ICQoJy5jb250ZW50Jyk7XG5cbiAgICAvLyAgICAgJHdpbmRvdy5vbigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgICAgICBpZiAod2lkdGggPj0gJHdpbmRvdy53aWR0aCgpIHx8IHdpZHRoIDw9ICR3aW5kb3cud2lkdGgoKSkge1xuICAgIC8vICAgICAgICAgICAgIGNoYW5nZUhlaWdodCgpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KTtcbiAgICAvLyAgICAgLy8gLm9uKCdzY3JvbGwgdG91Y2htb3ZlJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgIC8vICAgICBsZXQgc2Nyb2xsID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcbiAgICAvLyAgICAgLy8gICAgIGlmIChzY3JvbGwgPiAwKSB7XG4gICAgLy8gICAgIC8vICAgICAgICAgJGNvbnRlbnQuY3NzKCd6LWluZGV4JywgOTkpO1xuICAgIC8vICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgLy8gICAgICAgICAkY29udGVudC5jc3MoJ3otaW5kZXgnLCAxMCk7XG4gICAgLy8gICAgIC8vICAgICB9XG4gICAgLy8gICAgIC8vIH0pO1xuXG4gICAgLy8gICAgIC8vIGZ1bmN0aW9uIGNoYW5nZUhlaWdodCgpIHtcbiAgICAvLyAgICAgLy8gICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xuICAgIC8vICAgICAvLyAgICAgICAgICRjb250ZW50LmNzcygnbWFyZ2luLXRvcCcsIHdpbmRvd0hlaWdodCAtIGhlYWRlckhlaWdodCk7XG4gICAgLy8gICAgIC8vICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAvLyAgICAgICAgICRjb250ZW50LmNzcygncGFkZGluZy10b3AnLCB3aW5kb3dIZWlnaHQgLSBoZWFkZXJIZWlnaHQpO1xuICAgIC8vICAgICAvLyAgICAgfVxuICAgIC8vICAgICAvLyB9XG4gICAgLy8gICAgIC8vIGNoYW5nZUhlaWdodCgpO1xuICAgIC8vIH1cbn07XG5cbi8vIEluaXRpYWxpemUgc2xpZGVyXG5cbiQoZnVuY3Rpb24oKSB7XG4gICAgJChNYWluLmluaXQoKSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgJ3RvdWNoc3RhcnQnLFxuICAgICAgICBmdW5jdGlvbiBvbkZpcnN0VG91Y2goKSB7XG4gICAgICAgICAgICAvLyB3ZSBjb3VsZCB1c2UgYSBjbGFzc1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCduby10b3VjaGV2ZW50cycpO1xuXG4gICAgICAgICAgICAvLyB3ZSBvbmx5IG5lZWQgdG8ga25vdyBvbmNlIHRoYXQgYSBodW1hbiB0b3VjaGVkIHRoZSBzY3JlZW4sIHNvIHdlIGNhbiBzdG9wIGxpc3RlbmluZyBub3dcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25GaXJzdFRvdWNoLCBmYWxzZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhbHNlXG4gICAgKTtcblxuICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHRpbWVvdXQgPSBmYWxzZTtcbiAgICAgICAgbGV0IGlzTW92ZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGxldCBoZWFkZXJIZWlnaHQgPSAkaGVhZGVyLm91dGVySGVpZ2h0KHRydWUpO1xuICAgICAgICAvLyBsZXQgJGhlYWRlckNsb25lID0gJGhlYWRlclxuICAgICAgICAvLyAgICAgLmNsb25lKClcbiAgICAgICAgLy8gICAgIC5hZGRDbGFzcygnaGVhZGVyLS1jbG9uZSBoZWFkZXItLWZpeGVkJylcbiAgICAgICAgLy8gICAgIC5pbnNlcnRBZnRlcignLmhlYWRlcicpO1xuICAgICAgICBsZXQgJGZpcnN0U2NyZWVuID0gJGRvY3VtZW50LmZpbmQoJy5maXJzdHNjcmVlbicpO1xuXG4gICAgICAgIGxldCBzbGlkZXJTZWxlY3RvciA9ICcuc3dpcGVyLWNvbnRhaW5lcic7XG4gICAgICAgIGxldCAkYXJyb3dQcmV2ID0gJCgnLmpzLXBhZ2UtY29udHJvbHMtYXJyb3ctLXByZXYnKTtcbiAgICAgICAgbGV0ICRhcnJvd05leHQgPSAkKCcuanMtcGFnZS1jb250cm9scy1hcnJvdy0tbmV4dCcpO1xuICAgICAgICBsZXQgcGFnZTtcblxuICAgICAgICBmdW5jdGlvbiBjaGVja1BhZ2UoKSB7XG4gICAgICAgICAgICBsZXQgcGFnZU5leHQsIHBhZ2VQcmV2O1xuICAgICAgICAgICAgbXlTd2lwZXIuc2xpZGVzLmVhY2goZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgICQoJy5wYWdlJylcbiAgICAgICAgICAgICAgICAgICAgLmhpZGUoKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3N3aXBlci1zbGlkZS1hY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgICBwYWdlID0gJCh0aGlzKS5kYXRhKCdwYWdlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgcGFnZVByZXYgPSBteVN3aXBlci5zbGlkZXMuZXEoZSAtIDEpLmRhdGEoJ3BhZ2UtdGl0bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgcGFnZU5leHQgPSBteVN3aXBlci5zbGlkZXMuZXEoZSArIDEpLmRhdGEoJ3BhZ2UtdGl0bGUnKTtcblxuICAgICAgICAgICAgICAgICAgICAkYXJyb3dQcmV2LmZpbmQoJ3NwYW4nKS50ZXh0KHBhZ2VQcmV2KTtcbiAgICAgICAgICAgICAgICAgICAgJGFycm93TmV4dC5maW5kKCdzcGFuJykudGV4dChwYWdlTmV4dCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJCgnLnBhZ2UtLScgKyBwYWdlKVxuICAgICAgICAgICAgICAgICAgICAuc2hvdygpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgaW5pdDogZmFsc2UsXG4gICAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgICAgbG9vcEFkZGl0aW9uYWxTbGlkZXM6IDEsXG4gICAgICAgICAgICBzcGVlZDogMTIwMCxcbiAgICAgICAgICAgIGVmZmVjdDogJ2N1YmUnLCAvLyAnY3ViZScsICdmYWRlJywgJ2NvdmVyZmxvdycsXG4gICAgICAgICAgICBjdWJlRWZmZWN0OiB7XG4gICAgICAgICAgICAgICAgc2hhZG93OiBmYWxzZVxuICAgICAgICAgICAgICAgIC8vIHNsaWRlU2hhZG93czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAvLyBzaGFkb3dPZmZzZXQ6IDQwXG4gICAgICAgICAgICAgICAgLy8gc2hhZG93U2NhbGU6IDAuOTRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBncmFiQ3Vyc29yOiB0cnVlLFxuICAgICAgICAgICAgLy8gRXZlbnRzXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIGltYWdlc1JlYWR5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0b3VjaEVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc01vdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNsaWRlQ2hhbmdlVHJhbnNpdGlvbkVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNNb3ZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1BhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlclNlbGVjdG9yLCBvcHRpb25zKTtcbiAgICAgICAgbXlTd2lwZXIuaW5pdCgpO1xuXG4gICAgICAgICR3aW5kb3cub24oJ3Njcm9sbCB0b3VjaG1vdmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBzY3JvbGwgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xuXG4gICAgICAgICAgICBpZiAoc2Nyb2xsID4gMCkge1xuICAgICAgICAgICAgICAgIC8vICRoZWFkZXJDbG9uZS5hZGRDbGFzcygnaXMtdmlzaWJsZScpO1xuICAgICAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoJ2lzLWZpeGVkJyk7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gMTAyNCkge1xuICAgICAgICAgICAgICAgICAgICAkZmlyc3RTY3JlZW4uYWRkQ2xhc3MoJ3NjYWxlLW91dCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gJGhlYWRlckNsb25lLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcygnaXMtZml4ZWQnKTtcbiAgICAgICAgICAgICAgICAkZmlyc3RTY3JlZW4ucmVtb3ZlQ2xhc3MoJ3NjYWxlLW91dCcpO1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGFycm93UHJldi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghdGltZW91dCkge1xuICAgICAgICAgICAgICAgIG15U3dpcGVyLnNsaWRlUHJldigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBnb1RvcCgpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBteVN3aXBlci5zbGlkZVByZXYoKTtcbiAgICAgICAgICAgICAgICB9LCA4MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkYXJyb3dOZXh0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCF0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgbXlTd2lwZXIuc2xpZGVOZXh0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGdvVG9wKCk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG15U3dpcGVyLnNsaWRlTmV4dCgpO1xuICAgICAgICAgICAgICAgIH0sIDgwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGdvVG9wKCkge1xuICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDYwMFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0pKCk7XG59KTtcbiJdfQ==
