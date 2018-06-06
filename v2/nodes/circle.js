import Node from '../Node';
export default class Circle extends Node {
    renderSelf () {
        let context = this.context;
        context.beginPath();
        if (this.style.stroke) {
            context.arc(
                this.style.center.x,
                this.style.center.y,
                this.style.radius,
                0,
                360,
                false
            );
            context.lineWidth = this.style['border-width'];
            context.strokeStyle = this.style['border-color'];
            context.stroke();
        }
        if (this.style.fill) {
            context.arc(
                this.style.center.x,
                this.style.center.y,
                this.style.radius,
                0,
                360,
                false
            );
            context.fillStyle = this.style['background-color'];
            context.fill();
        }
        if (this.needCheck) {
            this.checkPointInPath();
        }
        context.closePath();
    }
}
