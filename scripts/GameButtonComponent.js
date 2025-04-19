const template = document.createElement("template");
template.innerHTML = `
 <button>
      <img>
    </button>
    <style>
      button {
        background-color: white;
        border-radius: 50%;
        height: var(--game-button-height);
        width: var(--game-button-width);
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
        height: var(--game-button-height);
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

      :host([player-pick="true"]),
      :host([cpu-pick="true"]) {
        justify-items: center;
        grid-row: 1;
      }

      :host([player-pick="true"]):before,
      :host([cpu-pick="true"]):before {
        display: grid;
        color: white;
        font-size: 2em;
        transform: translateY(-180px);
      }

      :host([player-pick="true"]):before {
        content: "YOU PICKED";
      }


      :host([cpu-pick="true"]):before {
        content: "THE HOUSE PICKED";
      }

      :host([player-pick="true"]) button,
      :host([cpu-pick="true"]) button {
        height: calc(var(--game-button-height) * 1.5);
        width: calc(var(--game-button-width) * 1.5);
      }

      :host([player-pick="true"]),
      :host([player-pick="true"][cpu-pick="true"]) {
        grid-column: 1;
      }

      :host([player-pick="true"][cpu-pick="true"]):before {
        content: "YOU PICKED";
      }

      :host([cpu-pick="true"]) {
        grid-column: 3;
      }

      :host([player-pick="true"]) button:before,
      :host([cpu-pick="true"]) button:before {
        height: calc(var(--game-button-height) * 1.5);
        inset: -30px;
        padding: 30px;
      }

      @container(inline-size < 1000px) {
        button {
          display: grid;
        }

        img {
          transform: scale(2.5);
        }

        button::before {
          inset: -10px;
          padding: 10px;
        }

        :host([cpu-pick="true"]) {
          grid-column: 2;
        }

        :host([cpu-pick="true"]) button {
          animation-name: reveal-game-button;
          animation-duration: 2s;
          animation-iteration-count: 1;
        }

        :host([player-pick="true"]) button::before,
        :host([cpu-pick="true"]) button::before {
          height: calc(var(--game-button-height) * 1.5);
          inset: -15px;
          padding: 15px;
        }

        :host([player-pick="true"]) img,
        :host([cpu-pick="true"]) img {
          transform: unset;
        }

        :host([player-pick="true"])::before,
        :host([cpu-pick="true"])::before {
          display: grid;
          color: white;
          font-size: 0.8em;
          transform: translateY(210px);
          text-wrap: nowrap;
        }

        @keyframes reveal-game-button {
          from {
            filter: brightness(0)
          }

          to {
            filter: brightness(1)
          }
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
    this.shadowRoot.querySelector("button").setAttribute('aria-label', this.getAttribute('type'))
    this.shadowRoot.querySelector("img").setAttribute('alt', this.getAttribute('type'))
    this.shadowRoot.querySelector("button").addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent("picked move", { detail: { type: this.getAttribute('type') } }));
      this.setAttribute('player-pick', true);
      this.shadowRoot.querySelector("button").disabled = true;
    })
    window.addEventListener('cpu picked move', (event) => {
      const cpuPick = event.detail.type;
      const buttonHasBeenPickedByCpu = this.getAttribute('type') == cpuPick;
      buttonHasBeenPickedByCpu ? this.setAttribute('cpu-pick', true) : null;
      this.shadowRoot.querySelector("button").disabled = true;
    });
    window.addEventListener('new match', (event) => {
      this.removeAttribute('player-pick');
      this.removeAttribute('cpu-pick');
      this.shadowRoot.querySelector("button").disabled = false;
    });
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

