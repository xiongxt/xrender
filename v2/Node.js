import bus from './bus';

export default class Node {
    constructor () {
        this.events = {};

        this.style = {};
        this.children = [];
        this.needCheck = false;

        this.parent = null;

        bus.on('point/check/click', (x, y) => {
            this.needCheck = true;
        });
    }

    render () {
        this.needCheck = false;
    }
    setAttributes () { }

    getAttribute () { }

    addChild () { }

    delChild () { }
}
