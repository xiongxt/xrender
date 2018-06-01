import Node from '../Node';
export default class Rect extends Node {
    constructor (config = {}) {
        super(config);
    }

    defaultConfig () {
        return {
            start: {
                x: 0,
                y: 0
            },
            width: 0,
            height: 0,
            lineWidth: 1,
            stroke: true,
            fill: false,
            strokeStyle: '#ff0000',
            fillStyle: '#ff0000'
        };
    }

    render (context) {
        if (this.stroke) {
            context.beginPath();
            context.lineWidth = this.lineWidth;
            context.strokeStyle = this.strokeStyle;
            context.rect(this.start.x, this.start.y, this.width, this.height);
            context.stroke();
        }
        if (this.fill) {
            context.beginPath();
            context.rect(this.start.x, this.start.y, this.width, this.height);
            context.fillStyle = this.fillStyle;
            context.fill();
        }
    }
}
