export class MarkupMirror {
  constructor() {
    this._input = null;
    this._outputs = new Set();
  }

  inputConnect(input) {
    if (input !== this._input) {
      this.inputDisconnect();
      this._input = input;
      this._input.addEventListener('input', this.inputValueChanged.bind(this));
      this.outputsRefresh();
    }
  }

  inputDisconnect() {
    if (this._input !== null) {
      this._input.removeEventListener('input', this.inputValueChanged.bind(this));
    }

    this._input = null;
  }

  inputValueChanged(evt) {
    this.outputsRefresh();
  }

  outputConnect(output) {
    if (!this._outputs.has(output)) {
      this._outputs.add(output);
      this.outputRefresh(output);
    }
  }

  outputDisconnect(output) {
    this._outputs.delete(output);
  }

  outputRefresh(output) {
    if (this._input !== null && this._outputs.has(output)) {
      output.srcdoc = this._input.value;
    }
  }

  outputsSet(outputs) {
    // Disconnect removed outputs.
    const outset = new Set(outputs);
    Array.from(this._outputs)
      .filter((elem) => !outset.has(elem))
      .forEach((elem) => this.outputDisconnect(elem));

    // Connect all outputs.
    Array.from(outputs)
      .filter((elem) => !this._outputs.has(elem))
      .forEach((elem) => this.outputConnect(elem));
  }

  outputsRefresh() {
    Array.from(this._outputs)
      .forEach((elem) => this.outputRefresh(elem));
  }
}
