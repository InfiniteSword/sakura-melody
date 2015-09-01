(function($){
    $.fn.sakura = function(options){
        var $flake = $('<div class="sakura" />').css({'position': 'absolute','z-index':'998', 'top': '-50px'}).html('&#10048;'),
            documentHeight  = $(document).height(),
            documentWidth   = $(document).width(),
            defaults = {
                minSize     : 10,
                maxSize     : 20,
                newOn       : 1000,
                flakeColor  : "#ffccff"
            },
            options = $.extend({}, defaults, options);
        var interval= setInterval(function(){
            var startPositionLeft = Math.random() * documentWidth - 100,
                startOpacity = 0.5 + Math.random(),
                sizeFlake = options.minSize + Math.random() * options.maxSize,
                endPositionTop = documentHeight - 200,
                endPositionLeft = startPositionLeft - 500 + Math.random() * 500,
                durationFall = documentHeight * 10 + Math.random() * 5000;
            $flake.clone().appendTo('body').css({
                left: startPositionLeft,
                opacity: startOpacity,
                'font-size': sizeFlake,
                color: options.flakeColor
            }).animate({
                top: endPositionTop,
                left: endPositionLeft,
                opacity: 0
            },durationFall,'linear',function(){
                $(this).remove()
            });
        }, options.newOn);
    };
})(jQuery);


