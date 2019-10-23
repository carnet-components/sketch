export class MarkupSource {
  constructor() {
    this._initialized = false;
    this._markup = "";
    this._output = null;
    this._url = null;
  }

  set(markup) {
    this._markup = markup;
  }

  load(url) {
    if (url !== this._url) {
      fetch(url).then((response) => {
        if (response.ok) {
          response.text().then((text) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "text/html");
            this._markup = doc.body.innerHTML;
            this.outputRefresh();
          });
        }
      });
    }
  }

  outputConnect(output) {
    if (output !== this._output) {
      this._output = output;
      this._initialized = false;
      this.outputRefresh();
    }
  }

  outputDisconnect() {
    this._output = null;
  }

  outputRefresh() {
    if (this._output && !this._initialized && this._markup !== "") {
      this._initialized = true;
      this._output.value = this._markup;
      this._output.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
}
