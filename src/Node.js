import bus from './helpers/bus';
import style from './helpers/style';
import attribute from './helpers/attribute';
import Event from './event/Event';
import util from './helpers/util';
import draggable from './event/draggable';
import animation from './helpers/animation';
export default class Node extends Event {
    constructor(myStyle = {}, myAttrs = {}) {
        super();
        this.id = util.guid();
        this.style = Object.assign({}, style);
        this.attr = Object.assign({}, attribute);
        this.setStyle(myStyle, false);
        this.setAttr(myAttrs, false);
        util.mixin(this, animation);
        this.children = [];
        this.parent = null;
        this.isPointInPath = false;

        this.cache = {};

        this.mouseStatus = [];

        this.offsetChangeAble = true;

        this._checkCursor();

        bus.on('canvas/mousemove', ({
            x,
            y
        }) => {
            if (this.attr.ignore !== true && this.context) {
                this._setMouseLocation(x, y);
                let inPath = this._checkPointInPath();
                if (inPath === false) {
                    this.recoredMouseStatus(false);
                    this.fireMouseLeaveEvents();
                }
                if (inPath) {
                    return this;
                }
            }
        });
        bus.on('canvas/click', ({
            x,
            y
        }) => {
            if (this.attr.ignore !== true && this.context) {
                this._setMouseLocation(x, y);
                let inPath = this._checkPointInPath();
                if (inPath) {
                    return this;
                }
            }
        });
        bus.on('canvas/mousedown', ({
            x,
            y
        }) => {
            if (this.attr.ignore !== true && this.context) {
                this._setMouseLocation(x, y);
                let inPath = this._checkPointInPath();
                if (inPath) {
                    return this;
                }
            }
        });
    }

    _setMouseLocation(x, y) {
        this.mouseX = x;
        this.mouseY = y;
        this._setOffsetPosition();
    }

    /**
     * 记录鼠标位置相对于当前图形的坐标
     */
    _setOffsetPosition() {
        if (this.offsetChangeAble) {
            this.offsetX = this.mouseX - this.style.start.x;
            this.offsetY = this.mouseY - this.style.start.y;
        }
    }

    /**
     * 拖拽时，重新设置图形的位置信息
     */
    _setDraggingPos() {
        this.setStyle({
            start: {
                x: this.mouseX - this.offsetX,
                y: this.mouseY - this.offsetY
            }
        });
    }

    _checkPointInPath() {
        this._renderSelf(this.context2);
        let inPath = false;
        inPath = this.context2.isPointInPath(
            this.mouseX * this.canvasScale,
            this.mouseY * this.canvasScale
        );
        this.context2.closePath();
        return inPath;
    }

    _renderSelf() {}

    _renderChildren() {
        let sortArray = this.children.sort((item1, item2) => {
            return item1.style['z-index'] > item2.style['z-index'];
        });
        sortArray.forEach(item => {
            item.render();
        });
    }

    _setEnvo(envoParams) {
        this.envoParams = envoParams;
        util.mixin(this, envoParams);
    }

    _checkCursor() {
        if (this.style['cursor'] !== 'default' && this.usedCursor !== true) {
            this.usedCursor = true;
            this.on('mouseenter', () => {
                this.canvas.style.cursor = this.style.cursor;
            });
            this.on('mouseleave', () => {
                this.canvas.style.cursor = 'default';
            });
        }
    }

    render() {
        if (this.attr.ignore !== true && this.context) {
            this.renderIndex = this.envoParams.renderIndex + 1;
            this.envoParams.renderIndex = this.renderIndex;
            this._renderSelf();
            this._renderChildren();
        }
    }

    lockOffset() {
        this.offsetChangeAble = false;
    }

    unlockOffset() {
        this.offsetChangeAble = true;
    }

    setStyle(style, repaint = true) {
        util.mixin(this.style, style);
        this.originStyle = util.clone(this.style);
        this._checkCursor();
        if (repaint) {
            bus.trigger('repaint');
        }
    }

    setAttr(attr, repaint = false) {
        util.mixin(this.attr, attr);
        if (this.attr.draggable) {
            draggable.init(this);
        }
        if (repaint) {
            bus.trigger('repaint');
        }
    }

    addChild(node) {
        node._setEnvo(this.envoParams);
        node.setParent(this);
        this.children.push(node);
    }

    delChild(node) {
        let index = this.children.indexOf(node);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }

    setParent(parent) {
        this.parent = parent;
    }

    getCache(key) {
        return this.cache[key];
    }

    setCache(key, value) {
        this.cache[key] = value;
    }
}