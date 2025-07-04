
// Who we are ////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){

  	var flexslider = { vars:{} };

	$('.flexslider').flexslider({
		animation: "slide",
		animationLoop: true,
		itemWidth: 920,
		itemMargin: 0,
		minItems: 1,
		maxItems: 3,
		slideshow: true,
		controlNav: true,
		directionNav: false,
		start: function(slider) {
			flexslider = slider;
		},
		before: function(slider) {

		},
		after: function(slider){

		},
		end: function(slider) {

		}
	});
	
});





