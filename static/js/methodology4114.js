$.fn.methodology = function(options) {

    var settings = $.extend({

    }, options);

    var current = 0;
    var container = settings.container;
    var target = $(this);
    var next = target.find('.next');
    var prev = target.find('.prev');
    var more = target.find('.more');
    var ul = target.find('ul');
    var items = target.find('.items');
    var more = target.find('.more');
    var content = $('.methodology-steps-content');
    var minus = $('.minus');
    var data = [
        { title: 'How to be Insightful?', text: 'How to be Insightful? We ask the right questions, generate new knowledge and creatively turn it into new business opportunities.', img: 'images/Insightful_whatwedo_01.jpg', content: 'insightful.html' },
        { title: 'How to be Foresightful?', text: 'How to be Foresightful?We discover signs of change, identify trends and imagine possible futures for organizations and people.', img: 'images/Foresightful_whatwedo_02.jpg', content: 'foresightful.html' },
        { title: 'How to be Responsive?', text: 'How to be Responsive? We help organizations to be guided by their purpose and we implement new capacities and work structures.', img: 'images/Responsive_whatwedo_03.jpg', content: 'responsive.html' },
        { title: 'How to be Circular?', text: 'How to be Circular? We identify new design models that extend the useful life of the solutions and generate value with new uses.', img: 'images/Circular_whatwedo_04.jpg', content: 'circular.html' }
    ];

    next.click(function(event){
        event.preventDefault();
        nextFn();
    });

    prev.click(function(event){
        event.preventDefault();
        prevFn();
    });

    more.click(function(event){
        event.preventDefault();
        moreFn();
    });

    minus.click(function(event){
        event.preventDefault();
        minusFn();
    });

    var nextFn = function(){
        if (current > 0) {
            current--;
            currentItemsAnimationOut(items.find('img'), items.find('h3'), items.find('p'), -1);
            createNewItems(1);
            ul.children('li').eq(0).css({'margin-top': '+=40px'});
        }
    }

    var prevFn = function(){
        if (current < 3) {
            current++;
            currentItemsAnimationOut(items.find('img'), items.find('h3'), items.find('p'), 1);
            createNewItems(-1);
            ul.children('li').eq(0).css({'margin-top': '-=40px'});
        }
    }

    var moreFn = function(){
        content.find('.content').load(data[current].content);
        $('.minus').css({'top': container.height() / 4 + 'px'}).show();
        $('.items img, .methodology-steps-controls, .more').hide();
        content.css({'display': 'block', 'opacity': '0', 'height': '0%', 'top': '50%'});
        minus.css({'display': 'block'});
        TweenMax.to(content, .6, { css:{opacity: 1, height: '100%', top: '0px'}, ease: Quint.easeOut });
        TweenMax.to(container, .6, { css:{height: '680px'}, ease: Quint.easeOut });
    }

    var minusFn = function(){
        $('.items img, .methodology-steps-controls, .more').show();
        $('.minus').hide();
        minus.css({'display': 'none'});
        TweenMax.to(content, .6, { css:{opacity: 0, height: '0%', top: '50%'}, ease: Quint.easeOut, onComplete: function(){
            content.css({'display': 'none', 'opacity': '0', 'height': '0%'});
        }});
        TweenMax.to(container, .6, { css:{height: '80%'}, ease: Quint.easeOut });
    }

    var currentItemsAnimationOut = function(img, h3, p, direccion){
        more.css({'transform': 'scale(.8, .8) rotate(90deg)', 'opacity': 0});
        TweenMax.to(img, .6, { css:{transform:"scale(.8, .8)", opacity: 0}, ease: Quint.easeOut });
        TweenMax.to(h3, .6, { delay: (direccion == 1) ? .1 : 0, css:{transform:"translateY(" + (direccion * 80) + "px)", opacity: 0}, ease: Quint.easeOut });
        TweenMax.to(p, .6, { delay: (direccion == 1) ? 0 : .1, css:{transform:"translateY(" + (direccion * 80) + "px)", opacity: 0}, ease: Quint.easeOut, onComplete: function(){
            img.remove();
            h3.remove();
            p.remove();
            more.css({'transform': 'scale(1, 1) rotate(0deg)', 'opacity': 1});
        }});
    }

    var createNewItems = function(direccion){
        var img = $('<img>').attr('src', data[current].img)
                            .css({'transform': 'scale(.8, .8)', 'opacity': '0'});
        var h3 = $('<h3>').text(data[current].title)
                          .css({'transform': 'translateY(' + (direccion * 80) + 'px)', 'opacity': '0'});
        var p = $('<p>').text(data[current].text)
                        .css({'transform': 'translateY(' + (direccion * 80) + 'px)', 'opacity': '0'});
        items.append(img);
        items.append(h3);
        items.append(p);
        TweenMax.to(img, .6, { delay: .6, css:{transform:"scale(1, 1)", opacity: 1}, ease: Quint.easeOut });
        TweenMax.to(h3, .6, { delay: (direccion == 1) ? .6 : .7, css:{transform:"translateY(0px)", opacity: 1}, ease: Quint.easeOut });
        TweenMax.to(p, .6, { delay: (direccion == 1) ? .7 : .6, css:{transform:"translateY(0px)", opacity: 1}, ease: Quint.easeOut });
    }

    return this;

};
