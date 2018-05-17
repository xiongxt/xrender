import VNode from '../core/vnode';
export default class Line extends VNode {
    constructor (config = {
        start: { x: 0, y: 0 },
        end: { x: 0, y: 0 },
        lineWidth: 2,
        strokeStyle: '#ff0000'
    }) {
        super(config);
    }

    render (context) {
        context.moveTo(this.start.x, this.start.y);
        context.lineTo(this.end.x, this.end.y);
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.strokeStyle;
        context.stroke();
    }
}
