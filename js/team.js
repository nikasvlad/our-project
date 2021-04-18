$(document).ready(() => {
  $('.team__item-name').on('click', function(e){
    const accordActiveClose = $('.accord--active')
    const sliderClose = $('team__item').hasClass(!accordActiveClose);
    if ($(this).hasClass('accord--active')){
      $(this).removeClass('accord--active');
      $(this).next('.team__item-content').slideUp();
    }else{
      let clonePos = $(this).prev('.team__item-head');
      $(this).addClass('accord--active');
      $(this).next('.team__item-content').slideDown(200);
      $(this).siblings('.team__item-content').slideDown(200);
      $(this).closest('.team__item').siblings('.team__item').find('.team__item-content').slideUp();
      $(this).closest('.team__item').siblings('.team__item').find('.team__item-name').removeClass('accord--active');
      $(clonePos).css({'display' : 'inline-block'})
      let cloness = $(this).next('.team__item-content');
      $(this).prev('.team__item-head').prependTo(cloness);
    };
  });
});