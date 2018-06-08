import Node from './Node';
import mixin from './helpers/mixin';
import bus from './helpers/bus';
import Event from './helpers/Event';
export default class Render extends Event {
    constructor (envoParams) {
        super();
        mixin(this, envoParams);
        this.envoParams = envoParams;
        this.root = new Node();
        this.root._setEnvo(envoParams);
        bus.on('repaint', () => {
            this.render();
        });

        this.onMouseMoveFunc = () => {};
        this.onMouseLeaveFunc = () => {};

        bus.on('canvas/mousemove', ({ x, y }) => {
            this.fireEvent('mousemove');
        });
        bus.on('canvas/mouseleave', event => {
            this.onMouseLeaveFunc();
        });
        bus.on('canvas/mouseup', event => {
            this.onMouseLeaveFunc();
        });
    }

    render () {
        requestAnimationFrame(() => {
            this.context.clearRect(
                0,
                0,
                this.envoParams.canvasWidth,
                this.envoParams.canvasHeight
            );
            this.envoParams.renderIndex = 0;
            this.root.render();
        });
    }

    addElement (node) {
        this.root.addChild(node);
    }

    delElement (node) {
        this.root.delChild(node);
    }

    onMouseMove (func) {
        this.onMouseMoveFunc = func;
    }

    onMouseLeave (func) {
        this.onMouseLeaveFunc = func;
    }
}
