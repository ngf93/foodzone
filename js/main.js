/* sticky header */
// if (window.matchMedia("(min-width: 768px)").matches) {
//   window.addEventListener('scroll', function() {
//     let st = window.pageYOffset;
//     let soop = getElementById("soop-menu");
//     let soop_height = soop.pageY;
//     if (st > soop_height) {
//       document.querySelector('header').classList.add("h-sticky");
//     } else {
//       document.querySelector('header').classList.remove("h-sticky");
//     }
//   });
// }

/* compare and favorite buttons state */
function toggleState(btn){
  btn.dataset.state = (btn.dataset.state == 'off') ? 'on' : 'off'
}

/* add to cart */
function addToCart(btn){
  btn.previousElementSibling.style.top='0%';
}
function checkValue(btn){
  if(btn.nextElementSibling.value == 1){
    btn.parentElement.style.top='-100%';
  }
}

/* password button state change */
function change_state(btn) {
  if(btn.dataset.state == 'invisible'){
    btn.previousElementSibling.setAttribute('type', 'text');
    btn.dataset.state = 'visible';
  } else {
    btn.previousElementSibling.setAttribute('type', 'password');
    btn.dataset.state = 'invisible';
  }
}

/* inputs verification if required & verifiable-btn activation/block */
function verifyInput(form){
  let requiredElems = Array.from(form.querySelectorAll('input[required]'));
  if(requiredElems.length == 0){
    return;
  } else {
    let flag = requiredElems.every(notNull);
    if (flag){
      console.log('все поля заполнены');
      form.querySelector('.verifiable-btn').removeAttribute('disabled');
    } else {
      console.log('есть незаполненые поля');
      form.querySelector('.verifiable-btn').setAttribute('disabled', 'disabled');
    }
  }

  function notNull(element, index, array) {
    if(element.type == 'radio' || element.type == 'checkbox'){
      let name = element.name;
      let arrBtns = Array.from(form.querySelectorAll('input[name="'+name+'"]'));
      if(arrBtns.some(isChecked)){return element;}
    } else if (element.type == 'text' && element.value.trim() != ''){
      return element;
    }
  }

  function isChecked(el){
    if(el.checked && el.value.trim() != ''){
      return el;
    }
  }
}

function switchTo(btn){
  let parent = btn.parentElement;
  let ind = parent.querySelector('.indicator');
  let arr_options = Array.from(parent.querySelectorAll('.switch-option'));
  for(let i = 0; i < arr_options.length; i++){
    arr_options[i].classList.remove('active');
    if(btn == arr_options[i]){
      btn.classList.add('active');
      ind.style.transform = moveInd(i);
    }
  }
}
function moveInd(index){
  let shift = 'translateX('+index*100 +'%)';
  return shift;
}
window.onload = function() {
  /* toasts */
  let toastElList = [].slice.call(document.querySelectorAll('.toast'))
  let toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl, { 
      autohide: false 
    })
  });
  toastList.forEach(toast => toast.show());

  /* switch buttons */
  let switchDivs = Array.from(document.querySelectorAll('.switch'));
  switchDivs.forEach(function(item, i, arr) {
    let ind = item.querySelector('.indicator');
    let arr_options = Array.from(item.querySelectorAll('.switch-option'));
    let cur_opt_index;
    for(let i = 0; i < arr_options.length; i++){
      if(arr_options[i].classList.contains('active')){
        cur_opt_index = i;
        ind.style.width = 100/arr_options.length + '%';
        ind.style.transform = moveInd(cur_opt_index);
      }
    }
  });

  /************  
  SEARCH / FILTER 
  *************/
  let arr_search = Array.from(document.querySelectorAll('.search-in-list'));
  arr_search.forEach(function(item, i, arr) {
      item.addEventListener('input', (event) => {
          listSearch(item);
      });
  });
  function listSearch(elem) {
    let phrase = elem.value.trim();
    let arr = elem.nextElementSibling.querySelectorAll('.search-item');
    let regPhrase = new RegExp(phrase, 'i');
    if(phrase.length == 0){
        for (let i = 0; i < arr.length; i++) {
            arr[i].classList.remove('overlap');
            arr[i].classList.remove('diff');
        }
    } else {
        let flag = false;
        for (let i = 0; i < arr.length; i++) {
            flag = regPhrase.test(arr[i].innerHTML);
            if (flag) {
              arr[i].classList.remove('diff');
              arr[i].classList.add('overlap');
            } else {
              arr[i].classList.remove('overlap');
              arr[i].classList.add('diff');
            }
        }
    }
  }

  /* input file */
  let arr_inputFile = Array.from(document.querySelectorAll('.upload-file input'));
  arr_inputFile.forEach(function(item, i, arr) {
      item.addEventListener('input', (event) => {
        processSelectedFiles(item);
      });
  });
  function processSelectedFiles(fileInput) {
    let output = fileInput.previousElementSibling;
    let files = fileInput.files;
    if (files.length==1){
      output.innerHTML = files[0].name;
    } else if (files.length==0) {
      output.innerHTML = 'Прикрепить файл';
    } else {
      output.innerHTML = 'Выбрано файлов: '+files.length;
    }
  }


  let cartPreview = document.getElementById('toggle-cart');
  if(cartPreview!=null && window.matchMedia("(min-width: 768px)").matches) {
    cartPreview.addEventListener('mouseenter', (event) => {
      cartPreview.querySelector('.cart-preview').style.display = 'block';
    });
    cartPreview.addEventListener('mouseleave', (event) => {
      cartPreview.querySelector('.cart-preview').style.display = 'none';
    });
  }
}