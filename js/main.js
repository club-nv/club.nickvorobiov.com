$(function() {

	var $body = $('body');
	var $header = $('.header');

	$(document).on('mouseover touchstart', '.student', function(e) {
		e.preventDefault();
		$(this).siblings().removeClass('is-active');
		$(this).addClass('is-active');
	});

	// 30 personal achievements

	$(document).on('click', '.js-show', function(e){
		e.preventDefault();
		$(this).parent().find('div.hidden').fadeIn(300);
		$(this).hide();
	});

	// sticker

	var about_bottom = $('.s-about').offset().top + $('.s-about').outerHeight(true);
	var page_height = $('body').height();
	
	if (!device.mobile() && !device.tablet()) {
		$(".js-sticker-about").sticky({
			topSpacing: 0,
			bottomSpacing: page_height - about_bottom,
			zIndex: -1,
		});
	}

	// Smooth scroll

	$(document).on('click', '.js-scr', function(e){
		e.preventDefault();
		var href = $(this).attr("href");
		var offsetTop = href === "#" ? 0 : $(href).offset().top-50;
		$('html, body').stop().animate({ scrollTop: offsetTop}, 700);
	});  
});

