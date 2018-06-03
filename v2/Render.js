import Node from './Node';

export default class Render {
    constructor (envoParams) {
        this.envoParams = envoParams;
        this.root = new Node();
        // this.ctx = ctx;

        // this._root.ctx = ctx;
    }

    render () {
        let id = window.requestAnimationFrame(() => {
            this.root.render();
        });

        window.cancelAnimationFrame(id);
    }

    addElement (node) {
        this.root.addChild(node);
    }

    delElement (node) {
        this.root.delChild(node);
    }
}
