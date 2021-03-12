let body = document.querySelector('body');
let container = document.getElementById('container');

// text color change - form element add
let textColor = document.getElementById('text-color');
textColor.addEventListener('click', () => {
  let formEl = document.createElement('div');
  formEl.innerHTML = `
  <form id="change-color">
    <strong>Text color</strong>
    <input id="color" type="text" placeholder="body color" />
    <div id="change-color-buttons">
      <input type="submit" value="Change" />
      <button id="change-color-cancel">Cancel</button>
    <div>
  </form>
  `;
  body.appendChild(formEl);

  // change color event
  let changeTarget = document.getElementById('change-color');
  changeTarget.addEventListener('submit', (event) => {
    let color = document.getElementById('color');
    container.style.color = color.value;

    event.preventDefault();
  });

  // remove form event
  let cancelBtn = document.getElementById('change-color-cancel');
  cancelBtn.addEventListener('click', () => {
    let removeTarget = document.getElementById('change-color');
    console.log(removeTarget);
    removeTarget.remove();
  });
});
