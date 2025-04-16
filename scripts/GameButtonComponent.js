const template = document.createElement("template");
template.innerHTML = `
      <button>
        <img>
      </button>
      <style>
        button {
          border-radius: 50%;
          height: 150px;
          width: 150px;
          box-sizing: border-box;
          padding: 20px;
          position: relative;
          border: 0;
          cursor: pointer;
          box-shadow: 0px -3px 8px 2px slategrey;
        }

        button::before {
          content: "";
          border-radius: 50%;
          height: 150px;
          background-image: var(--game-button-gradient);
          position: absolute;
          inset: -20px;
          padding: 20px;
          z-index: -1;
        }

        button:focus {
          outline-color: black;
          outline-style: dashed;
          outline-width: thick;
        }

        img {
          width: 100%;
          height: 100%;
        }

        :host([type="scissors"]) {
          --game-button-gradient: var(--scissors-gradient);

          img {
            content: url(./images/icon-scissors.svg) / "Scissors";
          }
        }

        :host([type="paper"]) {
          --game-button-gradient: var(--paper-gradient);

          img {
            content: url(./images/icon-paper.svg) / "Paper";
          }
        }

        :host([type="rock"]) {
          --game-button-gradient: var(--rock-gradient);

          img {
            content: url(./images/icon-rock.svg) / "Rock";
          }
        }

        :host([type="lizard"]) {
          --game-button-gradient: var(--lizard-gradient);

          img {
            content: url(./images/icon-lizard.svg) / "Lizzard";
          }
        }

        :host([type="spock"]) {
          --game-button-gradient: var(--cyan);

          img {
            content: url(./images/icon-spock.svg) / "Spock";
          }
        }
      </style>
`;
export default class GameButtonComponent extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback(
  ) {
    const shadowRoot = this.attachShadow({ mode: "open" })
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("button").setAttribute('aria-label',this.getAttribute('type'))
    this.shadowRoot.querySelector("img").setAttribute('alt',this.getAttribute('type'))
    this.shadowRoot.querySelector("button").addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent("picked move", { detail: { type: this.getAttribute('type') } }));
    })
  }

  static get observedAttributes() {
    return [
      'type',
    ];
  }
}
if (!customElements.get("game-button-component")) {
  customElements.define("game-button-component", GameButtonComponent);
}

