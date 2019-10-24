class Attribute {

  constructor(name, callback) {
    this._callback = callback;
    this._element = null;
    this._name = name;
  }

  connect(element) {
    this._element = element;

    if (this._callback && this._element) {
      const value = this._element.getAttribute(this._name) || "";
      if (value !== "") {
        this._callback(this._name, "", value);
      }
    }
  }

  disconnect() {
    if (this._callback && this._element) {
      const value = this._element.getAttribute(this._name) || "";
      if (value !== "") {
        this._callback(this._name, value, "");
      }
    }

    this._element = null;
  }

  update(previous, current) {
    if (this._element && previous !== current && this._callback) {
      this._callback(this._name, previous, current);
    }
  }

  set value(next) {
    if (this._element) {
      const current = this._element.getAttribute(this._name) || "";

      if (current !== next) {
        if (next !== "") {
          this._element.setAttribute(this._name, next);
        }
        else {
          this._element.removeAttribute(this._name);
        }
      }
    }
  }

  get value() {
    return this._element.getAttribute(this._name) || "";
  }

}

export { Attribute };
