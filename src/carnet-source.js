import { Attribute } from './attribute.js';

class CarnetSource extends HTMLElement {
  static get is() {
    return 'carnet-source';
  }

  static get observedAttributes() {
    return ['value', 'href'];
  }

  attributeChangedCallback(name, previous, current) {
    if (name === 'value') {
      this._valattr.update(previous, current);
    }
    else if(name === 'href') {
      this._hrefattr.update(previous, current);
    }
  }

  constructor() {
    super();

    this._valattr = new Attribute('value');
    this._hrefattr = new Attribute('href', (name, previous, current) => {
      this._cancel();
      if (current) {
        this._fetch(current);
      }
    });

    this._inflight = null;
    this._observer = new MutationObserver((e) => this._rewire());
  }

  get value() {
    return this._valattr.value;
  }

  set value(value) {
    this._valattr.value = value;
  }

  get href() {
    return this._hrefattr.value();
  }

  set href(href) {
    this._hrefattr.value = href;
  }

  connectedCallback() {
    this._valattr.connect(this);
    this._hrefattr.connect(this);
    this._rewire();
    this._observer.observe(this, { attributes: false, childList: true, subtree: true });
  }

  disconnectedCallback() {
    this._observer.disconnect();
    this._hrefattr.disconnect();
    this._valattr.disconnect();
  }

  _post(value) {
    if (this.value !== value) {
      this.value = value;
      this.dispatchEvent(new Event('carnet.source', { bubbles: true }));
    }
  }

  _rewire() {
    const tpl = this.querySelector('template');
    if (tpl) {
      window.setTimeout(() => this._post(tpl.innerHTML));
    }

    const source = this.querySelector('link[rel="CARNET.source"]');
    if (source && source.href) {
      this.href = source.href;
    }
  }

  _cancel() {
    if (this._inflight) {
      this._inflight.abort();
    }

    this._inflight = null;
  }

  _fetch(url) {
    this._inflight = new AbortController();
    const signal = this._inflight.signal;

    fetch(url, { signal }).then((response) => {
      if (response.ok) {
        response.text().then((text) => {
          this._inflight = null;
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, 'text/html');
          const tpl = doc.querySelector('carnet-source template') || doc.body;
          this._post(tpl.innerHTML);
        });
      }
    });
  }

}

export { CarnetSource };
