import Node from '../Node';
export default class Line extends Node {
    _renderSelf (context) {
        if (!context) {
            context = this.context;
        }
        context.beginPath();
        context.moveTo(
            this.style.start.x * this.canvasScale,
            this.style.start.y * this.canvasScale
        );
        context.lineTo(
            this.style.end.x * this.canvasScale,
            this.style.end.y * this.canvasScale
        );
        context.lineWidth = this.style['border-width'];
        context.strokeStyle = this.style['border-color'];
        context.stroke();
        context.closePath();
    }

    _checkPointInPath () {
        let rate1 =
            (this.style.end.y - this.style.start.y) /
            (this.style.end.x - this.style.start.x);
        let mx;

        if (rate1 === 0) {
            mx = this.style.end.y;
        } else {
            mx =
                (this.mouseY - this.style.start.y) / rate1 + this.style.start.x;
        }

        if (
            this.mouseX <= Math.max(this.style.start.x, this.style.end.x) &&
            this.mouseX >= Math.min(this.style.start.x, this.style.end.x)
        ) {
            if (rate1 === 0) {
                return Math.abs(this.mouseY - this.style.end.y) < 1;
            } else {
                return Math.abs(mx - this.mouseX) < 1;
            }
        } else {
            return false;
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
        this.setStyle({
            start: {
                x: this.mouseX - this.offsetX,
                y: this.mouseY - this.offsetY
            },
            end: {
                x:
                    this.mouseX -
                    this.offsetX +
                    (this.style.end.x - this.style.start.x),
                y:
                    this.mouseY -
                    this.offsetY +
                    (this.style.end.y - this.style.start.y)
            }
        });
    }
}
