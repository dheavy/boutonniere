'use strict';

//jQuery is required to run this code
$(document).ready(function () {
    var blurElement = { a: 0 };

    scaleVideoContainer();
    scaleInput();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function () {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
        scaleInput();
    });

    $(document).on('click', function () {
        scaleInput();
        TweenMax.to(blurElement, 5, { a: 20, onUpdate:applyBlur });
        $('#mce-EMAIL').css('pointer-events', 'auto');
        TweenMax.to('#mce-EMAIL', 5, { opacity: 1 });
    });

    //here you pass the filter to the DOM element
    function applyBlur() {
        TweenMax.set(['.logo'], { webkitFilter:"blur(" + blurElement.a + "px)", filter: "blur(" + blurElement.a + "px)"});
    };

});

function scaleInput() {
  var $email = $('#mce-EMAIL'),
      $window = $(window);

  $email.offset({
    top: ($window.height() - $email.height()) / 2,
    left: ($window.width() - $email.width()) / 2
  });

  $('form').on('submit', function (e) {
    TweenMax.to('#mce-EMAIL', 5, { opacity: 1, onComplete: function () {
        $('#mce-EMAIL').css('pointer-events', 'none');
    }});
  });
}

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function () {
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    $(element).each(function () {
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}