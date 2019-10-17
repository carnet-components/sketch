class CarnetDisplay extends HTMLElement {
  static get is() {
    return 'carnet-display';
  }

  static get boundAttributes() {
    return ['srcdoc'];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == 'srcdoc') {
      this.shadowRoot.innerHTML = newValue;
    }
  }

  get srcdoc() {
    return this.shadowRoot.innerHTML;
  }

  set srcdoc(newValue) {
    this.shadowRoot.innerHTML = newValue;
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
}

export { CarnetDisplay };
