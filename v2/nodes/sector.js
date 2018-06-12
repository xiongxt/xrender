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

export default class Sector extends Node {
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
            fillStyle: 'red',
            sDeg: 0,
            eDeg: 0
        };
    }

    render (context) {
        if (this.fill) {
            context.beginPath();
            this._render(
                context,
                this.center.x,
                this.center.y,
                this.radius,
                this.sDeg * deg,
                this.eDeg * deg,
                false
            );
            context.fillStyle = this.fillStyle;
            context.fill();
            context.closePath();
        }
    }

    _render (context, x, y, radius, sDeg, eDeg) {
        // 初始保存
        context.save();
        // 位移到目标点
        context.translate(x, y);
        context.beginPath();
        // 画出圆弧
        context.arc(0, 0, radius, sDeg, eDeg);
        // 再次保存以备旋转
        context.save();
        // 旋转至起始角度
        context.rotate(eDeg);
        // 移动到终点，准备连接终点与圆心
        context.moveTo(radius, 0);
        // 连接到圆心
        context.lineTo(0, 0);
        // 还原
        context.restore();
        // 旋转至起点角度
        context.rotate(sDeg);
        // 从圆心连接到起点
        context.lineTo(radius, 0);
        if (this.stroke) {
            context.stroke();
        }
        context.closePath();
        // 还原到最初保存的状态
        context.restore();
    }
}
