const hideBar = document.querySelector('#hides__bar')
const burgerMenu = document.querySelector('.burger__menu')
const burgerClose = document.querySelector('.burger__close')

burgerMenu.addEventListener('click', () => {
  hideBar.style.display = 'block';
  burgerClose.style.display = 'block';
  burgerMenu.style.display = 'none';
});

burgerClose.addEventListener('click', () => {
  hideBar.style.display = 'none';
  burgerClose.style.display = 'none';
  burgerMenu.style.display = '';
});

const sliderCompos = document.querySelector('.slider__compos')
const sliderContent = document.querySelector('.slider__compos-popup')
sliderCompos.onmouseover = () => {
  sliderContent.style.display = 'block';
};
sliderCompos.onmouseout = () => {
  sliderContent.style.display = 'none';
};