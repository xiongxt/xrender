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

    /**
     * 记录鼠标位置相对于当前图形的坐标
     */
    _setOffsetPosition () {
        if (this.offsetChangeAble) {
            this.offsetX =
                this.mouseX - (this.style.center.x - this.style.radius);
            this.offsetY =
                this.mouseY - (this.style.center.y - this.style.radius);
        }
    }

    /**
     * 拖拽时，重新设置图形的位置信息
     */
    _setDraggingPos () {
        this.setStype({
            center: {
                x:
                    this.style.center.x +
                    (this.mouseX -
                        this.offsetX -
                        (this.style.center.x - this.style.radius)),
                y:
                    this.style.center.y +
                    (this.mouseY -
                        this.offsetY -
                        (this.style.center.y - this.style.radius))
            }
        });
    }
}
