# Carnet - Sketch Component

This package provides pure HTML custom elements which simplify the creation of interactive markup code demos.

Components included have no third-party dependencies. Users are expected to bundle and transpile them according to their preferences / needs. The components ship bare of any styling.

## Installation

```shell
npm install -D @carnet/sketch
```

## Usage

Depending on whether or not a bundler / preprocessor is used, the way how custom components are referenced is slightly different.

**Plain HTML with ES modules:**

```html
<html>
    <head>
        <script type="module" src="node_modules/@carnet/sketch/index.js"></script>
    </head>
   <body>
       [...]
    </body>
</html>
```

**Bundler with tilde expansion (e.g. parcel):**

```html
<html>
    <head>
        <script src="~/@carnet/sketch"></script>
    </head>
    <body>
        [...]
    </body>
</html>
```

In order to use the elements, place a `<textarea>` (input) and one or more `<carnet-display>`, `<carnet-window>` or `<iframe>` elements (outputs) into a `<carnet-sketch>` container. Markup from the `<textarea>` is then automatically mirrored into a shadow DOM (`<carnet-display>` outputs), a separate browser window (`<carnet-window` outputs) or a nested browser context (`<iframe>` outputs). The outputs are refreshed whenever the input changes.

**Example**:

```html
<carnet-sketch>
    <textarea>
        <style>h1 { color: red; }</style>
        <h1>Rendered inside shadow DOM</h1>
        <p>
            Changes in the markup will propagate automatically.
        </p>
    </textarea>
    <carnet-display></carnet-display>
</carnet-sketch>
```

Example markup code can be placed in external files and then referenced using a `<link>` element placed inside a `<carnet-sketch>`. The `rel` attribute of the `link` needs to be set to `CARNET.source`. The markup source is then loaded automatically from the referenced document and placed into the `<textarea>`.

**Example**:

```html
<carnet-sketch>
    <link rel="CARNET.sketch" href="./some-example.html">
    <textarea></textarea>
    <carnet-display></carnet-display>
</carnet-sketch>
```

### License

MIT

