import bus from './bus';
import mixin from './mixin';

export default class Node {
    constructor () {
        this.events = {};

        this.style = {};
        this.children = [];
        this.needCheck = false;

        this.parent = null;

        bus.on('canvas/mousemove', ({
            x,
            y
        }) => {
            this.needCheck = true;
            // console.log(`{${x},${y}}`);
        });
    }

    render () {
        this.needCheck = false;
    }

    setEnvo (envoParams) {
        this.envoParams = envoParams;
        mixin(this, envoParams);
        console.log(this);
    }

    setAttr () {}

    getAttr () {}

    addChild () {}

    delChild () {}

    on () {}

    off () {}
}
