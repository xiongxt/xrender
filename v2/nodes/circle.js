import Node from '../Node';
export default class Circle extends Node {
    constructor (config = {}) {
        super(config);
    }

    defaultConfig () {
        return {
            center: {
                x: 0,
                y: 0
            },
            radius: 0,
            lineWidth: 2,
            stroke: true,
            strokeStyle: '#ff0000',
            fill: false,
            fillStyle: 'red'
        };
    }

    render (context) {
        if (this.stroke) {
            context.beginPath();
            context.arc(this.center.x, this.center.y, this.radius, 0, 360, false);
            context.lineWidth = this.lineWidth;
            context.strokeStyle = this.strokeStyle;
            context.stroke();
        }
        if (this.fill) {
            context.beginPath();
            context.arc(this.center.x, this.center.y, this.radius, 0, 360, false);
            context.fillStyle = this.fillStyle;
            context.fill();
        }
    }
}
