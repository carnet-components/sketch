export class TextareaAdapter {
  constructor() {
    this._element = null;
    this._callback = null;
  }

  connect(element, callback) {
    this._callback = (evt) => callback(evt.target.value);

    this._element = element;
    this._element.addEventListener('input', this._callback);

    const current = element.value;
    const update = (name, previous, current) => {
      if (current !== null) {
        this._element.value = current;
      }
    };

    return {
      current,
      update
    }
  }

  disconnect() {
    this._element.removeEventListener('input', this._callback);
    this._element = null;
    this._callback = null;
  }
}
