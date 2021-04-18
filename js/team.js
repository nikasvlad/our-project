$(document).ready(() => {

  $('.team__item-name').on('click', function(e){
    if ($(this).hasClass('accord--active')){
      $(this).removeClass('accord--active');
      $(this).next('.team__item-content').slideUp();
      $('.team__item-content').siblings('.team__item-content').slideUp();
      console.log(e.target);
    }else{
      $(this).addClass('accord--active');
      $(this).next('.team__item-content').slideDown(200);
      $(this).siblings('.team__item-content').slideDown(200);
      $(this).siblings('.team__item').removeClass('accord--active');
      console.log(e.target);
    };
  });
});