import Node from './Node';
import util from './helpers/util';
import bus from './helpers/bus';
import Event from './event/Event';
import draggable from './event/draggable';
export default class Render extends Event {
    constructor (envoParams) {
        super();
        util.mixin(this, envoParams);
        this.envoParams = envoParams;
        this.envoParams.renderObj = this;
        this.root = new Node();
        this.root._setEnvo(envoParams);
        draggable.setRender(this);
        bus
            .on('repaint', () => {
                this.render();
            })
            .on('canvas/mousemove', ({ x, y }) => {
                this.fireEvent('mousemove');
            })
            .on('canvas/mouseleave', event => {
                this.fireEvent('mouseleave');
            })
            .on('canvas/mouseup', event => {
                this.fireEvent('mouseup');
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
}
