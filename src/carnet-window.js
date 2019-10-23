class CarnetWindow extends HTMLElement {
  static get is() {
    return 'carnet-window';
  }

  static get boundAttributes() {
    return ['srcdoc', 'url', 'name'];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === 'srcdoc') {
      this.srcdoc = newValue;
    }
    else if (attrName === 'name') {
      this.name = newValue;
    }
    else if (attrName === 'url') {
      this.url = newValue;
    }
  }

  get srcdoc() {
    return this._srcdoc;
  }

  set srcdoc(srcdoc) {
    this._srcdoc = srcdoc;
    this._windowRefresh();
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
    this._windowRefresh();
  }

  get url() {
    return this._url;
  }

  set url(url) {
    this._url = url;
    this._windowRefresh();
  }

  constructor() {
    super();
    this._name = "Carnet Preview";
    this._srcdoc = "";
    this._url = "about:blank";
    this._window = null;
    this._connected = false;
  }

  connectedCallback() {
    this._connected = true;
    this._windowRefresh();
  }

  disconnectedCallback() {
    this._connected = false;
  }

  _windowRefresh() {
    if (this._connected) {
      if (this._window === null || this._window.closed) {
        this._window = window.open(this._url, this._name);
        this._window.addEventListener('DOMContentLoaded', () => this._windowRefresh());
        return;
      }

      let child = this._window;
      if (child.location.toString() !== this._url) {
        child.location.replace(this._url);
        this._window.addEventListener('DOMContentLoaded', () => this._windowRefresh());
        return;
      }

      if (child.name !== this._name) {
        child.name = this._name;
      }

      const display = child.document.querySelector('carnet-display');
      if (display) {
        display.srcdoc = this._srcdoc;
      }
      else {
        child.document.body.innerHTML = this._srcdoc;
      }
    }
  }
}

export { CarnetWindow };
