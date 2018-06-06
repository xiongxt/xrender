import Node from './Node';
import mixin from './mixin';
export default class Render {
    constructor (envoParams) {
        mixin(this, envoParams);
        this.envoParams = envoParams;
        this.root = new Node();
        this.root.setEnvo(envoParams);
    }

    render () {
        requestAnimationFrame(() => {
            this.root.render();
            this.render();
        });
        // window.cancelAnimationFrame(id);
    }

    addElement (node) {
        this.root.addChild(node);
    }

    delElement (node) {
        this.root.delChild(node);
    }
}
