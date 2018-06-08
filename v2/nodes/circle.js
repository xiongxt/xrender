import Node from '../Node';
export default class Circle extends Node {
    _renderSelf (context) {
        if (!context) {
            context = this.context;
        }
        context.beginPath();
        if (this.style.stroke) {
            context.arc(
                this.style.center.x * this.canvasScale,
                this.style.center.y * this.canvasScale,
                this.style.radius * this.canvasScale,
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
                this.style.center.x * this.canvasScale,
                this.style.center.y * this.canvasScale,
                this.style.radius * this.canvasScale,
                0,
                360,
                false
            );
            context.fillStyle = this.style['background-color'];
            context.fill();
        }
    }

    _setOffsetPosition () {
        if (this.offsetChangeAble) {
            this.offsetX =
                this.mouseX - (this.style.center.x - this.style.radius);
            this.offsetY =
                this.mouseY - (this.style.center.y - this.style.radius);
        }
    }
}
