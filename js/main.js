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

	// Smooth scroll

	$(document).on('click', '.js-scr', function(e){
		e.preventDefault();
		var href = $(this).attr("href");
		var offsetTop = href === "#" ? 0 : $(href).offset().top-50;
		$('html, body').stop().animate({ scrollTop: offsetTop}, 700);
	});

  // form

  $(document).on('submit', 'form', function (e){
    //console.log('form: отправляю..');
    var msg = $(this).serialize();

    var $vk = $(this).find('[name=vk]');

    var post_params = {
      vk: $vk.val(),
    };

    if(post_params.vk !== undefined && !post_params.vk.length) {
      $vk.addClass('error');
      e.preventDefault();
      return message.error('Укажи ссылку на свою страницу ВКонтакте, пожалуйста!', 'warning');
    }
  });

  // MESSAGE

  var message = {
    error:  function (msg) {
      var cls = 'warning';
      message.init(msg,cls);
    },
    success:  function (msg) {
      var cls = 'success';
      message.init(msg,cls);
    },
    init: function(msg, cls) {
      $body.append('<div class="notice notice--'+cls
        +'" style="opacity:0;"><div class="wrapper">'+msg+'</div></div>');

      var height_notice = $('.notice').height();
      $('.notice').css('bottom', '-'+height_notice+'px');
      $('.notice').animate({
          bottom: 0,
          opacity: 1
      }, 300);

      message.close(3000);
      return false;
    },
    close: function(time) {
      function notice_hide() {
        $(".notice").animate({
          opacity: 0},
          500, function() {
            $(this).remove();
        });
        $('.input').removeClass('error');
      }
      setTimeout(notice_hide, time);
    }
  };


  // sticker

  var controller = new ScrollMagic.Controller();

  var scene = new ScrollMagic.Scene(
    {triggerElement: ".s-about__sticker-trigger-start", triggerHook: "onEnter"})
    .setClassToggle(".s-about__sticker", "s-about__sticker--affix-start")
    //.addIndicators({name: "1 - add a class"}) // add indicators (requires plugin)
    .addTo(controller);

  var scene = new ScrollMagic.Scene(
    {triggerElement: ".s-about__sticker-trigger-finish", triggerHook: "onEnter"})
    .setClassToggle(".s-about__sticker", "s-about__sticker--affix-finish")
    //.addIndicators({name: "1 - add a class"}) // add indicators (requires plugin)
    .addTo(controller);

});
