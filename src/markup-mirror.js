export class MarkupMirror {
  constructor() {
    this._editor = null;
    this._outputs = new Set();
    this._source = null;
  }

  sourceConnect(source) {
    if (source !== this._source) {
      this.sourceDisconnect();
      this._source = source;
      this._source.addEventListener('carnet.source', this.sourceValueChanged.bind(this));
      this.editorRefresh();
      this.outputsRefresh();
    }
  }

  sourceDisconnect() {
    if (this._source !== null) {
      this._source.removeEventListener('carnet.source', this.sourceValueChanged.bind(this));
    }

    this._source = null;
  }

  sourceValueChanged(evt) {
    this.editorRefresh();
    this.outputsRefresh();
  }

  editorConnect(editor) {
    if (editor !== this._editor) {
      this.editorDisconnect();
      this._editor = editor;
      this._editor.addEventListener('carnet.input', this.editorValueChanged.bind(this));
      this.outputsRefresh();
    }
  }

  editorDisconnect() {
    if (this._editor !== null) {
      this._editor.removeEventListener('carnet.input', this.editorValueChanged.bind(this));
    }

    this._editor = null;
  }

  editorRefresh() {
    if (
      this._editor !== null &&
      this._source !== null &&
      this._editor.value === "" &&
      this._source.value !== "")
    {
      this._editor.value = this._source.value;
    }
  }

  editorValueChanged(evt) {
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
    if (this._outputs.has(output)) {
      if (this._editor !== null) {
        output.srcdoc = this._editor.value;
      }
      else if (this._source !== null) {
        output.srcdoc = this._source.value;
      }
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
