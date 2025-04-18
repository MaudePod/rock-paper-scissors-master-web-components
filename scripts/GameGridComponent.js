
export default class GameGridComponent extends HTMLElement {
  #internals;
  constructor() {
    super();
    this.#internals = this.attachInternals();
  }
  connectedCallback(
  ) {

    window.addEventListener('picked move', (event) => {
      this.setAttribute('match-ended', true);
    });
    window.addEventListener('winner announced', (event) => {
      const winner = event.detail.winner;
      this.setAttribute('winner', winner);
    });
    this.#internals.shadowRoot.querySelector('button').addEventListener('click', (event) => {
      this.removeAttribute('match-ended');
      window.dispatchEvent(new CustomEvent("new match", {}));
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

