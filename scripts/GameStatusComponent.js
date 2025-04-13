
export default class GameStatusComponent extends HTMLElement {
    #internals;
       constructor() {
       super();
       this.#internals = this.attachInternals();
     }
     connectedCallback(
     ) {
       
       window.addEventListener('picked move', (event) => {
           const type = event.detail.type;
           if (type) {
               localStorage.setItem('move',type);
           }
       });
     }
   
     static get observedAttributes() {
       return [
       ];
     }
   }
   if (!customElements.get("game-status-component")) {
     customElements.define("game-status-component", GameStatusComponent);
   }
   