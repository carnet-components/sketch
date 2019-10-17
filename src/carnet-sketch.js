class CarnetSketch extends HTMLElement {
  static get is() {
    return 'carnet-sketch';
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `<slot></slot>`;
  }

  connectedCallback() {
    const { shadowRoot } = this;
    const slot = shadowRoot.querySelector('slot');

    slot.addEventListener('slotchange', function(e) {
      const nodes = slot.assignedElements();

      const area = nodes.map((child) => child.matches('textarea') ? child : child.querySelector('textarea')).find( (elem) => elem !== null );
      const outs = [].concat(
          nodes.map((child) => child.matches('carnet-display, iframe')),
          ...nodes.map((child) => Array.from(child.querySelectorAll('carnet-display, iframe')))
      ).filter( (elem) => elem );

      if (area) {
        outs.forEach( (out) => {
          out.srcdoc = area.value;
        });

        area.addEventListener('input', (e) => {
          outs.forEach( (out) => {
            out.srcdoc = area.value;
          });
        });
      }
    });
  }
}

export { CarnetSketch };
