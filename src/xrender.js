import Render from './Render';
import bus from './helpers/bus';
import Circle from './nodes/circle';
import Rect from './nodes/rect';
import Sector from './nodes/sector';
import Line from './nodes/line';
import Font from './nodes/font';
import Image from './nodes/image';
import Collection from './nodes/collection';

function _setCanvasStyle(canvas, envoParams) {
    canvas.style.width = `${envoParams.canvasPxWidth}px`;
    canvas.style.height = `${envoParams.canvasPxHeight}px`;
    canvas.width = envoParams.canvasPxWidth * envoParams.canvasScale;
    canvas.height = envoParams.canvasPxHeight * envoParams.canvasScale;
    canvas.style.position = 'absolute';
    canvas.style.left = 0;
    canvas.style.top = 0;
    // canvas.style.backgroundColor = backgroundColor;
}

export default {
    init(selector, scale = window.devicePixelRatio, backgroundColor = '#fff') {
        let el = selector;
        if (typeof (selector) === 'string') {
            el = document.querySelector(selector);
        }
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');

        window.context = context;

        let canvas2 = document.createElement('canvas');
        let context2 = canvas2.getContext('2d');

        el.style.position = 'relative';

        const envoParams = {
            canvas: canvas,
            canvas2: canvas2,
            context: context,
            context2: context2,
            canvasWidth: el.clientWidth * scale,
            canvasHeight: el.clientHeight * scale,
            canvasScale: scale,
            canvasPxWidth: el.clientWidth,
            canvasPxHeight: el.clientHeight,
            renderIndex: 0
        };

        _setCanvasStyle(canvas, envoParams);
        _setCanvasStyle(canvas2, envoParams);
        canvas.style.zIndex = 2;
        canvas2.style.zIndex = 1;

        el.appendChild(canvas);
        el.appendChild(canvas2);

        let render = new Render(envoParams, backgroundColor);

        el.addEventListener('click', event => {
            bus.trigger('canvas/click', {
                x: event.offsetX,
                y: event.offsetY
            });
        });
        el.addEventListener('mouseup', event => {
            bus.trigger('canvas/mouseup');
        });
        el.addEventListener('mousedown', event => {
            bus.trigger('canvas/mousedown', {
                x: event.offsetX,
                y: event.offsetY
            });
        });
        el.addEventListener('mousemove', event => {
            bus.trigger('canvas/mousemove', {
                x: event.offsetX,
                y: event.offsetY
            });
        });
        el.addEventListener('mouseleave', event => {
            bus.trigger('canvas/mouseleave');
        });
        el.addEventListener('mouseenter', event => {
            bus.trigger('canvas/mouseenter');
        });
        return render;
    },
    Circle,
    Rect,
    Sector,
    Line,
    Font,
    Image,
    Collection
};