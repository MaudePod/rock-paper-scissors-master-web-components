import RulesFactory from "./RulesFactory.js";
import { Match } from "./Match.js";
export default class GameStatusComponent extends HTMLElement {
  #internals;
  constructor() {
    super();
    this.#internals = this.attachInternals();
  }
  connectedCallback(
  ) {
    if (!sessionStorage.getItem('score')) {
      sessionStorage.setItem('score', 0);
    }
    this.updateDisplay();
    window.addEventListener('picked move', (event) => {
      const type = event.detail.type;
      const rulesFactory = new RulesFactory();
      const rules = rulesFactory.getRules(type);
      const match = new Match();
      match.runMatch(rules);
    });
    window.addEventListener('score updated', (event) => {
      this.updateDisplay();
    });

  }

  updateDisplay = () => {
    const score = sessionStorage.getItem('score');
    this.shadowRoot.querySelector("section[class='score']").innerHTML = score;

  }
  static get observedAttributes() {
    return [
    ];
  }
}
if (!customElements.get("game-status-component")) {
  customElements.define("game-status-component", GameStatusComponent);
}
