$(document).ready(() => {
  const myForm = document.querySelector('#form__container');
  const send = document.querySelector('#delivery__form-button__submit');

  send.addEventListener('click', event => {
    event.preventDefault();

    if (validateForm(myForm)) {
      const data = {
        name: myForm.elements.name.value,
        phone: myForm.elements.phone.value,
        comment: myForm.elements.comment.value,
        to: myForm.elements.to.value
      }
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(JSON.stringify(data));
      xhr.addEventListener('load', () =>{
        if (xhr.status >= 400) {
          $('.cont--form___error').css({'display': 'block'})
        } else {
          $('.form__container').css({'display': 'block'})
        }
        $('.form--close__btn').on('click', (e) =>{
          e.preventDefault();
          $('.form__container').css({'display': 'none'})
          $('.cont--form___error').css({'display': 'none'})
        });
      });
      
    } else {
      console.log('Какая-то ошибка')
    }



  });

  function validateForm(form) {
    let valValue = true;

    if (!validateField(form.elements.name)) {
      valValue = false;
    }
    if (!validateField(form.elements.phone)) {
      valValue = false;
    }
    if (!validateField(form.elements.to)) {
      valValue = false;
    }
    if (!validateField(form.elements.comment)) {
      valValue = false;
    }
    return valValue;
  }

  function validateField(field) {
    if (!field.checkValidity()) {
      field.nextElementSibling.textContent = field.validationMessage;

      return false;
    } else {
      field.nextElementSibling.textContent = '';

      return true;
    }
  }
});