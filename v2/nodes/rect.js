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

    /**
     * 记录鼠标位置相对于当前图形的坐标
     */
    _setOffsetPosition () {
        if (this.offsetChangeAble) {
            this.offsetX = this.mouseX - this.style.start.x;
            this.offsetY = this.mouseY - this.style.start.y;
        }
    }

    /**
     * 拖拽时，重新设置图形的位置信息
     */
    _setDraggingPos () {
        this.setStype({
            start: {
                x: this.mouseX - this.offsetX,
                y: this.mouseY - this.offsetY
            }
        });
    }
}
