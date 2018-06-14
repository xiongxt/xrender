import Node from '../Node';
import util from '../helpers/util';
export default class Collection extends Node {
    constructor (myStyle = {}, myAttrs = {}) {
        let _myStyle = { stroke: false };
        util.mixin(_myStyle, myStyle);
        super(_myStyle, myAttrs);
        this.on('startDrag', () => {
            this.children.forEach(node => {
                node.originStyle = util.clone(node.style);
                node.originStyle.center.x =
                    node.originStyle.center.x - this.style.start.x;
                node.originStyle.center.y =
                    node.originStyle.center.y - this.style.start.y;
                node.originStyle.start.x =
                    node.originStyle.start.x - this.style.start.x;
                node.originStyle.start.y =
                    node.originStyle.start.y - this.style.start.y;
                node.originStyle.end.x =
                    node.originStyle.end.x - this.style.start.x;
                node.originStyle.end.y =
                    node.originStyle.end.y - this.style.start.y;
            });
        });

        this.on('duringDrag', () => {
            console.log(this.mouseX);
            this.children.forEach(node => {
                node.style.center.x =
                    node.originStyle.center.x + this.style.start.x;
                node.style.center.y =
                    node.originStyle.center.y + this.style.start.y;
                node.style.start.x =
                    node.originStyle.start.x + this.style.start.x;
                node.style.start.y =
                    node.originStyle.start.y + this.style.start.y;
                node.style.end.x = node.originStyle.end.x + this.style.start.x;
                node.style.end.y = node.originStyle.end.y + this.style.start.y;
            });
        });
    }

    _renderSelf (context) {
        if (!context) {
            context = this.context;
        }

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

        this._initChildrenPos();

        context.closePath();
    }

    _initChildrenPos () {
        if (!this.childrenPosInited) {
            this.childrenPosInited = true;
            this.children.forEach(node => {
                node.style.center.x = this.style.center.x + this.style.start.x;
                node.style.center.y = node.style.center.y + this.style.start.y;
                node.style.start.x = node.style.start.x + this.style.start.x;
                node.style.start.y = node.style.start.y + this.style.start.y;
                node.style.end.x = node.style.end.x + this.style.start.x;
                node.style.end.y = node.style.end.y + this.style.start.y;
            });
        }
    }

    _checkPointInPath () {
        let xSpace = this.mouseX - this.style.start.x;
        let ySpace = this.mouseY - this.style.start.y;
        return (
            xSpace >= 0 &&
            xSpace <= this.style.width &&
            ySpace >= 0 &&
            ySpace < this.style.height
        );
    }
}
