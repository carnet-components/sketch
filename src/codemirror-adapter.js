export class CodeMirrorAdapter {
  constructor() {
    this._codemirror = null;
    this._callback = null;
  }

  connect(element, callback) {
    this._callback = (instance, change) => callback(instance.getValue());

    this._codemirror = element.CodeMirror;
    this._codemirror.on('change', this._callback);

    const current = this._codemirror.getValue();
    const update = (name, previous, current) => {
      if (current !== null) {
        this._codemirror.setValue(current);
      }
    };

    return {
      current,
      update
    }
  }

  disconnect() {
    this._codemirror.off('change', this._callback);
    this._codemirror = null;
    this._callback = null;
  }
}
