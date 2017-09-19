let shrinkHeader = 1;
$(window).scroll(function() {
  let scroll = getCurrentScroll();
  if(scroll >= shrinkHeader) {
    $('.header_top').addClass('cloned');
  } else {
    $('.header_top').removeClass('cloned');
  }

  function getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }
});


// let firstPointHeader = $('.header').offset().top;
//
// $(window).scroll(function () {
//   console.log('main');
//   let header = $('.header');
//   let scroll = $(window).scrollTop();
//
//   if (scroll >= firstPointHeader) header.addClass('fixed');
//   else header.removeClass('fixed');
// });

$(function() {
  console.log( "ready!" );
  $('.single-item').slick();
});
