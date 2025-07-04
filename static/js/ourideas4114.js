
// Toolkit //////////////////////////////////////////////////////////////////////////////////
var file = null;

$(function(){

	$('.download-file').click(descargar);

	function descargar(event) {
	    event.preventDefault();


	    if( !jQuery(this).next('.block-aviso').find('input.aviso').is(':checked') ){
			modalCheckPoliticaPrivacidad();
			return;
		}
	    
	    file = jQuery(this).attr('href');

	    if (checkCookie() == true) {

	      	$.get(site_url + '/services/saveUserFile.php', { download : event.target.getAttribute("data-download") }, function(data){
	        	setCookie("register_ideas", "yes", 365);
	        	//document.getElementById("download_iframe").src = file;
	        	//modalThankYouToolkit();
	        	ga('create', 'UA-109152061-1');
	        	ga('send', {
	          		hitType: 'event',
	          		eventCategory: 'files',
	          		eventAction: 'download',
	          		eventLabel: event.target.getAttribute("data-download")
	        	});
	        	window.location.href = file;
	    	});

	      	return;
    	}

	    var container = document.createElement("div");

	    var titleModal = document.createElement("h2");
	    titleModal.setAttribute("class", "titleModal_01");
	    titleModal.innerText = "¡Hola!";

	    var email = document.createElement("input");
	    email.setAttribute("type", "text");
	    email.setAttribute("id", "email");
	    email.setAttribute("placeholder", "Email");

	    var nombre = document.createElement("input");
	    nombre.setAttribute("type", "text");
	    nombre.setAttribute("id", "name");
	    nombre.setAttribute("placeholder", "Nombre");

	    var pais = document.createElement("select");
	    pais.setAttribute("id", "country");

	    var option = document.createElement("option");
	    option.setAttribute("value", "");
	    option.setAttribute("selected", "selected");
	    option.innerText = "Selecciona un país";
	    pais.appendChild(option);

	    for (var i = 0; i < countries.length; i++) {
	    	option = document.createElement("option");
	    	option.setAttribute("value", countries[i]);
	    	option.innerText = countries[i];
	    	pais.appendChild(option);
	    }

	    container.appendChild(titleModal)
	    container.appendChild(email);
	    container.appendChild(nombre);
	    container.appendChild(pais);


	    /*var aviso = '<div class="block-aviso">'+
              '<input type="checkbox" name="aviso" class="aviso">'+
              'He leído y acepto la <a href="/politicaprivacidad" target="_blank">Política de Privacidad</a>. '+
              'Ver <a href="#" onclick="event.preventDefault(); jQuery(\'.info-legal\').show();">Detalle Legal</a>.'+
            '</div>'+
            '</div>';

	    container.append(aviso);*/

	    $('.swal-footer').css('text-align', 'left');

	    swal({
	    	content: container,
	    	button: {
	      		text: "Descargar",
	        	cancel: false,
	        	closeModal: true,
	      	}
	    })
	    .then(function(){
	    	var e = document.getElementById("email").value;
	    	var n = document.getElementById("name").value;
	    	var c = document.getElementById("country").value;
	    	var d = event.target.getAttribute("data-download");
	    	return fetch(site_url + '/services/saveUserFile.php?email=' + e + '&name=' + n + '&country=' + c + '&download=' + d);
	    })
	    .then(results => {
	    	return results.json();
	    })
	    .then(json => {
	    	if (json.response == 1) {
		        swal.stopLoading();
		        swal.close();
		        setCookie("register_ideas", "yes", 365);
		        //document.getElementById("download_iframe").src = file;
		        modalThankYouToolkit();
		        ga('create', 'UA-109152061-1');
		        ga('send', {
		        	hitType: 'event',
		        	eventCategory: 'files',
		        	eventAction: 'download',
		        	eventLabel: event.target.getAttribute("data-download")
		        });
		        
		        
	      	} else {

		        var container = document.createElement("div");

		        var imageModal = document.createElement("img");
		        imageModal.setAttribute("class", "errorImage");
		        imageModal.setAttribute("src", template_directory_uri + "/images/purpleErrorImage@2x.png");

		        var titleModal = document.createElement("h2");
		        titleModal.setAttribute("class", "titleModal");
		        titleModal.innerText = "¡Oops!";

		        var lineSep = '<svg class="lineSep" width="27px" height="1px" viewBox="0 0 27 1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
		        lineSep += '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square" stroke-opacity="0.770210598">';
		        lineSep += '<g transform="translate(-132.000000, -194.000000)" stroke="#9B9B9B">';
		        lineSep += '<path d="M132.5,194.5 L158.5,194.5" id="Line-4"></path>';
		        lineSep += '</g>';
		        lineSep += '</g>';
		        lineSep += '</svg>';

		        var textModal = document.createElement("h2");
		        textModal.setAttribute("class", "textModal");
		        textModal.innerHTML = "Llena los campos correctamente.";

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
    	})
    	.catch(err => {
      		if (err) {
        		//swal("Oh no!", "The AJAX request failed!", "error");
      		} else {
        		//swal.stopLoading();
        		//swal.close();
      		}
    	});
  	}
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var register = getCookie("register_ideas");
    if (register != "") {
      	return true;
    } else {
      	return false;
    }
}

function modalThankYouToolkit() {

  	container = document.createElement("div");
	
  	var imageModal = document.createElement("img");
  	imageModal.setAttribute("class", "rightImage");
  	imageModal.setAttribute("src", template_directory_uri + "/images/purpleRightImage@2x.png");
	
  	var titleModal = document.createElement("h2");
  	titleModal.setAttribute("class", "titleModal");
  	titleModal.innerText = "¡Listo!";
	
  	var lineSep = '<svg class="lineSep" width="27px" height="1px" viewBox="0 0 27 1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
  	lineSep += '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square" stroke-opacity="0.770210598">';
  	lineSep += '<g transform="translate(-132.000000, -194.000000)" stroke="#9B9B9B">';
  	lineSep += '<path d="M132.5,194.5 L158.5,194.5" id="Line-4"></path>';
  	lineSep += '</g>';
  	lineSep += '</g>';
  	lineSep += '</svg>';
	
  	var textModal = document.createElement("h2");
  	textModal.setAttribute("class", "textModal");
  	textModal.innerHTML = "Gracias por descargar<br>nuestro archivo.";
	
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
  	}).then(function(){
	    window.location.href = file;
	});

  	$('.swal-footer').css('text-align', 'center');
}

function modalCheckPoliticaPrivacidad() {

	var container = document.createElement("div");

    var imageModal = document.createElement("img");
    imageModal.setAttribute("class", "errorImage");
    imageModal.setAttribute("src", template_directory_uri + "/images/purpleErrorImage@2x.png");

    var titleModal = document.createElement("h2");
    titleModal.setAttribute("class", "titleModal");
    titleModal.innerText = "¡Lo sentimos!";

    var lineSep = '<svg class="lineSep" width="27px" height="1px" viewBox="0 0 27 1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
    lineSep += '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square" stroke-opacity="0.770210598">';
    lineSep += '<g transform="translate(-132.000000, -194.000000)" stroke="#9B9B9B">';
    lineSep += '<path d="M132.5,194.5 L158.5,194.5" id="Line-4"></path>';
    lineSep += '</g>';
    lineSep += '</g>';
    lineSep += '</svg>';

    var textModal = document.createElement("h2");
    textModal.setAttribute("class", "textModal");
    textModal.innerHTML = "Necesitamos saber si has leído nuestra Política de Privacidad.";

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
