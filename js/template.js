let componentList = [
  { thumbnail: 'h1', desc: 'Heading 1' },
  { thumbnail: 'h2', desc: 'Heading 2' },
  { thumbnail: 'h3', desc: 'Heading 3' },
  { thumbnail: 'h4', desc: 'Heading 4' },
  { thumbnail: 'h4', desc: 'Heading 4' },
  { thumbnail: 'h4', desc: 'Heading 4' },
  { thumbnail: 'h4', desc: 'Heading 4' },
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
              <div class="list-thumbnail" style="">${el.thumbnail}</div>
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
};
