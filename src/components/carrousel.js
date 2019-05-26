export default class Carrousel extends HTMLElement {
  constructor() {
    super();
    this.currentIndex = 0;
  }

  connectedCallback() {
    this.totalItems = this.getAttribute('items') || 0;
    this.addBullets();
  }

  addBullets() {
    const _self = this;
    const list = document.createElement('ul');
    list.className = 'carrousel-selector';
    for (let i = 0; i < this.totalItems; i++) {
      const bullet = document.createElement('li');
      const isActive = i === this.currentIndex;
      bullet.className = 'bullet';
      if (isActive) {
        bullet.className += ' active';
      }
      bullet.setAttribute('data-index', i);
      bullet.addEventListener('click', function () {
        const index = this.getAttribute('data-index');
        _self.moveTo(index);
      });
      list.appendChild(bullet);
    }
    this.parentNode.appendChild(list);
  }

  moveTo(position) {
    const newIndex = parseInt(position, 10);
    const width = this.clientWidth;
    const bullets = this.parentElement.querySelectorAll('.bullet');
    // Apply scroll
    this.scrollLeft = width * newIndex;
    // Update active class
    bullets[this.currentIndex].classList.remove('active');
    bullets[newIndex].classList.add('active');
    // Save index
    this.currentIndex = newIndex;
  }
}

window.customElements.define('demo-carrousel', Carrousel);