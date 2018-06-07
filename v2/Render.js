import Node from './Node';
import mixin from './helpers/mixin';
import bus from './helpers/bus';
export default class Render {
    constructor (envoParams) {
        mixin(this, envoParams);
        this.envoParams = envoParams;
        this.root = new Node();
        this.root._setEnvo(envoParams);
        bus.on('repaint', () => {
            this.render();
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
