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

  markupMirrorConnect() {
    const area = this.querySelector('textarea');
    if (area !== null) {
      this._markupMirror.inputConnect(area);
    }
    else {
      this._markupMirror.inputDisconnect();
    }

    const outputs = this.querySelectorAll('carnet-display, iframe');
    this._markupMirror.outputsSet(outputs);
  }

  markupMirrorDisconnect() {
    this._markupMirror.inputDisconnect()
    this._markupMirror.outputsSet([])
  }

}

export { CarnetSketch };
