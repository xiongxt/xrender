import VNode from '../core/vnode';
export default class Rect extends VNode {
    constructor (config = {
        start: { x: 0, y: 0 },
        width: 0,
        height: 0,
        backgroundColor: '#ff0000'
    }) {
        super(config);
    }

    render (context) {
        context.fillStyle = this.backgroundColor;
        context.fillRect(this.start.x, this.start.y, this.width, this.height);
    }
}
