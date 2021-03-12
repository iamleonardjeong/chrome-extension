let container = document.getElementById('container');

// browser right - bottom elements
// text color, bg color, clear
let textColor = document.getElementById('text-color');
let bgColor = document.getElementById('bg-color');
let clear = document.getElementById('clear');

// events
textColor.addEventListener('click', changeColor(textColor));
bgColor.addEventListener('click', changeColor(bgColor));
clear.addEventListener('click', () => {
  while (container.firstChild) {
    container.firstChild.remove();
  }
});

// function: change color
function changeColor(place) {
  place.addEventListener('click', () => {
    if (document.getElementsByClassName('change-box').length < 1) {
      let formEl = document.createElement('div');
      formEl.className = 'change-color-form';
      formEl.innerHTML = `
        <form id="change-color">
          <strong>${place.innerText} Change</strong>
          <input id="color" type="text" placeholder="Color Name" />
          <div id="change-color-buttons">
            <button type="submit">Change</button>
            <button id="change-color-cancel" type="reset">Cancel</button>
          <div>
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

// let h1 = document.querySelector('h1');
// h1.addEventListener('mouseover', () => {
//   h1.childNodes[1].style.display = 'inline';
// });
// h1.addEventListener('mouseleave', () => {
//   h1.childNodes[1].style.display = 'none';
// });

// let ok = document.querySelector('#ok');
// ok.addEventListener('mouseover', () => {
//   ok.childNodes[1].style.display = 'inline';
// });
// ok.addEventListener('mouseleave', () => {
//   ok.childNodes[1].style.display = 'none';
// });
