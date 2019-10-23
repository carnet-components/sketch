import { MarkupMirror } from './markup-mirror.js';
import { MarkupSource } from './markup-source.js';

class CarnetSketch extends HTMLElement {
  static get is() {
    return 'carnet-sketch';
  }

  constructor() {
    super();

    this._markupMirror = new MarkupMirror();
    this._markupSource = new MarkupSource();
    this._observer = new MutationObserver((e) => this.childElementsReconnect());
  }

  connectedCallback() {
    this.childElementsReconnect();
    this._observer.observe(this, { attributes: false, childList: true, subtree: true });
  }

  disconnectedCallback() {
    this._observer.disconnect();
    this.childElementsDisconnect();
  }

  childElementsReconnect() {
    const tpl = this.querySelector('template');
    if (tpl) {
      this._markupSource.set(tpl.innerHTML);
    }

    const source = this.querySelector('link[rel="CARNET.source"]');
    if (source && source.href) {
      this._markupSource.load(source.href);
    }

    const area = this.querySelector('textarea');
    if (area !== null) {
      this._markupSource.outputConnect(area);
      this._markupMirror.inputConnect(area);
    }
    else {
      this._markupSource.outputDisconnect();
      this._markupMirror.inputDisconnect();
    }

    const outputs = this.querySelectorAll('carnet-display, carnet-window, iframe');
    this._markupMirror.outputsSet(outputs);
  }

  childElementsDisconnect() {
    this._markupSource.outputDisconnect();
    this._markupMirror.inputDisconnect();
    this._markupMirror.outputsSet([]);
  }

}

export { CarnetSketch };
