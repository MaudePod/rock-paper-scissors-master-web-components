
export default class GameGridComponent extends HTMLElement {
 #internals;
    constructor() {
    super();
    this.#internals = this.attachInternals();
  }
  connectedCallback(
  ) {
    
    window.addEventListener('picked move', (event) => {
      this.setAttribute('player-finished',true);
    });
  }

  static get observedAttributes() {
    return [
    ];
  }
}
if (!customElements.get("game-grid-component")) {
  customElements.define("game-grid-component", GameGridComponent);
}

