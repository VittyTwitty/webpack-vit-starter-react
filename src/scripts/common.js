let shrinkHeader = 1;
$(window).scroll(function () {
  let scroll = getCurrentScroll();
  if (scroll >= shrinkHeader) {
    $('.header_top').addClass('cloned');
  } else {
    $('.header_top').removeClass('cloned');
  }

  function getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }
});

$(function () {
  console.log("ready!");
  $('.single-item').slick({
    dots: true,
    prevArrow: false,
    nextArrow: false
  });
});
