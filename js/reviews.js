$(document).ready(() => {
  $('.reviews__content-list__item-link').on('click', function(e) {
    e.preventDefault()
  })






  $('.reviews__content-list__item').on('click', function(e) {
    let indexItem = $(this).index()
    $('.reviews__content').eq(indexItem).addClass('reviews--active');
    $('.reviews__content').eq(indexItem).siblings('.reviews__content').removeClass('reviews--active')
    $(this).find('.reviews__content-list__item-link').addClass('reviews__content--active');
    $(this).siblings('.reviews__content-list__item').find('.reviews__content-list__item-link').removeClass('reviews__content--active')
    console.log(indexItem)
  });


});