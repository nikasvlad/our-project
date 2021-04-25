$(document).ready(() =>{

  // const newPas = document.querySelector('.slide__menu').getBoundingClientRect();
  // const toLeft = newPas.left;
  // const slideWidth = $('.menu__slide').width();
  // const whatLeft = toLeft - slideWidth;

  $(window).resize(function() {
    $('.menu__slide').removeClass('menu--active');
    $('.menu__slider--content').width('0');
    $('.container---menu').removeClass('container---active');
  });

  $('.menu__slide').on('click', function(e) {
    e.preventDefault();
    const widthClient = document.documentElement.clientWidth;    
    if ($(this).hasClass('menu--active')) {
      $(this).removeClass('menu--active');
      $(this).next('.menu__slider--content').width('0');
      $(this).closest('.container---menu').removeClass('container---active');
    } else {
      if (widthClient < 480) {
        const slideWidth = $('.menu__slide').width();
        const qwert = slideWidth;
        const slideLefted = widthClient - qwert;
        $(this).next('.menu__slider--content').width(slideLefted);
        $(this).addClass('menu--active');
        $(this).closest('.container---menu').siblings('.container---menu').find('.menu__slide').next('.menu__slider--content').width('0');
        $(this).closest('.container---menu').siblings('.container---menu').find('.menu__slide').removeClass('menu--active');
        $(this).closest('.container---menu').addClass('container---active');
      } else {
        if (widthClient < 768) {
          const slideWidth = $('.menu__slide').width();
          const qwert = slideWidth * 3;
          const slideLefted = widthClient - qwert;
          $(this).next('.menu__slider--content').width(slideLefted);
          $(this).addClass('menu--active');
          $(this).closest('.container---menu').siblings('.container---menu').find('.menu__slide').next('.menu__slider--content').width('0');
          $(this).closest('.container---menu').siblings('.container---menu').find('.menu__slide').removeClass('menu--active');
        } else {
            $(this).next('.menu__slider--content').width('37vh');
            $(this).addClass('menu--active');
            $(this).closest('.container---menu').siblings('.container---menu').find('.menu__slide').next('.menu__slider--content').width('0');
            $(this).closest('.container---menu').siblings('.container---menu').find('.menu__slide').removeClass('menu--active');
        }
      }






















      // if ($(this).hasClass('menu--active')) {
      //   $(this).removeClass('menu--active');
      //   $(this).next('.menu__slider--content').width('0');
      // } else {
      //   if (widthClient < 768) {
      //     const slideWidth = $('.menu__slide').width();
      //     const qwert = slideWidth * 3;
      //     const slideLefted = widthClient - qwert;
      //     $(this).next('.menu__slider--content').width(slideLefted);
      //     $(this).addClass('menu--active');
      //     $(this).siblings('.menu__slide').next('.menu__slider--content').width('0');
      //     $(this).siblings('.menu__slide').removeClass('menu--active');
      //   } else {
      //     $(this).next('.menu__slider--content').width('37vh');
      //     $(this).addClass('menu--active');
      //     $(this).siblings('.menu__slide').next('.menu__slider--content').width('0');
      //     $(this).siblings('.menu__slide').removeClass('menu--active');
      //   }
    }
  });

  

  $('.menu--close').on('click', function(e) {
    e.preventDefault();
    $('.menu--close').closest('.menu__slider--content').width('0');
    $('.container---menu').removeClass('container---active');

  });
  


  // $('.menu__title').on('click', function() {
    // const widthClient = document.documentElement.clientWidth;
    // if (widthClient >= 800) {
    //   alert('БОЛЬШЕ 800')
    // } else {
    //   alert('МЕНЬШЕ')
    // }


  //   console.log(whatLeft);
  // });



  
});