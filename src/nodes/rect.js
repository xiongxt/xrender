import Node from '../Node';
export default class Rect extends Node {
    _renderSelf (context) {
        if (!context) {
            context = this.context;
        }
        context.beginPath();
        if (this.style.stroke) {
            context.beginPath();
            context.lineWidth = this.style['border-width'];
            context.strokeStyle = this.style['border-color'];
            context.rect(
                this.style.start.x * this.canvasScale,
                this.style.start.y * this.canvasScale,
                this.style.width * this.canvasScale,
                this.style.height * this.canvasScale
            );
            context.stroke();
        }
        if (this.style.fill) {
            context.beginPath();
            context.fillStyle = this.style['background-color'];
            context.rect(
                this.style.start.x * this.canvasScale,
                this.style.start.y * this.canvasScale,
                this.style.width * this.canvasScale,
                this.style.height * this.canvasScale
            );
            context.fill();
        }
    }
}
