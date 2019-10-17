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

In order to use the elements, place a `<textarea>` (input) and one or more `<carnet-display>` / `<iframe>` elements (outputs) into a `<carnet-sketch>` container. Markup from the `<textarea>` is then automatically mirrored into a shadow DOM (`<carnet-display>` outputs) or a nested browser context (`<iframe>` outputs). The outputs are refreshed whenever the input changes.

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

### License

MIT

