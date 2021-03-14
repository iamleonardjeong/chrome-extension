let container = document.getElementById('container');
let compare = document.getElementById('compare');

// browser right - bottom elements
// text color, bg color, clear
let componentBtn = document.getElementById('component');
let textColor = document.getElementById('text-color');
let bgColor = document.getElementById('bg-color');
let clear = document.getElementById('clear');

// events
componentBtn.addEventListener('click', () => {
  // text color, bg color 탭이 열려있다면 삭제
  if (document.getElementsByClassName('change-color-form').length === 1) {
    document.getElementsByClassName('change-color-form')[0].remove();
  }

  if (document.getElementsByClassName('component-list').length < 1) {
    let list = document.createElement('div');
    list.className = 'component-list';
    list.innerHTML = window.template.componentList();
    document.body.appendChild(list);

    let listItem = document.querySelectorAll('.list');
    window.template.addComponent(listItem);

    let cancelBtn = document.querySelector('.lists-cancel');
    cancelBtn.addEventListener('click', () => {
      list.remove();
    });
  }
});
textColor.addEventListener('click', changeColor(textColor));
bgColor.addEventListener('click', changeColor(bgColor));
clear.addEventListener('click', () => {
  while (container.firstChild) {
    container.firstChild.remove();
  }
  container.style.color = 'black';
  container.style.background = 'white';
});

// function: change color
function changeColor(place) {
  place.addEventListener('click', () => {
    // 다른 카테고리의 change color가 열려있다면 삭제
    if (document.querySelector('.change-color-form')) {
      document.querySelector('.change-color-form').remove();
    }

    if (document.getElementsByClassName('change-color-form').length < 1) {
      if (document.getElementsByClassName('component-list').length === 1) {
        document.getElementsByClassName('component-list')[0].remove();
      }
      let formEl = document.createElement('div');
      formEl.className = 'change-color-form';
      formEl.innerHTML = `
        <form id="change-color">
          <h3>${place.innerText} Change</h3>
          <input id="color" type="text" placeholder="Color Name" />
          <div id="change-color-buttons">
            <button type="submit">Change</button>
            <button id="change-color-cancel" type="reset">Cancel</button>
          </div>
        </form>
      `;

      document.body.appendChild(formEl);

      let focusEl = document.getElementById('color');
      focusEl.focus();

      // change color event
      let changeTarget = document.getElementById('change-color');
      changeTarget.addEventListener('submit', (event) => {
        let color = document.getElementById('color');
        console.log(color.value);

        if (event.target.childNodes[1].innerText === 'Text Color Change') {
          container.style.color = color.value;
        } else if (event.target.childNodes[1].innerText === 'Bg Color Change') {
          container.style.backgroundColor = color.value;
        }

        event.preventDefault();
      });

      // remove form event
      let cancelBtn = document.getElementById('change-color-cancel');
      cancelBtn.addEventListener('click', () => {
        let removeTarget = document.getElementsByClassName('change-color-form');
        removeTarget[0].remove();
      });
    }
  });
}

// window.template.componentList();
