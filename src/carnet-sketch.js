import { MarkupMirror } from './markup-mirror.js';

class CarnetSketch extends HTMLElement {
  static get is() {
    return 'carnet-sketch';
  }

  constructor() {
    super();

    this._markupMirror = new MarkupMirror();
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
    const source = this.querySelector('carnet-source');
    if (source !== null) {
      this._markupMirror.sourceConnect(source);
    }
    else {
      this._markupMirror.sourceDisconnect();
    }

    const editor = this.querySelector('carnet-editor');
    if (editor !== null) {
      this._markupMirror.editorConnect(editor);
    }
    else {
      this._markupMirror.editorDisconnect();
    }

    const outputs = this.querySelectorAll('carnet-display, carnet-window, iframe');
    this._markupMirror.outputsSet(outputs);
  }

  childElementsDisconnect() {
    this._markupMirror.editorDisconnect();
    this._markupMirror.sourceDisconnect();
    this._markupMirror.outputsSet([]);
  }

}

export { CarnetSketch };
