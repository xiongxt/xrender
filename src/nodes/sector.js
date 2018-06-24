import Node from '../Node';

CanvasRenderingContext2D.prototype.sector = function (x, y, radius, sDeg, eDeg) {
    // 初始保存
    this.save();
    // 位移到目标点
    this.translate(x, y);
    this.beginPath();
    // 画出圆弧
    this.arc(0, 0, radius, sDeg, eDeg);
    // 再次保存以备旋转
    this.save();
    // 旋转至起始角度
    this.rotate(eDeg);
    // 移动到终点，准备连接终点与圆心
    this.moveTo(radius, 0);
    // 连接到圆心
    this.lineTo(0, 0);
    // 还原
    this.restore();
    // 旋转至起点角度
    this.rotate(sDeg);
    // 从圆心连接到起点
    this.lineTo(radius, 0);
    // this.stroke();
    this.closePath();
    // 还原到最初保存的状态
    this.restore();
    return this;
};

let deg = Math.PI / 180;

// function dealDeg (deg) {
//     deg = Math.floor(deg % 360);
//     if (deg < 0) {
//         deg = 360 + deg;
//     }
//     return deg;
// }

export default class Sector extends Node {
    _renderSelf (context) {
        if (!context) {
            context = this.context;
        }
        // this.style.sdeg = dealDeg(this.style.sdeg);
        // this.style.edeg = dealDeg(this.style.edeg);
        context.beginPath();
        context.save();
        context.translate(
            this.style.center.x * this.canvasScale,
            this.style.center.y * this.canvasScale
        );
        context.beginPath();
        context.arc(
            0,
            0,
            this.style.radius * this.canvasScale,
            this.style.sdeg * deg,
            this.style.edeg * deg
        );
        context.save();
        context.rotate(this.style.edeg * deg);
        context.moveTo(this.style.radius * this.canvasScale, 0);
        context.lineTo(0, 0);
        context.restore();
        context.rotate(this.style.sdeg * deg);
        context.lineTo(this.style.radius * this.canvasScale, 0);
        if (this.style.stroke) {
            context.lineWidth = this.style['border-width'];
            context.strokeStyle = this.style['border-color'];
            context.stroke();
        }
        if (this.style.fill) {
            context.fillStyle = this.style['background-color'];
            context.fill();
        }
        context.restore();
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
        this.setStyle({
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
