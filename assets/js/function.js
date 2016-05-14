$(function(){
  mentoringPopDown();
  setInterval(function(){articleTada()}, 4000);
  designBGStuff();
  headerDown();
  navScroll();
});

function headerDown() {
  if($(window).width() <= 840) {
    $('.mobile-nav-toggle, .nav-scroll').on('click', function(){
      $('.mobile-nav-toggle').toggleClass('is-open');
      $('.mobile-nav-container').toggleClass('is-open');
      //$('.header-position').toggleClass('is-open');
    });
  }
}

window.onresize = function() {
  headerDown();
}

function navScroll() {
  $('.nav-scroll').on('click', function(){
    if($(window).width() >= 840) {
      $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
      }, 500);
    } else {
      $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 80
      }, 500);
    }
    return false;
  });

}

function designBGStuff() {
  //Psuedo code: when .design-img-link is hover-on:
  $('.design-img-link').hover(function(){
    // find a color > apply the color to bg
    $(this).parent().parent().parent().parent().css('background-color', $(this).data('color'));
  }, function(){
    //off > revert the color
    $(this).parent().parent().parent().parent().css('background-color', $(this).parent().parent().parent().parent().data('orig-color'))
  });



}

function mentoringPopDown() {
  //when class: face is clicked, perform the following function
  $('.face').on('click', function(){
    //top vs offse.top --
    //-----Top is position from its parents (parent needs to have a position)
    //-----offsetTop is position from top of the DOM
    var $this = $(this);
    var faceTop = $this.position().top;
    var verMath = 230 - faceTop;
    var faceLeft = $this.position().left;
    var horzMath = 0 - faceLeft;

    if($(window).width() > 640) {
      //this is to move the whole faces class (parent of .face) to pretty
      //much the middle of mentoring-section
      $this.parent().css('top', + verMath +'px')


    } else {
      if($this.hasClass('back-btn')) {
        mentoringNarrowStart();
      } else {
        $this.parent().css('left', + horzMath +'px');
      }
    }
    //add class: has-bubble-open to THIS and remove class: has-bubble-open
    //from its siblings

    if (!$this.hasClass('back-btn')) {
      $this.addClass('has-bubble-open').siblings().removeClass('has-bubble-open');
    }
  });
};

//------------------------------------------------------------------
//the following 3 functions' main purposes is to reset everything when the
//window is being resize while these bubbles are active

$(window).resize(function() {
  if($(window).width() > 640) {
    mentoringWideStart();
  } else {
    mentoringNarrowStart();
  }
});

function mentoringNarrowStart() {
  $('.faces').css({
    'top': '200px',
    'left': '0px'
  });
  $('.face').first().addClass('has-bubble-open').siblings().removeClass('has-bubble-open');
}

function mentoringWideStart() {
  $('.faces').css({
    'top': '0px',
    'left': '0px'
  });
  $('.face:nth-child(3)').addClass('has-bubble-open').siblings().removeClass('has-bubble-open');
}

//-------------------------------------------------------------------

$(window).scroll(function(){
  youtubeVidScroll();
  startMentoring();
  startArticles();
});


function youtubeVidScroll() {
  var wScroll = $(window).scrollTop();
  //$ is to target
  //.css is to call the css file and add the function background-position
  //with value of "center -""+ wScroll + "px"
  //842 is how high the combine height of about and youtube (less strand onloading time)
  if ($('section.youtube').offset().top > wScroll - $('section.youtube').height()) {
    $('.video-strip').css('background-position','center -'+ wScroll + 'px');
  }
};

function startMentoring() {
  var wScroll = $(window).scrollTop();

  if (($('section.mentoring').offset().top < wScroll + $(window).height()/2)) {
    if (($(window).width() > 640)) {
      $('.faces').addClass('launched');

      //the if statement here is basically to make sure when one of the
      //face already has bubble-open class, then we don't pop another
      //bubble on the 3rd child
      if(!$('.face').hasClass('has-bubble-open')) {
        setTimeout(function(){
          $('.face:nth-child(3)').addClass('has-bubble-open');
        }, 300);
      }
    } else {
      mentoringNarrowStart();
    }
  }
};

function startArticles(){
  var wScroll = $(window).scrollTop();

  if (($('section.articles').offset().top < wScroll + $(window).height()/2)) {
    $('.article-thumb').each(function(i){
      setTimeout( function(){
        $('.article-thumb').eq(i).addClass('is-visible')
      }, 100*i);
    });
  }
};

function articleTada(){
  //$('.article-thumb').length is to count how many article-thumb there are
  //add 1 because this count start at 0
  var randNum = Math.floor(Math.random() * $('.article-thumb').length) + 1;

  $('.article-thumb').eq(randNum).addClass('is-emph').siblings().removeClass('is-emph');
};
