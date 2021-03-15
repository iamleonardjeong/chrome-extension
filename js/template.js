let componentList = [
  { thumbnail: 'h1', desc: 'Heading 1' },
  { thumbnail: 'h2', desc: 'Heading 2' },
  { thumbnail: 'h3', desc: 'Heading 3' },
  { thumbnail: 'h4', desc: 'Heading 4' },
  { thumbnail: 'p', desc: 'Paragraph' },
];

window.template = {
  componentList: () => {
    return `
    <div class="lists">
      <h3>Component List</h3>
      <hr />
      ${componentList
        .map((el) => {
          return `
            <div class="list">
              <div class="list-thumbnail">${el.thumbnail}</div>
              <div class="list-desc">${el.desc}</div>
            </div>
            <hr />
          `;
        })
        .join('')}
    </div>
    <button class="lists-cancel">Cancel</button>
    `;
  },
  addComponent: (tags) => {
    function insertComponent(e) {
      let tagName = e.path[1].childNodes[1].innerText;
      let tagDesc = e.path[0].innerText;
      let addTag = document.createElement('div');
      addTag.className = 'component-wrap';
      addTag.innerHTML = `
        <button class="component-edit-btn">Edit</button>
        <button class="component-delete-btn">Delete</button>
        <${tagName}>${tagDesc}</${tagName}>
      `;

      let target = document.querySelector('#container');
      target.appendChild(addTag);

      // component edit btn
      let editBtn = document.querySelectorAll('.component-edit-btn');
      editBtn[editBtn.length - 1].addEventListener(
        'click',
        window.template.componentEdit,
      );

      let deleteBtn = document.querySelectorAll('.component-delete-btn');
      deleteBtn[deleteBtn.length - 1].addEventListener('click', (e) =>
        e.path[1].remove(),
      );

      addTag.addEventListener('mouseover', () => {
        addTag.style.borderTop = '1px solid black';
        addTag.childNodes[1].style.opacity = 1;
        addTag.childNodes[3].style.opacity = 1;
      });
      addTag.addEventListener('mouseleave', () => {
        addTag.style.borderTop = 'none';
        addTag.childNodes[1].style.opacity = 0;
        addTag.childNodes[3].style.opacity = 0;
      });
    }
    tags.forEach((tag) => {
      tag.childNodes[3].addEventListener('click', insertComponent, {
        capture: false,
      });
    });
  },
  componentEdit: (event) => {
    let currentStyle = event.path[1].childNodes[5].style;

    let isInputTag = document.querySelector('#editInput');
    if (isInputTag) {
      return;
    }

    let formTag = document.createElement('div');
    formTag.id = 'editInput';
    formTag.innerHTML = `
    <div id="edit-form-wrap">
      <form id="edit-component">
        <h3>Edit Component</h3>

        <div class="edit-element">font-size</div>
        <input id="edit-font-size" value="${currentStyle.fontSize}" />

        <div class="edit-element">font-color</div>
        <input id="edit-font-color" value="${currentStyle.color}" />

        <div class="edit-element">line-height</div>
        <input id="edit-line-height" value="${currentStyle.lineHeight}" />

        <div class="edit-element">text</div>
        <textarea id="edit-text" type="text">${event.path[1].childNodes[5].innerText}</textarea>

        <div id="edit-buttons">
              <button type="submit">Change</button>
              <button id="edit-cancel" type="reset">Cancel</button>
        </div>
      <form>
    </div>
    `;
    document.body.prepend(formTag);

    let editForm = document.querySelector('#edit-component');
    editForm.addEventListener('submit', editFormFunc);

    let editCancel = document.querySelector('#edit-cancel');
    editCancel.addEventListener('click', () => {
      let editInput = document.querySelector('#editInput');
      editInput.remove();
    });

    window.addEventListener('keydown', (e) => {
      if (!document.querySelector('#editInput')) {
        return;
      }

      if (e.key === 'Escape') {
        editInput.remove();
      }
    });

    // form event
    function editFormFunc(e) {
      e.preventDefault();

      let fontSize = document.querySelector('#edit-font-size').value;
      let fontColor = document.querySelector('#edit-font-color').value;
      let lineHeight = document.querySelector('#edit-line-height').value;
      let text = document.querySelector('#edit-text').value;

      let tag = event.path[1].childNodes[5];
      tag.style.fontSize = fontSize || tag.style.fontSize;
      tag.style.color = fontColor || tag.style.color;
      tag.style.lineHeight = lineHeight || tag.style.lineHeight;
      if (text === '') {
        return;
      } else {
        tag.innerHTML = text;
      }
    }
  },
};
