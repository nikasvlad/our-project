$(document).ready(() =>{

  const sections = $('section');
  const display = $('.maincontent');
  const sideMenu = $('.sidebar')

  const mobileDetect = new MobileDetect(window.navigator.userAgent);
  const isMobile = mobileDetect.mobile();

  let inScroll = false;

  sections.first().addClass('active--ops');

  const coundSectionPosition = (sectionEq) => {
    return sectionEq * -100;
  }

  const changeMenuThemeForSection = (sectionEq) => {
    const currentSection = sections.eq(sectionEq)
    const menuTheme = currentSection.attr('data-sidemenu-theme')
    // const sideMenu = $('.sidebar')
    const classActive = 'sidebar--active';

    if (menuTheme == 'black') {
      sideMenu.addClass(classActive)
    } else {
      sideMenu.removeClass(classActive)
    }
  }

  const performTransition = (sectionEq) => {
    if (inScroll == false) {
    inScroll = true;
    const position = coundSectionPosition(sectionEq);

    // const currentSection = sections.eq(sectionEq)
    // const menuTheme = currentSection.attr('data-sidemenu-theme')
    // const sideMenu = $('.sidebar')

    // if (menuTheme == 'black') {
    //   sideMenu.addClass('sidebar--active')
    // } else {
    //   sideMenu.removeClass('sidebar--active')
    // }

    changeMenuThemeForSection(sectionEq)

    display.css({
      transform: `translateY(${position}%)`
    });

    sections.eq(sectionEq).addClass('active--ops').siblings().removeClass('active--ops');

    sideMenu.find('.sidebar__list-item__link').eq(sectionEq).addClass('sidebar__link--active').siblings('.sidebar__list-item__link').removeClass('sidebar__link--active');

    setTimeout(() => {
      inScroll = false;

      sideMenu.find('.sidebar__list-item__link').eq(sectionEq).addClass('sidebar__link--active').closest('.sidebar__list-item').siblings('.sidebar__list-item').find('.sidebar__list-item__link').removeClass('sidebar__link--active');
    }, 1300);
    }

  }

  const scrollViewport = direction => {
    const activeSection = sections.filter('.active--ops');
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (direction == 'next' && nextSection.length) {
      performTransition(nextSection.index())
    }

    if (direction == 'prev' && prevSection.length) {
      performTransition(prevSection.index())
    }
  }

  $(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;
  // console.log(deltaY)

  if (deltaY > 0) {
    scrollViewport('next');
  }

  if (deltaY < 0) {
    scrollViewport('prev');
  }
  });

  $(window).on('keydown', e =>{
    const tagesName = e.target.tagName.toLowerCase();
    if (tagesName != 'input' && tagesName != 'textarea') {
          switch (e.keyCode) {
      case 38:
        scrollViewport('prev');
        break;
    
      case 40:
        scrollViewport('next');
        break;
      }
    }

  });

  $('.wrapper').on('touchmove', e => e.preventDefault());

  $('[data-scroll-to]').click(e => {
    e.preventDefault();
    
    const thisIts = $(e.currentTarget);
    const scroLlet = thisIts.attr('data-scroll-to');
    const regSedtion = $(`[data-section-id=${scroLlet}]`)

    // console.log(regSedtion.index());
    performTransition(regSedtion.index());
    // console.log(regSedtion.index());
  });

  if (isMobile) {
    $("body").swipe( {
    swipe: function(
      event,
      direction,
      ) {
      const scroller = viewportScroller();
      let scrollDirection = '';

      if (direction == 'up') scrollDirection = 'next';
      if (direction == 'down') scrollDirection = 'prev';
      
      scroller[scrollDirection]();
    }
  });
  }
});