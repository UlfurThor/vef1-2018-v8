const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);
    for (let item of items.querySelectorAll('.item')) {

      const cBox = item.querySelector('.item__checkbox');
      cBox.addEventListener('click', finish);

      const tBox = item.querySelector('.item__text');
      tBox.addEventListener('click', edit);


      const butt = item.querySelector('.item__button');
      butt.addEventListener('click', deleteItem);

    }
  }

  function formHandler(e) {
    e.preventDefault();

    const txt = document.querySelector('.form__input').value;
    if (txt.trim().length === 0) {
      document.querySelector('.form__input').value = "";
      return;
    }
    add(txt);
    document.querySelector('.form__input').value = "";
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    const cBox = e.currentTarget;
    const parent = cBox.parentNode;
    parent.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const tBox = e.currentTarget;
    const parent = tBox.parentNode;
    const refrence = parent.querySelector('.item__button');

    const txt = tBox.innerHTML;
    tBox.remove();

    const tInput = el('input', 'item__text');
    tInput.value = txt;
    tInput.addEventListener('keypress', commit);
    parent.insertBefore(tInput, refrence);
    tInput.focus();
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if (e.charCode != ENTER_KEYCODE) {
      return;
    }
    const tInput = e.currentTarget;
    const parent = tInput.parentNode;
    const refrence = parent.querySelector('.item__button');

    const txt = tInput.value;
    tInput.remove();

    const tBox = el('span', 'item__text');
    tBox.innerHTML = txt;
    tBox.addEventListener('click', edit);
    parent.insertBefore(tBox, refrence);

  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const item = el('li', 'item');

    const input = el('input', 'item__checkbox', finish);
    input.setAttribute('type', 'checkbox');

    const span = el('span', 'item__text', edit);
    span.appendChild(document.createTextNode(value));

    const button = el('button', 'item__button', deleteItem);
    button.appendChild(document.createTextNode("Eyða"));

    item.appendChild(input);
    item.appendChild(span);
    item.appendChild(button);

    items.appendChild(item);

  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    const button = e.currentTarget;
    const parent = button.parentNode;
    parent.remove();
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const element = document.createElement(type);
    if (className) {
      element.classList.add(className);
    }
    if (clickHandler) {
      element.addEventListener('click', clickHandler);
    }
    return element;

  }

  return {
    init: init
  }
})();