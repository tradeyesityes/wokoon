$.fn.accordeon = function(options) {

    var settings = $.extend({

    }, options );

    var target = $(this);
    var modules = target.find('.accordeon-module');

    $.each(modules, function(index, value){
        var title = $(value).find('.accordeon-module-title');
        var content = $(this).find('.accordeon-module-content');
        if ($(content).hasClass('hide')) {
            $(content).css('height','0px');
            $(title).find('i').text('+');
        } else {
            $(content).css('height','auto');
            $(title).find('i').text('-');
        }
        $(title).click(function(){
            var content = $(this).parent().find('.accordeon-module-content');
            if ($(content).hasClass('hide')) {
                $(content).removeClass('hide');
                $(this).find('i').text('-');
                TweenMax.set($(content), { height: 'auto' });
                TweenMax.from($(content), 1, { css:{ height : 0 }, ease: Quint.easeOut });
                $('html, body').animate({scrollTop: $(this).offset().top}, 'slow');
            } else {
                $(content).addClass('hide');
                $(this).find('i').text('+');
                TweenMax.to($(content), 1, { css:{ height : 0 }, ease: Quint.easeOut });
            }
        });
        if (window.location.hash.replace('#', '') == $(title).attr('hash')) {
            $(title).trigger('click');
        }
    });

    return this;

};
