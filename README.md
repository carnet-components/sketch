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

In order to use the elements, place a `<carnet-source>` and or a `<carnet-editor>` (inputs) and one or more `<carnet-display>`, `<carnet-window>` or `<iframe>` elements (outputs) into a `<carnet-sketch>` container.

The `<carnet-source>` accepts a `<template>` child which defines markup which is used to initialize the editor and outputs. Alternatively a remote document can be specified using the `href` attribute on the `<carnet-source>` element or a `<link>` child element. In the latter case, the `rel` attribute needs to be set to `CARNET.source`.

In order to connect a code editor, it needs to be wrapped into a `<carnet-editor>`. Currently it only supports a simple `<textarea>`.

Markup from `<carnet-source>` and `<carnet-editor>` is automatically mirrored into a shadow DOM (`<carnet-display>` outputs), a separate browser window (`<carnet-window` outputs) or a nested browser context (`<iframe>` outputs). The outputs are refreshed whenever the input changes.

**Example**:

```html
<carnet-sketch>
    <carnet-editor>
    	<textarea>
        	<style>h1 { color: red; }</style>
        	<h1>Rendered inside shadow DOM</h1>
        	<p>
            	Changes in the markup will propagate automatically.
        	</p>
    	</textarea>
    </carnet-editor>
    <carnet-display></carnet-display>
</carnet-sketch>
```

Example markup code can be placed in external files and then referenced using a `<link>` element placed inside a `<carnet-sketch>`. The `rel` attribute of the `link` needs to be set to `CARNET.source`. The markup source is then loaded automatically from the referenced document and placed into the `<textarea>`.

**Example**:

```html
<carnet-sketch>
    <carnet-source>
        <link rel="CARNET.sketch" href="./some-example.html">
    </carnet-source>
    <carnet-editor>
        <textarea></textarea>
    </carnet-editor>
    <carnet-display></carnet-display>
</carnet-sketch>
```

### License

MIT

