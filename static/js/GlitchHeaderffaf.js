
// Glitch Header /////////////////////////////////////////////////////////////////////

$(function(){

	var imgContainerEl = $('#img-container');
	var imagePath = template_directory_uri + '/images/' + imgContainerEl.attr('bg-glitch');

	function loadImage(src) {
		var imageEl = new Image();
		imageEl.onload = function () {
			changeGlitch(imageEl);
		};
		imageEl.src = src;
	}

	function changeGlitch(img) {
		var params = glitches[getRandomInt(0, glitches.length - 1)];
		glitch(params)
			.fromImage(img)
			.toDataURL()
			.then(function(dataURL) {
				var imageEl = new Image();
				imageEl.src = dataURL;
				imgContainerEl.css('background-image', 'url(' + imageEl.src + ')');
				imgContainerEl.css('background-size', 'cover');

				setTimeout(function(){
					imgContainerEl.css('background-image', 'none');
				}, 1000);
				setTimeout(function(){
					imgContainerEl.css('background-image', 'url(' + imageEl.src + ')');
					imgContainerEl.css('background-size', 'cover');
				}, 1050);
				setTimeout(function(){
					imgContainerEl.css('background-image', 'none');
				}, 1100);

				setTimeout(function(){
					loadImage(imagePath);
				}, getRandomInt(2000, 10000));
			});
	}

	loadImage(imagePath);

});
