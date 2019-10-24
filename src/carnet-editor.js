import { Attribute } from './attribute.js';

class CarnetEditor extends HTMLElement {
  static get is() {
    return 'carnet-editor';
  }

  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === 'value') {
      this._valattr.update(oldValue, newValue);
    }
  }

  constructor() {
    super();

    this._valattr = new Attribute('value', (name, previous, current) => {
      if (current !== null) {
        this._input.value = current;
      }
    });

    this._callback = (evt) => this._post(evt.target.value);
    this._input = null;
    this._observer = new MutationObserver((e) => this._rewire());
  }

  get value() {
    return this._valattr.value;
  }

  set value(value) {
    this._valattr.value = value;
  }

  connectedCallback() {
    this._rewire();
    this._observer.observe(this, { attributes: false, childList: true, subtree: true });
  }

  disconnectedCallback() {
    this._valattr.disconnect();
    this._observer.disconnect();
  }

  _post(value) {
    if (this.value !== value) {
      this.value = value;
      this.dispatchEvent(new Event('carnet.input', { bubbles: true }));
    }
  }

  _rewire() {
    const area = this.querySelector('textarea');
    if (this._input !== area) {
      if (this._input !== null) {
        this._valattr.disconnect();
        this._input.removeEventListener('input', this._callback);
        this._input = null;
      }
      if (area !== null) {
        this._input = area;
        this._input.addEventListener('input', this._callback);
        this._valattr.connect(this);
        if (this._input.value) {
          this._valattr.value = this._input.value;
        }
      }
    }
  }

}

export { CarnetEditor };
