$(document).ready(function(){

	// Aside menu ////////////////////////////////////////////////////////////////////////


	jQuery('.check-aviso').click(function(event){

		if( !jQuery(this).next('.block-aviso').find('input.aviso').is(':checked') ){
			event.preventDefault();
			modalThankYou('¡Lo sentimos!', 'Necesitamos saber si has leído nuestra Política de Privacidad.', 0);
			return;
		}
	});

	var menuItems = [
		$('.side-nav nav ul li:eq(3)').find('a'),
		$('.side-nav nav ul li:eq(2)').find('a'),
		$('.side-nav nav ul li:eq(1)').find('a'),
		$('.side-nav nav ul li:eq(0)').find('a')
	];

  	$(window).scroll(function() {
    	var scroll = $(window).scrollTop();
    	if (scroll >= $(window).height()) {
			$('.side-nav nav ul li, .side-logo a').css('visibility', 'visible');
			$.each(menuItems, function(index, value){
				TweenMax.to($(value), 1, { delay: index * .05, css:{transform:"translateX(0px)", opacity: 1}, ease: Quint.easeOut });
			});
			TweenMax.to($('.side-logo a'), 1, { css:{transform:"rotate(90deg) translateZ(0) translateX(0px)", opacity: 1}, ease: Quint.easeOut });
		} else {
			TweenMax.to($('.side-nav nav ul li a'), 0, { css:{transform:"translateX(30px)", opacity: 0} });
			TweenMax.to($('.side-logo a'), 0, { css:{transform:"rotate(90deg) translateZ(0) translateX(-30px)", opacity: 0} });
			$('.side-nav nav ul li, .side-logo a').css('visibility', 'hidden');
		}
  	}).trigger('scroll');

  	// Aside menu ////////////////////////////////////////////////////////////////////////

	// Watches ///////////////////////////////////////////////////////////////////////////

	var timer = window.setInterval(function(){

		moment().tz('America/Mexico_City').format();
		var a = moment.tz(new Date(), 'America/Mexico_City');
		var b = moment.tz(new Date(), 'Europe/Madrid');
		var c = moment.tz(new Date(), 'America/Argentina/Buenos_Aires');

		var date = new Date();
	  	var s = date.getSeconds() * 6;

	  	var hora = 360 / 12;
	  	var fix_grados = 3 * hora;
	  	var horas_cdmx = (a.format('h')) * hora - fix_grados;
	  	var horas_madrid = (b.format('h')) * hora - fix_grados;
	  	var horas_buenosaires = (c.format('h')) * hora - fix_grados;

	  	//.attr('transform', 'rotate(' + (s - (15 * 6)) + ' 60,60)');

		$('.time_').text(a.format('HH:m') + ' h.');
		$('.time_').attr('transform', 'rotate(' + horas_cdmx + ' 60,60)');

		$('.time:eq(0)').text(a.format('HH:m') + ' h.');
		$('.time:eq(1)').text(b.format('HH:m') + ' h.');
		$('.time:eq(2)').text(c.format('HH:m') + ' h.');

		$('.time:eq(0)').attr('transform', 'rotate(' + horas_cdmx + ' 60,60)');
		$('.time:eq(1)').attr('transform', 'rotate(' + horas_madrid + ' 60,60)');
		$('.time:eq(2)').attr('transform', 'rotate(' + horas_buenosaires + ' 60,60)');

		$('.time_big_').text(a.format('HH:m') + ' h.');
		$('.time_big_').attr('transform', 'rotate(' + horas_cdmx + ' 70,70)');

		$('.time_big').text(a.format('HH:m') + ' h.');
		$('.time_big').attr('transform', 'rotate(' + horas_cdmx + ' 70,70)');

		$('.seconds').attr('transform', 'rotate(' + s + ' 60,60)');
    	$('.seconds_big').attr('transform', 'rotate(' + s + ' 70,70)');

	}, 1000);

	// Watches ///////////////////////////////////////////////////////////////////////////

	// Mobile controls ///////////////////////////////////////////////////////////////////

	$('.hamburger').on('mousedown touchstart', function(){
		$(this).css({'display': 'none'});
		$('.menu-mobile').css({'display': 'block'});
		$('.close').css({'display': 'block'});
	});

	$('.close').on('mousedown touchstart', function(){
		$('.menu-mobile').css({'display': 'none'});
		$(this).css({'display': 'none'});
		$('.hamburger').css({'display': 'block'});
	});

	// Mobile controls ///////////////////////////////////////////////////////////////////

	// Who we are ///////////////////////////////////////////////////////////////////////

	$('.picture').mouseover(function(){
    	$(this).attr('is_mouse_over', 'true');
    	loadPictureImage($(this).find('img').attr('src'), $(this));
  	}).mouseout(function(){
    	$(this).attr('is_mouse_over', 'false');
    	removePictureGlitch($(this))
  	});

	$.each($('.picture'), function(index, value){
		var img = $(value).parent().find('img');
		$(img).load(onResizeWindow);
	});

	$(window).resize(onResizeWindow).trigger('resize');

	function onResizeWindow() {
		if ($(window).width() > 460) {
			$.each($('.picture'), function(index, value){
				var img = $(value).parent().find('img');
		    	$(value).css({'height': img.height() + 'px'});
		    	$(value).attr('is_mouse_over', 'false');
			});
		} else {
			$.each($('.picture'), function(index, value){
				var img = $(value).parent().find('img');
		    	$(value).css({'height': 'auto'});
		    	$(value).attr('is_mouse_over', 'false');
			});
		}
	}

	// Who we are ////////////////////////////////////////////////////////////////////////

	// Who we are & Sede /////////////////////////////////////////////////////////////////

	$('.svg-icon, .opening').click(function(event){
    	event.preventDefault();
    	var contentUrl = '';
    	if ($(this).parent().attr('content-url')) {
    		contentUrl = $(this).parent().attr('content-url');
    	} else {
    		contentUrl = $(this).parent().parent().attr('content-url');
    	}
    	$('.position-content .inner-container').load(contentUrl, function(){
    		$('html, body').animate({scrollTop: $('.position-content').offset().top - 40}, 'slow');
	    	TweenMax.set($('.position-content'), { height: 'auto' });
	    	TweenMax.from($('.position-content'), 1, { css:{ height : 0 }, ease: Quint.easeOut });
	    	$('.position-content').css({'overflow': 'visible'});
	    	$('.minus').css({'display': 'block'});
	    	addFormListeners();
    	});
  	});

  	$('.minus').click(function(event){
	    event.preventDefault();
	    removeFormListeners();
	    TweenMax.to($('.position-content'), 1, { css:{'height': '0%'}, ease: Quint.easeOut });
	    $('.position-content').css({'overflow': 'hidden'});
	    $('.minus').css({'display': 'none'});
	});

	// Who we are & Sede /////////////////////////////////////////////////////////////////

	// Sede /////////////////////////////////////////////////////////////////////////////

	$('.instagram-module-img').mouseover(function(){
    	$(this).attr('is_mouse_over', 'true');
    	loadPictureImage($(this).find('img').attr('src'), $(this));
  	}).mouseout(function(){
    	$(this).attr('is_mouse_over', 'false');
    	removePictureGlitch($(this))
  	});

  	// Sede /////////////////////////////////////////////////////////////////////////////

  	// All //////////////////////////////////////////////////////////////////////////////

  	$(window).on('beforeunload', function(){
    	$(window).scrollTop(0);
	});

  	// All //////////////////////////////////////////////////////////////////////////////

	// Who we are & Sede ////////////////////////////////////////////////////////////////

	if(window.location.hash) {

		var hashes = [];
		var current_hash = window.location.hash.replace('#', '');

		$.each($('.position-module'), function(index, target){
			var hash = $(target).find('.opening-container').find('span').eq(0).text();
			hash = accentsTidy(hash.toLowerCase());
			hash = hash.toUpperCase();
			hash = hash.replaceAll('_', '');
			hash = hash.replaceAll(' ', '_');
			hash = hash.insertAt(0, "_");
			hashes.push(hash);
		});

		var in_array = $.inArray(current_hash, hashes);

		if (in_array >= 0) {
			$('.position-module:eq(' + in_array + ')').find('a').trigger('click');
		}

	}

	// Who we are & Sede ////////////////////////////////////////////////////////////////

	// Our Work 		 ////////////////////////////////////////////////////////////////

	if(window.location.hash) {

		hashes = [];
		current_hash = window.location.hash.replace('#', '');

		$.each($('.accordeon-module-title'), function(index, target){
			if ($(target).attr('hash') == current_hash) {
				$(target).click();
			}
		});

	}

	// Our Work 		 ////////////////////////////////////////////////////////////////


});

// Who we are & Sede /////////////////////////////////////////////////////////////////

function sendPositionFormData(event) {
	event.preventDefault();
	
	
	//console.log("tamaño", $('#file')[0].files[0].size);


	if( !$('#aviso').is(':checked') ){

		modalThankYou('¡Lo sentimos!', 'Necesitamos saber si has leído nuestra Política de Privacidad.', 0);
		return;
	}

	if ($('#name').val() == '' || $('#email').val() == '' || $('#tel').val() == '' || $('#url').val() == '' || $('#file').val() == '' || $('#why').val() == '') {
		
		modalThankYou('¡Lo sentimos!', 'Debes llenar todos los campos.', 0);
	
	} else if( $('#file')[0].files[0].size > (1024*1024*10)){
		
		modalThankYou('¡Lo sentimos!', 'Tu archivo debe pesar menos de 10MB. Intenta nuevamente.', 0);
	}else {
		if(validateEmail($('#email').val())) { // is an email
			
			$.ajax({
				url: site_url + '/services/savePositionFormData.php',
				type: 'POST',
				data: new FormData(this),
				contentType: false,
				cache: false,
				processData: false,
				success: function(data) 
				{
					$('#name').val('').blur();
					$('#email').val('').blur();
					$('#tel').val('').blur();
					$('#url').val('').blur();
					$('#file').val('').blur();
					$('#why').val('').blur();
					modalThankYou('¡Listo!', 'Gracias por enviar tu solicitud.', 1);
				},
				error: function (xhr, ajaxOptions, thrownError) {
			    	modalThankYou('¡Lo sentimos!', 'Hubo un error, intenta nuevamente.', 0);
			    }
			});

		} else { // is not an email
			
			modalThankYou('¡Lo sentimos!', 'Tú dirección de correo no es válida.', 0);
		
		}
	}
}

function addFormListeners() {
	removeFormListeners();
	$('#form-position').on('submit', sendPositionFormData);
}

function removeFormListeners() {
	$('#form-position').off('submit', sendPositionFormData);
}

function modalThankYou(modalTitle, modalMessage, status) {

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

// Glitch for Pictures ////////////////////////////////////////////////////////////////

function loadPictureImage(src, target) {
	var imageEl = new Image();
	imageEl.onload = function () {
		changeGlitchPicture(imageEl, target, src);
	};
	imageEl.src = src;
}

function changeGlitchPicture(img, target, src) {
	var params = glitches[getRandomInt(0, glitches.length - 1)];
  	glitch(params)
		.fromImage(img)
		.toDataURL()
		.then(function(dataURL) {
			var imageEl = new Image();
			imageEl.src = dataURL;

      		$(target).find('.glitch').css({'background-image': 'url(' + imageEl.src + ')'});
      		$(target).find('.glitch').css({'background-size': 'cover'});

			setTimeout(function(){
        		$(target).find('.glitch').css({'background-image': 'none'});
			}, 1000);
			setTimeout(function(){
        		$(target).find('.glitch').css({'background-image': 'url(' + imageEl.src + ')'});
        		$(target).find('.glitch').css({'background-size': 'cover'});
			}, 1050);
			setTimeout(function(){
				$(target).find('.glitch').css({'background-image': 'none'});
			}, 1100);

			setTimeout(function(){
        		if ($(target).attr('is_mouse_over') == 'true') {
        			loadPictureImage(src, $(target));
        		} else {
          			removePictureGlitch($(target));
        		}
			}, getRandomInt(1000, 3000));
		});
}

function removePictureGlitch(target) {
	$(target).find('.glitch').css({'background': 'none'});
}

// Who we are & Sede /////////////////////////////////////////////////////////////////










