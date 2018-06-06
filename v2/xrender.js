import Render from './Render';
import bus from './bus';
import Circle from './nodes/Circle';

export default {
    init (selector, scale = 1) {
        let el = document.querySelector(selector);
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');

        const envoParams = {
            context: context,
            canvasWidth: el.clientWidth * scale,
            canvasHeight: el.clientHeight * scale,
            canvasScale: scale,
            canvasPxWidth: el.clientWidth,
            canvasPxHeight: el.clientHeight
        };

        canvas.style.width = `${envoParams.canvasPxWidth}px`;
        canvas.style.height = `${envoParams.canvasPxHeight}px`;
        canvas.width = envoParams.canvasPxWidth * scale;
        canvas.height = envoParams.canvasPxHeight * scale;

        el.appendChild(canvas);

        let render = new Render(envoParams);

        el.addEventListener('click', event => {
            bus.trigger('canvas/click', {
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
    Circle
};
