
// What We Do //////////////////////////////////////////////////////////////////////////////////

var seccionMethodology = 0;
var firstTimeScrollDown = true;
var controller;
var currentScrollTop = 0;

$(document).ready(function(){

	controller = new ScrollMagic.Controller();

	new ScrollMagic.Scene({triggerElement: "#trigger", duration: $(window).height() * 2, offset: $(window).height() / 2 })
		.setPin("#pin")
		.on("enter leave", updateBox)
		.on("progress", onProgress)
		//.addIndicators()
		.addTo(controller);

	$(window).resize(function(){
		resizeMethodologyItems();
	}).trigger('resize');

	$('.item img').load(function() {
    	resizeMethodologyItems();
	});

	$('.item a').click(onClickButtonItem);

	$(window).on('beforeunload', function(){
    	$(window).scrollTop(0);
	});

});

// Resize Elements

function resizeMethodologyItems(target) {
	var h = $(window).height() - 160;
	$('.methodology-steps').css({'height': h + 'px' });

	var h = $('.methodology-steps').height() * .62;
	var rp = (h * 1000) / 556;
	var top = ($('.methodology-steps').height() - h) / 2;
 	
 	if ($(window).width() > 460) {
 		$('.item img').css({'height': h + 'px', 'width': rp + 'px', 'top': top + 'px'});
 	} else {
 		$('.item img').css({'height': 'auto', 'width': 'calc(100% - 80px)', 'top': '0px'});
 	}

 	if ($(window).width() > 460) {
	 	top = Number($('.item img').css('top').replace('px', ''));
	 	top += 40;
		$('.item h3').css({'top': top + 'px'});
	} else {
		top = Number($('.item img').css('top').replace('px', ''));
	 	top += $('.item img').height();
	 	top -= 30;
		$('.item h3').css({'top': top + 'px'});
	}

	if ($(window).width() > 460) {
		top = Number($('.item img').css('top').replace('px', ''));
		top += $('.item h3').height();
		top += 60;
		$('.item p').css({'top': top + 'px'});
	} else {
		top = Number($('.item h3').css('top').replace('px', ''));
		top += $('.item h3').height();
		top += 20;
		$('.item p').css({'top': top + 'px'});
	}

	if ($(window).width() > 460) {
		top = Number($('.item img').css('top').replace('px', ''));
		top += $('.item img').height();
		top -= 80;
		$('.item span').css({'top': top + 'px'});
	} else {
		top = Number($('.item img').css('top').replace('px', ''));
		top += 20;
		$('.item span').css({'top': top + 'px'});
	}

	if ($(window).width() > 460) {
		top = Number($('.item img').css('top').replace('px', ''));
		top += $('.item img').height();
		top -= 60;
		$('.item a').css({'top': top + 'px'});
	} else {
		top = Number($('.item p').css('top').replace('px', ''));
		top += $('.item p').height();
		top += 40;
		$('.item a').css({'top': top + 'px'});
	}

	controller.update(true);
}

function animateNextSlideElements(img, h3, p, span, a) {
 	TweenMax.to(img, 0, { css:{transform:"scale(.8, .8)", display: "block", opacity: 0} });
  	TweenMax.to(h3, 0, { css:{transform:"translateY(80px)", display: "block", opacity: 0} });
  	TweenMax.to(p, 0, { css:{transform:"translateY(80px)", display: "block", opacity: 0} });
  	TweenMax.to(span, 0, { css:{transform:"scale(.8, .8)", display: "block", opacity: 0} });
  	TweenMax.to(a, 0, { css:{transform:"translateY(80px)", display: "block", opacity: 0} });

  	TweenMax.to(img, .6, { css:{transform:"scale(1, 1)", opacity: 1}, ease: Quint.easeOut });
  	TweenMax.to(h3, .6, { delay: 0, css:{transform:"translateY(0px)", opacity: 1}, ease: Quint.easeOut });
  	TweenMax.to(p, .6, { delay: .1, css:{transform:"translateY(0px)", opacity: 1}, ease: Quint.easeOut });
  	TweenMax.to(span, .6, { delay: .2, css:{transform:"scale(1, 1)", opacity: 1}, ease: Quint.easeOut });
  	TweenMax.to(a, .6, { delay: .2, css:{transform:"translateY(0px)", opacity: 1}, ease: Quint.easeOut });
}

function hideItemElements() {
	$('.item img').hide();
	$('.item h3').hide();
	$('.item p').hide();
	$('.item span').hide();
	$('.item a').hide();
}

function updateBox (e) {
	if (e.type == "enter") {
		//console.log('pinned');
	} else {
		//console.log('unpinned');
	}
}

function onProgress(e) {
	var percent = e.progress.toFixed(2) * 100;
	if (percent >= 0 && percent < 25 && seccionMethodology != 1) {
		seccionMethodology = 1;
		if (!firstTimeScrollDown) {
			hideItemElements();
			animateNextSlideElements($('.item:eq(0)').find('img'), $('.item:eq(0)').find('h3'), $('.item:eq(0)').find('p'), $('.item:eq(0)').find('span'), $('.item:eq(0)').find('a'));
		}
		firstTimeScrollDown = false;
	} else if(percent >= 25 && percent < 50 && seccionMethodology != 2) {
		seccionMethodology = 2;
		hideItemElements();
		animateNextSlideElements($('.item:eq(1)').find('img'), $('.item:eq(1)').find('h3'), $('.item:eq(1)').find('p'), $('.item:eq(1)').find('span'), $('.item:eq(1)').find('a'));
	} else if(percent >= 50 && percent < 75 && seccionMethodology != 3) {
		seccionMethodology = 3;
		hideItemElements();
		animateNextSlideElements($('.item:eq(2)').find('img'), $('.item:eq(2)').find('h3'), $('.item:eq(2)').find('p'), $('.item:eq(2)').find('span'), $('.item:eq(2)').find('a'));
	} else if(percent >= 75 && percent < 100 && seccionMethodology != 4) {
		seccionMethodology = 4;
		hideItemElements();
		animateNextSlideElements($('.item:eq(3)').find('img'), $('.item:eq(3)').find('h3'), $('.item:eq(3)').find('p'), $('.item:eq(3)').find('span'), $('.item:eq(3)').find('a'));
	}
}

function onClickButtonItem(event) {
	event.preventDefault();
	var content = $('.content-methodology');
	$(content).load($(this).attr('file'), onLoadContentMethodology);
}

function onLoadContentMethodology() {
	var content = $('.content-methodology');
	$(content).css({'opacity': '0', 'height': '100%', 'display': 'block', 'overflow': 'scroll'});
	$(content).scrollTop(0);
	setControlsStepContentOpened();
	currentScrollTop = $('html, body').scrollTop();
	$('.hamburger').hide();
	var tl = new TimelineMax({onComplete: function(){
		$('html, body').css({'overflow': 'hidden'});
	}});
	tl.set($(content), { css:{transform:"scale(.6, .6) translateY(600px)", opacity: 0} })
		.to($(content), .4, { css:{transform:"scale(.6, .6) translateY(100px)", opacity: 1}, ease: Quint.easeIn })
		.to($(content), .6, { css:{transform:"scale(1, 1) translateY(0px)", opacity: 1}, ease: Quint.easeOut });
	tl.play();
}

function onClickButtonCloseContentMethodology(event) {
	event.preventDefault();
	unSetControlsStepContentClosed();
	$('html, body').css({'overflow': 'visible'});
	$('html, body').scrollTop(currentScrollTop);
	var content = $('.content-methodology');
	$(content).stop().animate({scrollTop: 0}, 'swing');
	var tl = new TimelineMax({onComplete: function(){
		//$('html, body').css({'overflow': 'visible'});
		if ( $(window).width() <= 680 ) {
			$('.hamburger').show();
		}
		$(content).empty().css({'height': '0', 'display': 'none', 'overflow': 'hidden'});
		updateInmediatelyScrollMagicController();
	}});
	tl.to($(content), .6, { css:{transform:"scale(1, 1) translateY(600px)", opacity: 0}, ease: Quint.easeIn });
	tl.play();
}

function updateInmediatelyScrollMagicController() {
	controller.update(true);
}

function setControlsStepContentOpened() {
	$('.close-content-methodology').click(onClickButtonCloseContentMethodology);
	$(window).resize(onResizeWindowWhenStepContentOpened).trigger('resize');
}

function onResizeWindowWhenStepContentOpened() {
	var w;
	if ($(window).width() > 460) {
		w = $('.step-header img').width()
	} else {
		w = $(window).width() - 80;
	}
	var h = (w * 556) / 1000;
 	$('.step-header img').css({'height': h + 'px', 'top': '0'});

 	if ($(window).width() > 460) {
 		var top = $('.step-header img').height() - 220;
 		$('.step-header h3').css({'top': top + 'px'});
 	} else if ( $(window).width() > 375 && $(window).width() <= 460 ) { //iPhone 7Plus
 		var top = 156;
 		$('.step-header h3').css({'top': top + 'px'});
 	} else if ( $(window).width() >= 375 && $(window).width() <= 460 ) { //iPhone 7
		var top = 136;
 		$('.step-header h3').css({'top': top + 'px'});
 	} else { //iPhone 5
 		var top = 105;
 		$('.step-header h3').css({'top': top + 'px'});
 	}
}

function unSetControlsStepContentClosed() {
	$('.close-content-methodology').off('click', onClickButtonCloseContentMethodology);
	$(window).off('resize', onResizeWindowWhenStepContentOpened);
}


