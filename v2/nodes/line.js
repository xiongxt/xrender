import Node from '../Node';
export default class Line extends Node {
    constructor (config = {

    }) {
        super(config);
    }

    defaultConfig () {
        return {
            start: { x: 0, y: 0 },
            end: { x: 0, y: 0 },
            lineWidth: 1,
            strokeStyle: '#ff0000'
        };
    }

    render (context) {
        context.beginPath();
        context.moveTo(this.start.x, this.start.y);
        context.lineTo(this.end.x, this.end.y);
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.strokeStyle;
        context.stroke();
        context.closePath();
    }
}
