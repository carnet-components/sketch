import { Attribute } from './attribute.js';
import { CodeMirrorAdapter } from './codemirror-adapter.js';
import { TextareaAdapter } from './textarea-adapter.js';

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

    this._adapter = null;
    this._input = null;
    this._observer = new MutationObserver((e) => this._rewire());
    this._valattr = new Attribute('value');
  }

  get value() {
    return this._valattr.value;
  }

  set value(value) {
    this._valattr.value = value;
  }

  connectedCallback() {
    this._valattr.connect(this);
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
    const candidates = [
      { selector: '.CodeMirror', adapter: new CodeMirrorAdapter() },
      { selector: 'textarea', adapter: new TextareaAdapter() },
    ];

    const bestmatch = candidates.map((record) => Object.assign(record, {
      element: this.querySelector(record.selector)
    })).find((record) => record.element !== null);

    if (bestmatch) {
      const { element, adapter } = bestmatch;
      if (this._input !== element && this._adapter !== null) {
        this._valattr.disconnect()
        this._adapter.disconnect();
        this._input = null;
        this._adapter = null;
      }

      if (this._input !== element && element !== null) {
        this._input = element;
        this._adapter = adapter;
        const { current, update } = this._adapter.connect(this._input, (value) => this._post(value));
        this._valattr = new Attribute('value', update);
        this._valattr.connect(this);
        if (current) {
          this._valattr.value = current;
        }
      }
    }
  }

}

export { CarnetEditor };
