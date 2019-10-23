import { MarkupMirror } from './markup-mirror.js';

class CarnetSketch extends HTMLElement {
  static get is() {
    return 'carnet-sketch';
  }

  constructor() {
    super();

    this._markupMirror = new MarkupMirror();
    this._observer = new MutationObserver((e) => this.markupMirrorConnect());
  }

  connectedCallback() {
    this.markupMirrorConnect();
    this._observer.observe(this, { attributes: false, childList: true, subtree: true });
  }

  disconnectedCallback() {
    this._observer.disconnect();
    this.markupMirrorDisconnect();
  }

  markupSourceLoad() {
    const source = this.querySelector('link[rel="CARNET.source"]');
    if (source && source.href) {
      fetch(source.href).then((response) => {
        if (response.ok) {
          response.text().then((text) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "text/html");
            this._initialMarkup = doc.body.innerHTML;
            this.markupSourceInitialize();
          });
        }
      });
    }
  }

  markupSourceInitialize() {
    const area = this.querySelector('textarea');
    if (area !== null) {
      area.value = this._initialMarkup;
      area.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  markupMirrorConnect() {
    const area = this.querySelector('textarea');
    this.markupSourceLoad();

    if (area !== null) {
      this._markupMirror.inputConnect(area);
    }
    else {
      this._markupMirror.inputDisconnect();
    }

    const outputs = this.querySelectorAll('carnet-display, carnet-window, iframe');
    this._markupMirror.outputsSet(outputs);
  }

  markupMirrorDisconnect() {
    this._markupMirror.inputDisconnect();
    this._markupMirror.outputsSet([]);
  }

}

export { CarnetSketch };
