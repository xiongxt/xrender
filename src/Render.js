import Node from './Node';
import Rect from './nodes/rect';
import util from './helpers/util';
import bus from './helpers/bus';
import Event from './event/Event';
import draggable from './event/draggable';
export default class Render extends Event {
    constructor(envoParams, backgroundColor = '#fff') {
        super();
        util.mixin(this, envoParams);
        this.envoParams = envoParams;
        this.envoParams.renderObj = this;
        this.root = new Rect({
            start: {
                x: 0,
                y: 0
            },
            width: envoParams.canvasWidth,
            height: envoParams.canvasHeight,
            fill: true,
            stroke: false,
            'background-color': backgroundColor
        });
        this.root._setEnvo(envoParams);
        draggable.setRender(this);
        bus.on('repaint', () => {
                this.render();
            })
            .on('canvas/mousemove', ({
                x,
                y
            }) => {
                this.fireEvent('mousemove');
            })
            .on('canvas/mouseleave', event => {
                this.fireEvent('mouseleave');
            })
            .on('canvas/mouseup', event => {
                this.fireEvent('mouseup');
            });
    }

    render() {
        requestAnimationFrame(() => {
            // this.context.clearRect(
            //     0,
            //     0,
            //     this.envoParams.canvasWidth,
            //     this.envoParams.canvasHeight
            // );
            console.time('render')
            this.envoParams.renderIndex = 0;
            this.root.render();
            console.timeEnd('render');
        });
    }

    addChild(node) {
        this.root.addChild(node);
    }

    delChild(node) {
        this.root.delChild(node);
    }
}