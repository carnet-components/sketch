import { CarnetDisplay } from './src/carnet-display.js';
import { CarnetEditor } from './src/carnet-editor.js';
import { CarnetSketch } from './src/carnet-sketch.js';
import { CarnetSource } from './src/carnet-source.js';
import { CarnetWindow } from './src/carnet-window.js';

customElements.define(CarnetDisplay.is, CarnetDisplay);
customElements.define(CarnetEditor.is, CarnetEditor);
customElements.define(CarnetSketch.is, CarnetSketch);
customElements.define(CarnetSource.is, CarnetSource);
customElements.define(CarnetWindow.is, CarnetWindow);
