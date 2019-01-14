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
        // this.contentOffset();
        this.changeBgImage();

        //Stop drag Img
        $('img').on('dragstart', function (e) {
            e.preventDefault();
        });

        $window.on('resize', function () {
            // Main.contentOffset();
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
    contentOffset: function contentOffset() {
        var $firstScreen = $('.swiper-container');
        var $content = $('.content');

        if ($(window).width() > 480) {
            $content.css('padding-top', $firstScreen.outerHeight(true));
        }
    },
    changeBgImage: function changeBgImage() {
        $('.firstscreen, .section--img').each(function () {
            var image = $(this).attr('data-bgimage');
            var smallImage = $(this).attr('data-bgimage-small');

            if ($(window).width() > 480) {
                if (typeof image !== 'undefined') {
                    $(this).attr('style', 'background-image: url("' + image + '")');
                }
            } else {
                if (typeof smallImage !== 'undefined') {
                    $(this).attr('style', 'background-image: url("' + smallImage + '")');
                } else {
                    console.log('udefined');

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyIkd2luZG93IiwiJCIsIndpbmRvdyIsIiRkb2N1bWVudCIsImRvY3VtZW50IiwiJGh0bWwiLCIkd3JhcHBlciIsIiRoZWFkZXIiLCIkbWFpbiIsIiRvdmVybGF5IiwiTWFpbiIsImluaXQiLCJyZW1vdmVQcmVsb2FkZXIiLCJ2aWRlbyIsImdvVG9wIiwiY2hhbmdlQmdJbWFnZSIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic2V0VGltZW91dCIsInJlbW92ZUNsYXNzIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImlucHV0cyIsImlucHV0TWFzayIsImxlbmd0aCIsImlucHV0bWFzayIsIm1hc2siLCIkdmlkZW9Db250YWluZXIiLCIkdmlkZW8iLCJmaW5kIiwiJHBsYXlCdG4iLCJwYXVzZWQiLCJwbGF5IiwiaGlkZSIsInBhdXNlIiwic2hvdyIsImNvbnRlbnRPZmZzZXQiLCIkZmlyc3RTY3JlZW4iLCIkY29udGVudCIsIndpZHRoIiwiY3NzIiwib3V0ZXJIZWlnaHQiLCJlYWNoIiwiaW1hZ2UiLCJhdHRyIiwic21hbGxJbWFnZSIsImNvbnNvbGUiLCJsb2ciLCJhZGRFdmVudExpc3RlbmVyIiwib25GaXJzdFRvdWNoIiwiYm9keSIsImNsYXNzTGlzdCIsInJlbW92ZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ0aW1lb3V0IiwiaXNNb3ZlIiwic2xpZGVyU2VsZWN0b3IiLCIkYXJyb3dQcmV2IiwiJGFycm93TmV4dCIsInBhZ2UiLCJjaGVja1BhZ2UiLCJwYWdlTmV4dCIsInBhZ2VQcmV2IiwibXlTd2lwZXIiLCJzbGlkZXMiLCJoYXNDbGFzcyIsImRhdGEiLCJlcSIsInRleHQiLCJhZGRDbGFzcyIsIm9wdGlvbnMiLCJsb29wIiwibG9vcEFkZGl0aW9uYWxTbGlkZXMiLCJzcGVlZCIsImVmZmVjdCIsImN1YmVFZmZlY3QiLCJzaGFkb3ciLCJncmFiQ3Vyc29yIiwiaW1hZ2VzUmVhZHkiLCJlbCIsInRvdWNoRW5kIiwic2xpZGVDaGFuZ2VUcmFuc2l0aW9uRW5kIiwiU3dpcGVyIiwic2Nyb2xsIiwic2xpZGVQcmV2Iiwic2xpZGVOZXh0Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBTUEsVUFBVUMsRUFBRUMsTUFBRixDQUFoQjtBQUNBLElBQU1DLFlBQVlGLEVBQUVHLFFBQUYsQ0FBbEI7QUFDQSxJQUFNQyxRQUFRSixFQUFFLE1BQUYsQ0FBZDtBQUNBLElBQU1LLFdBQVdMLEVBQUUsVUFBRixDQUFqQjtBQUNBLElBQU1NLFVBQVVOLEVBQUUsU0FBRixDQUFoQjtBQUNBLElBQU1PLFFBQVFQLEVBQUUsT0FBRixDQUFkO0FBQ0EsSUFBTVEsV0FBV1IsRUFBRSxhQUFGLENBQWpCOztBQUVBOzs7OztBQUtBLElBQU1TLE9BQU87QUFDVEMsVUFBTSxnQkFBVztBQUNiLGFBQUtDLGVBQUw7QUFDQSxhQUFLQyxLQUFMO0FBQ0EsYUFBS0MsS0FBTDtBQUNBO0FBQ0EsYUFBS0MsYUFBTDs7QUFFQTtBQUNBZCxVQUFFLEtBQUYsRUFBU2UsRUFBVCxDQUFZLFdBQVosRUFBeUIsVUFBU0MsQ0FBVCxFQUFZO0FBQ2pDQSxjQUFFQyxjQUFGO0FBQ0gsU0FGRDs7QUFJQWxCLGdCQUFRZ0IsRUFBUixDQUFXLFFBQVgsRUFBcUIsWUFBVztBQUM1QjtBQUNBTixpQkFBS0ssYUFBTDtBQUNILFNBSEQ7QUFJSCxLQWpCUTtBQWtCVDtBQUNBSCxxQkFBaUIsMkJBQVc7QUFDeEJPLG1CQUFXLFlBQU07QUFDYmxCLGNBQUUsTUFBRixFQUFVbUIsV0FBVixDQUFzQixTQUF0QjtBQUNILFNBRkQsRUFFRyxJQUZIO0FBR0gsS0F2QlE7QUF3QlROLFdBQU8saUJBQVc7QUFDZGIsVUFBRSxZQUFGLEVBQWdCZSxFQUFoQixDQUFtQixPQUFuQixFQUE0QixVQUFTQyxDQUFULEVBQVk7QUFDcENBLGNBQUVDLGNBQUY7QUFDQWpCLGNBQUUsWUFBRixFQUFnQm9CLE9BQWhCLENBQ0k7QUFDSUMsMkJBQVc7QUFEZixhQURKLEVBSUksR0FKSjtBQU1ILFNB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RkQsTUFFTztBQUNIdkU7QUFDQUssMkJBQVcsWUFBTTtBQUNiNkMsNkJBQVNxQixTQUFUO0FBQ0gsaUJBRkQsRUFFRyxHQUZIO0FBR0g7QUFDSixTQVREOztBQVdBMUIsbUJBQVczQyxFQUFYLENBQWMsT0FBZCxFQUF1QixZQUFXO0FBQzlCLGdCQUFJLENBQUN1QyxPQUFMLEVBQWM7QUFDVlMseUJBQVNzQixTQUFUO0FBQ0gsYUFGRCxNQUVPO0FBQ0h4RTtBQUNBSywyQkFBVyxZQUFNO0FBQ2I2Qyw2QkFBU3NCLFNBQVQ7QUFDSCxpQkFGRCxFQUVHLEdBRkg7QUFHSDtBQUNKLFNBVEQ7O0FBV0EsaUJBQVN4RSxLQUFULEdBQWlCO0FBQ2JiLGNBQUUsWUFBRixFQUFnQm9CLE9BQWhCLENBQ0k7QUFDSUMsMkJBQVc7QUFEZixhQURKLEVBSUksR0FKSjtBQU1IO0FBQ0osS0F6SEQ7QUEwSEgsQ0F6SUQiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9HbG9iYWwgVmFyc1xuY29uc3QgJHdpbmRvdyA9ICQod2luZG93KTtcbmNvbnN0ICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuY29uc3QgJGh0bWwgPSAkKCdodG1sJyk7XG5jb25zdCAkd3JhcHBlciA9ICQoJy53cmFwcGVyJyk7XG5jb25zdCAkaGVhZGVyID0gJCgnLmhlYWRlcicpO1xuY29uc3QgJG1haW4gPSAkKCcubWFpbicpO1xuY29uc3QgJG92ZXJsYXkgPSAkKCcuanMtb3ZlcmxheScpO1xuXG4vKipcbiAqIE1haW5cbiAqXG4gKiBAYXV0aG9yIEFudG9uIFVzdGlub2ZmIDxhLmEudXN0aW5vZmZAZ21haWwuY29tPlxuICovXG5jb25zdCBNYWluID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlbW92ZVByZWxvYWRlcigpO1xuICAgICAgICB0aGlzLnZpZGVvKCk7XG4gICAgICAgIHRoaXMuZ29Ub3AoKTtcbiAgICAgICAgLy8gdGhpcy5jb250ZW50T2Zmc2V0KCk7XG4gICAgICAgIHRoaXMuY2hhbmdlQmdJbWFnZSgpO1xuXG4gICAgICAgIC8vU3RvcCBkcmFnIEltZ1xuICAgICAgICAkKCdpbWcnKS5vbignZHJhZ3N0YXJ0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkd2luZG93Lm9uKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIE1haW4uY29udGVudE9mZnNldCgpO1xuICAgICAgICAgICAgTWFpbi5jaGFuZ2VCZ0ltYWdlKCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgLy9SZW1vdmUgcHJlbG9hZGVyXG4gICAgcmVtb3ZlUHJlbG9hZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfSxcbiAgICBnb1RvcDogZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5qcy1nby10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgODAwXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGlucHV0czoge1xuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRNYXNrKCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8vTWFza2VkIGlucHV0bWFzayBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL0lucHV0bWFza1xuICAgICAgICBpbnB1dE1hc2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQoJy5qcy1waG9uZS1tYXNrJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJCgnLmpzLXBob25lLW1hc2snKS5pbnB1dG1hc2soe1xuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnKzcgKDk5OSkgOTk5LTk5LTk5J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICB2aWRlbzogZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCAkdmlkZW9Db250YWluZXIgPSAkKCcuanMtdmlkZW8nKTtcbiAgICAgICAgbGV0ICR2aWRlbyA9ICR2aWRlb0NvbnRhaW5lci5maW5kKCd2aWRlbycpO1xuICAgICAgICBsZXQgJHBsYXlCdG4gPSAkdmlkZW9Db250YWluZXIuZmluZCgnLnZpZGVvX19idG4nKTtcblxuICAgICAgICAkdmlkZW8ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICAgICAgICAgICAgJHBsYXlCdG4uaGlkZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgJHBsYXlCdG4uc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNvbnRlbnRPZmZzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgJGZpcnN0U2NyZWVuID0gJCgnLnN3aXBlci1jb250YWluZXInKTtcbiAgICAgICAgbGV0ICRjb250ZW50ID0gJCgnLmNvbnRlbnQnKTtcblxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA0ODApIHtcbiAgICAgICAgICAgICRjb250ZW50LmNzcygncGFkZGluZy10b3AnLCAkZmlyc3RTY3JlZW4ub3V0ZXJIZWlnaHQodHJ1ZSkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjaGFuZ2VCZ0ltYWdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmZpcnN0c2NyZWVuLCAuc2VjdGlvbi0taW1nJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBpbWFnZSA9ICQodGhpcykuYXR0cignZGF0YS1iZ2ltYWdlJyk7XG4gICAgICAgICAgICBsZXQgc21hbGxJbWFnZSA9ICQodGhpcykuYXR0cignZGF0YS1iZ2ltYWdlLXNtYWxsJyk7XG5cbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDQ4MCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW1hZ2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cihcbiAgICAgICAgICAgICAgICAgICAgICAgICdzdHlsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiJyArIGltYWdlICsgJ1wiKSdcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc21hbGxJbWFnZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3N0eWxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCInICsgc21hbGxJbWFnZSArICdcIiknXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3VkZWZpbmVkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3N0eWxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCInICsgaW1hZ2UgKyAnXCIpJ1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuLy8gSW5pdGlhbGl6ZSBzbGlkZXJcblxuJChmdW5jdGlvbigpIHtcbiAgICAkKE1haW4uaW5pdCgpKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAndG91Y2hzdGFydCcsXG4gICAgICAgIGZ1bmN0aW9uIG9uRmlyc3RUb3VjaCgpIHtcbiAgICAgICAgICAgIC8vIHdlIGNvdWxkIHVzZSBhIGNsYXNzXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ25vLXRvdWNoZXZlbnRzJyk7XG5cbiAgICAgICAgICAgIC8vIHdlIG9ubHkgbmVlZCB0byBrbm93IG9uY2UgdGhhdCBhIGh1bWFuIHRvdWNoZWQgdGhlIHNjcmVlbiwgc28gd2UgY2FuIHN0b3AgbGlzdGVuaW5nIG5vd1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBvbkZpcnN0VG91Y2gsIGZhbHNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICApO1xuXG4gICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgdGltZW91dCA9IGZhbHNlO1xuICAgICAgICBsZXQgaXNNb3ZlID0gZmFsc2U7XG5cbiAgICAgICAgLy8gbGV0IGhlYWRlckhlaWdodCA9ICRoZWFkZXIub3V0ZXJIZWlnaHQodHJ1ZSk7XG4gICAgICAgIC8vIGxldCAkaGVhZGVyQ2xvbmUgPSAkaGVhZGVyXG4gICAgICAgIC8vICAgICAuY2xvbmUoKVxuICAgICAgICAvLyAgICAgLmFkZENsYXNzKCdoZWFkZXItLWNsb25lIGhlYWRlci0tZml4ZWQnKVxuICAgICAgICAvLyAgICAgLmluc2VydEFmdGVyKCcuaGVhZGVyJyk7XG4gICAgICAgIGxldCAkZmlyc3RTY3JlZW4gPSAkZG9jdW1lbnQuZmluZCgnLmZpcnN0c2NyZWVuJyk7XG5cbiAgICAgICAgbGV0IHNsaWRlclNlbGVjdG9yID0gJy5zd2lwZXItY29udGFpbmVyJztcbiAgICAgICAgbGV0ICRhcnJvd1ByZXYgPSAkKCcuanMtcGFnZS1jb250cm9scy1hcnJvdy0tcHJldicpO1xuICAgICAgICBsZXQgJGFycm93TmV4dCA9ICQoJy5qcy1wYWdlLWNvbnRyb2xzLWFycm93LS1uZXh0Jyk7XG4gICAgICAgIGxldCBwYWdlO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrUGFnZSgpIHtcbiAgICAgICAgICAgIGxldCBwYWdlTmV4dCwgcGFnZVByZXY7XG4gICAgICAgICAgICBteVN3aXBlci5zbGlkZXMuZWFjaChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgJCgnLnBhZ2UnKVxuICAgICAgICAgICAgICAgICAgICAuaGlkZSgpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnc3dpcGVyLXNsaWRlLWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2UgPSAkKHRoaXMpLmRhdGEoJ3BhZ2UnKTtcblxuICAgICAgICAgICAgICAgICAgICBwYWdlUHJldiA9IG15U3dpcGVyLnNsaWRlcy5lcShlIC0gMSkuZGF0YSgncGFnZS10aXRsZScpO1xuICAgICAgICAgICAgICAgICAgICBwYWdlTmV4dCA9IG15U3dpcGVyLnNsaWRlcy5lcShlICsgMSkuZGF0YSgncGFnZS10aXRsZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICRhcnJvd1ByZXYuZmluZCgnc3BhbicpLnRleHQocGFnZVByZXYpO1xuICAgICAgICAgICAgICAgICAgICAkYXJyb3dOZXh0LmZpbmQoJ3NwYW4nKS50ZXh0KHBhZ2VOZXh0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkKCcucGFnZS0tJyArIHBhZ2UpXG4gICAgICAgICAgICAgICAgICAgIC5zaG93KClcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBpbml0OiBmYWxzZSxcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgICBsb29wQWRkaXRpb25hbFNsaWRlczogMSxcbiAgICAgICAgICAgIHNwZWVkOiAxMjAwLFxuICAgICAgICAgICAgZWZmZWN0OiAnY3ViZScsIC8vICdjdWJlJywgJ2ZhZGUnLCAnY292ZXJmbG93JyxcbiAgICAgICAgICAgIGN1YmVFZmZlY3Q6IHtcbiAgICAgICAgICAgICAgICBzaGFkb3c6IGZhbHNlXG4gICAgICAgICAgICAgICAgLy8gc2xpZGVTaGFkb3dzOiB0cnVlLFxuICAgICAgICAgICAgICAgIC8vIHNoYWRvd09mZnNldDogNDBcbiAgICAgICAgICAgICAgICAvLyBzaGFkb3dTY2FsZTogMC45NFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdyYWJDdXJzb3I6IHRydWUsXG4gICAgICAgICAgICAvLyBFdmVudHNcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgaW1hZ2VzUmVhZHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRvdWNoRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTW92ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2xpZGVDaGFuZ2VUcmFuc2l0aW9uRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc01vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrUGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBteVN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyU2VsZWN0b3IsIG9wdGlvbnMpO1xuICAgICAgICBteVN3aXBlci5pbml0KCk7XG5cbiAgICAgICAgJHdpbmRvdy5vbignc2Nyb2xsIHRvdWNobW92ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IHNjcm9sbCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XG5cbiAgICAgICAgICAgIGlmIChzY3JvbGwgPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gJGhlYWRlckNsb25lLmFkZENsYXNzKCdpcy12aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcygnaXMtZml4ZWQnKTtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiAxMDI0KSB7XG4gICAgICAgICAgICAgICAgICAgICRmaXJzdFNjcmVlbi5hZGRDbGFzcygnc2NhbGUtb3V0Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyAkaGVhZGVyQ2xvbmUucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICAgICAgICAgICRmaXJzdFNjcmVlbi5yZW1vdmVDbGFzcygnc2NhbGUtb3V0Jyk7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkYXJyb3dQcmV2Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCF0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgbXlTd2lwZXIuc2xpZGVQcmV2KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGdvVG9wKCk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG15U3dpcGVyLnNsaWRlUHJldigpO1xuICAgICAgICAgICAgICAgIH0sIDgwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRhcnJvd05leHQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICBteVN3aXBlci5zbGlkZU5leHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ29Ub3AoKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbXlTd2lwZXIuc2xpZGVOZXh0KCk7XG4gICAgICAgICAgICAgICAgfSwgODAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gZ29Ub3AoKSB7XG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZShcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNjAwXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfSkoKTtcbn0pO1xuIl19
