
// Home //////////////////////////////////////////////////////////////////////////////////

var pong;
var video_01 = document.querySelector('#video_01');
var video_02 = document.querySelector('#video_02');
var video_03 = document.querySelector('#video_03');
var container = document.querySelector('#container_rebel');
var flexslider = { vars:{} };
var mobile = ('ontouchstart' in window) || window.DocumentTouch && window.document instanceof DocumentTouch || window.navigator.maxTouchPoints || window.navigator.msMaxTouchPoints ? true : false;

$(document).ready(function(){

	$('.word_action').on('mousedown touchstart', function() {
		$('.header_text').find('span').css('opacity', 0);
		$(this).css('opacity', 1);
		$('header, .logo, .menu-idioma').hide();
		$('.hamburger').addClass('hide');
		if ($(this).attr('data-id') == 'rebel') {
			$('.container_rebel').css('visibility', 'visible');
			//video.setAttribute("src", "videos/rebel.mp4");
			video_01.play();
			video_01.style.display = 'block';
			video_02.style.display = 'none';
			video_03.style.display = 'none';
		} else if($(this).attr('data-id') == 'passionate') {
			$('.container_rebel').css('visibility', 'visible');
			//video.setAttribute("src", "videos/passionate.mp4");
			video_02.play();
			video_01.style.display = 'none';
			video_02.style.display = 'block';
			video_03.style.display = 'none';
		} else if($(this).attr('data-id') == 'curious') {
			$('.container_curious').css('visibility', 'visible');
			pong.startSinglePlayer();
		} else if($(this).attr('data-id') == 'meaningful') {
			$('.container_rebel').css('visibility', 'visible');
			//video.setAttribute("src", "videos/createvalue.mp4");
			video_03.play();
			video_01.style.display = 'none';
			video_02.style.display = 'none';
			video_03.style.display = 'block';
		}
		$('html, body').stop().animate({scrollTop: 0}, {duration: 'slow', easing: 'easeInOutQuint', complete: function(){
			if (!$(this).hasClass('gameMode')) {
				$(this).addClass('gameMode');
			}
		}});
	});

	$(document).on('mouseup touchend', function() {
		$('html, body').stop().removeClass('gameMode');
		$('.header_text').find('span').css('opacity', 1);
		$('.container_rebel').css('visibility', 'hidden');
		$('.container_passionate').css('visibility', 'hidden');
		$('.container_curious').css('visibility', 'hidden');
		$('.container_meaningful').css('visibility', 'hidden');
		$('header, .logo, .menu-idioma').show();
		$('.hamburger').removeClass('hide');
		video_01.pause();
		video_02.pause();
		video_03.pause();
		pong.stop(true);
	});

	// $.get('https://maps.googleapis.com/maps/api/timezone/outputFormat?parameters', function(response){
	// });

	$('.icon').hover(function(){
		$(this).find('svg').css('filter', 'url(#filter)');
		$(this).find('span').css('filter', 'url(#filter)');
		var target = $(this);
		setTimeout(function(){
			if (target.is(':hover')) {
    		target.find('span').text(target.find('span').attr('data-subtitle')).css('font-weight', '700');
    	}
		}, 200);
		setTimeout(function(){
			target.find('svg').css('filter', 'none');
			target.find('span').css('filter', 'none');
		}, 1000);
	}, function(){
		$(this).find('svg').css('filter', 'none');
		$(this).find('span').css('filter', 'none');
		$(this).find('span').text($(this).find('span').attr('data-title')).css('font-weight', '400');
	});

	// ---------------------------------------------------

	$('.flexslider').flexslider({
		animation: "slide",
		controlNav: false,
		directionNav: false,
		slideshow: false,
		animationLoop: mobile ? false : true,
		start: function(slider){

			flexslider = slider;

			var currentSlide = slider.slides.eq(slider.animatingTo);
			currentSlide.find('.poster').css('margin-left', '0px');
			var nextSlide = slider.slides.eq(slider.animatingTo + 1);;
			$(nextSlide).find('h2').css({'transform':'translateX(120px)'});
			$(nextSlide).find('p').css({'transform':'translateX(120px)'});
			$(nextSlide).find('a').css({'transform':'translateX(120px)'});

			$('.counter-slides').text((slider.animatingTo + 1) + ' / ' + slider.slides.length);

			var imageForLastClone = $('<img>').attr('class', 'last').attr('src', template_directory_uri + '/images/toolkit_01.jpg');
			$('.clone:eq(1)').append(imageForLastClone);

		},
		before: function(slider) {

			var currentSlide = slider.slides.eq(slider.animatingTo);
			$(currentSlide).find('h2').css({'transform':'translateX(0px)'});
			$(currentSlide).find('p').css({'transform':'translateX(0px)'});
			$(currentSlide).find('a').css({'transform':'translateX(0px)'});
			$(currentSlide).find('.poster').css('margin-left', '0px');

			if (slider.animatingTo == 0) {
				currentSlide = $('.clone:eq(1)');
				$(currentSlide).find('h2').css({'transform':'translateX(0px)'});
				$(currentSlide).find('p').css({'transform':'translateX(0px)'});
				$(currentSlide).find('a').css({'transform':'translateX(0px)'});
				$(currentSlide).find('.poster').css('margin-left', '0px');
			} else if (slider.animatingTo == 1) {
				currentSlide = $('.clone:eq(1)');
				$(currentSlide).find('h2').css({'transform':'translateX(120px)'});
				$(currentSlide).find('p').css({'transform':'translateX(120px)'});
				$(currentSlide).find('a').css({'transform':'translateX(120px)'});
				$(currentSlide).find('.poster').css('margin-left', '-265px');
			}

			var nextSlide;
			if (slider.animatingTo + 1 == slider.slides.length) {
				nextSlide = slider.slides.eq(0);
				$(nextSlide).find('h2').css({'transform':'translateX(-120px)'});
				$(nextSlide).find('p').css({'transform':'translateX(-120px)'});
				$(nextSlide).find('a').css({'transform':'translateX(-120px)'});
				if ($(window).width() <= 920) {
					$(nextSlide).find('.poster').css('margin-left', '0px');
				} else {
					$(nextSlide).find('.poster').css('margin-left', '-265px');
				}
			} else {
				nextSlide = slider.slides.eq(slider.animatingTo + 1);
				$(nextSlide).find('h2').css({'transform':'translateX(120px)'});
				$(nextSlide).find('p').css({'transform':'translateX(120px)'});
				$(nextSlide).find('a').css({'transform':'translateX(120px)'});
				if ($(window).width() <= 920) {
					$(nextSlide).find('.poster').css('margin-left', '0px');
				} else {
					$(nextSlide).find('.poster').css('margin-left', '-265px');
				}
			}

		},
		after: function(slider){

			var currentSlide = slider.slides.eq(slider.animatingTo);
			var nextSlide = slider.slides.eq(slider.animatingTo + 1);
			$('.counter-slides').text((slider.animatingTo + 1) + ' / ' + slider.slides.length);

		},
		end: function(slider) {

		}
	});

	$('.next').click(function(event){
		event.preventDefault();
		var prevSlide = flexslider.slides.eq(flexslider.animatingTo);
		var nextSlide = flexslider.slides.eq(flexslider.animatingTo + 1);

		$('.flexslider').flexslider('next');

		//TweenMax.to(prevSlide, .4, { css:{transform:"scale(.5, .5)"}, onComplete: function(){
		//	$('.flexslider').flexslider('next');
		//}, ease: Quint.easeOut });
	});

	// ---------------------------------------------------

	$('#enviar-email-button').on('click touchstart', function(event){
		event.preventDefault();

		if( !$('#aviso').is(':checked') ){

			modalThankYou('¡Lo sentimos!', 'Necesitamos saber si has leído nuestra Política de Privacidad.', 0);
			return;
		}
		if(validateEmail($('#email').val())) { // is an email
			//console.log($('#email').val());
			$.post(site_url + '/services/saveNewsletterSuscription.php', { email: $('#email').val() }, function(data){
				if(data.response == '1') {
					modalThankYouNewsletter('¡Listo!', 'Ahora estás suscrito a nuestro<br>newsletter.', 1);
					$('#email').val('');
					$('#email').blur();
				} else {
					modalThankYouNewsletter('¡Lo sentimos!', 'Hubo un error, intenta nuevamente.', 0);
				}
			});
		} else { // is not an email
			modalThankYouNewsletter('¡Lo sentimos!', 'Tú dirección de correo no es válida.', 0);
		}
	});

	// ---------------------------------------------------

	$("#email").keyup(function(event) {
    	if (event.keyCode === 13) {
			$('#enviar-email-button').trigger('click');
    	}
	});

	$('#email').on('click touchstart', function(){
		$(this).focus();
	});

	$('#email').focus(function(){
		$(this).css('filter', 'url(#filter_01)');
	});

	$('#email').blur(function(){
		$(this).css('filter', 'none');
	});

	// ---------------------------------------------------

	// Home - ScrollMagic

	// var controller = new ScrollMagic.Controller({horizontal: false});
  	//
	// var tween = new TimelineMax()
	// 	.add([
	// 		TweenMax.fromTo(".first-text", 1, {css:{transform:"translateY(300px)"}}, {css:{transform:"translateY(0px)"}, ease: Linear.easeNone})
	// 	]);
	// var scene = new ScrollMagic.Scene({triggerElement: ".wrapper_header", duration: $(window).height()})
	// 	.setTween(tween)
	// 	.addTo(controller);

	$(window).on('beforeunload', function(){
    	$(window).scrollTop(0);
	});

});

function addZero(i) {
	if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getWindowWidth() {
	var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	return w;
}

function getWindowHeight() {
	var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	return h;
}

function updateFlexslider() {
	$('.flexslider').data('flexslider').update();
}

function setVideoDimensions() {
	var w = video_01.videoWidth;
	var h = video_01.videoHeight;

	var videoRatio = (w / h);

	var containerStyles = window.getComputedStyle(container);
	var minW = parseInt(containerStyles.getPropertyValue('width'));
	var minH = parseInt(containerStyles.getPropertyValue('height'));

	var widthRatio = minW / w;
	var heightRatio = minH / h;

	if (widthRatio > heightRatio) {
		var newWidth = minW;
		var newHeight = Math.ceil(newWidth / videoRatio);
	} else {
		var newHeight = minH;
		var newWidth = Math.ceil(newHeight * videoRatio);
	}

	video_01.style.width = newWidth + 'px';
	video_01.style.height = newHeight + 'px';

	video_02.style.width = newWidth + 'px';
	video_02.style.height = newHeight + 'px';

	video_03.style.width = newWidth + 'px';
	video_03.style.height = newHeight + 'px';
}

function gameResizeContext() {
	pong.width = pong.runner.width = pong.runner.front.width = pong.runner.back.width = getWindowWidth();
	pong.height = pong.runner.height = pong.runner.front.height = pong.runner.back.height = getWindowHeight();

	pong.leftPaddle.maxY = pong.height - pong.leftPaddle.height;
	pong.leftPaddle.setpos(0, pong.leftPaddle.minY + (pong.leftPaddle.maxY - pong.leftPaddle.minY) / 2);

	pong.rightPaddle.maxY = pong.height - pong.rightPaddle.height;
	pong.rightPaddle.setpos(pong.width - pong.rightPaddle.width, pong.leftPaddle.minY + (pong.leftPaddle.maxY - pong.leftPaddle.minY) / 2);

	pong.ball.maxX = pong.width - pong.ball.radius;
	pong.ball.maxY = pong.height - pong.ball.radius;
}

function setPositionLeftPaddle(mousePosY) {
	if (pong.leftPaddle) {
		pong.leftPaddle.y = mousePosY - (pong.leftPaddle.height / 2);
	}
}

function resizeNoiseBackground() {
	var canvas_noise = document.getElementById('noise');
	canvas_noise.width = getWindowWidth();
	canvas_noise.height = getWindowHeight();
}

function onLoadMetaData() {
	setVideoDimensions();
}

function checkMobileMenu(){
	if ($(window).width() >= 680) {
		$('.hamburger').css({'display': 'none'});
		$('.close').css({'display': 'none'});
		$('.menu-mobile').css({'display': 'none'});
	} else {
		$('.hamburger').css({'display': 'block'});
	}
}

function onResize() {
	setVideoDimensions();
	gameResizeContext();
	resizeNoiseBackground();
	checkMobileMenu();
	updateFlexslider();
}

function onOrientationChange() {
	setVideoDimensions();
	gameResizeContext();
	resizeNoiseBackground();
}

function onMouseMove(event) {
	setPositionLeftPaddle(event.clientY);
}

function onTouchMove(event) {
	setPositionLeftPaddle(event.touches[0].clientY);
}

video_01.addEventListener('loadedmetadata', onLoadMetaData, false);
video_02.addEventListener('loadedmetadata', onLoadMetaData, false);
video_03.addEventListener('loadedmetadata', onLoadMetaData, false);
window.addEventListener('resize', onResize, false);
window.addEventListener('orientationchange', onOrientationChange, false);
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('touchmove', onTouchMove, false);

setVideoDimensions();
resizeNoiseBackground();

Game.ready(function() {
	pong = Game.start('game', Pong, {
		width: getWindowWidth(),
		height: getWindowHeight(),
		paddleWidth: 20,
		paddleHeight: 120,
		ballRadius: 10,
	});
});

// Modal Thank You Newsletter

function modalThankYouNewsletter(modalTitle, modalMessage, status) {

	container = document.createElement("div");

	var imageModal = document.createElement("img");
	if (status == 1) {
		imageModal.setAttribute("class", "rightImage");
		imageModal.setAttribute("src", template_directory_uri + "/images/rightImageBlue@2x.png");
	} else {
		imageModal.setAttribute("class", "errorImage");
		imageModal.setAttribute("src", template_directory_uri + "/images/errorImageBlue@2x.png");
	}

	var titleModal = document.createElement("h2");
	titleModal.setAttribute("class", "titleModal");
	titleModal.innerText = modalTitle;

	var lineSep = '<svg class="lineSep" width="27px" height="1px" viewBox="0 0 27 1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
	lineSep += '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square" stroke-opacity="0.770210598">';
	lineSep += '<g transform="translate(-132.000000, -194.000000)" stroke="#9B9B9B">';
	lineSep += '<path d="M132.5,194.5 L158.5,194.5" id="Line-4"></path>';
	lineSep += '</g>';
	lineSep += '</g>';
	lineSep += '</svg>';

	var textModal = document.createElement("h2");
	textModal.setAttribute("class", "textModal");
	textModal.innerHTML = modalMessage;

	container.appendChild(imageModal);
	container.appendChild(titleModal);
	container.innerHTML += lineSep;
	container.appendChild(textModal);

	swal({
		content: container,
		button: {
			text: "Ok",
			cancel: false,
			closeModal: true,
		}
	});

	$('.swal-footer').css('text-align', 'center');
}
