import bus from './helpers/bus';
import style from './helpers/style';
import attribute from './helpers/attribute';
import Event from './event/Event';
import util from './helpers/util';
import draggable from './event/draggable';
import animation from './helpers/animation';
export default class Node extends Event {
    constructor (myStyle = {}, myAttrs = {}) {
        super();
        this.id = util.guid();
        this.style = Object.assign({}, style);
        this.attr = Object.assign({}, attribute);
        this.setStype(myStyle, false);
        this.setAttr(myAttrs, false);
        util.mixin(this, animation);
        this.children = [];
        this.needCheck = false;
        this.parent = null;
        this.isPointInPath = false;
        this.mouseStatus = [];

        this.offsetChangeAble = true;

        this._checkCursor();

        bus.on('canvas/mousemove', ({
            x,
            y
        }) => {
            this._setMouseLocation(x, y);
            let inPath = this._checkPointInPath();
            if (inPath === false) {
                this.recoredMouseStatus(false);
                this.fireMouseLeaveEvents();
            }
            if (inPath) {
                return this;
            }
        });
        bus.on('canvas/click', ({
            x,
            y
        }) => {
            this._setMouseLocation(x, y);
            let inPath = this._checkPointInPath();
            if (inPath) {
                return this;
            }
        });
        bus.on('canvas/mousedown', ({
            x,
            y
        }) => {
            this._setMouseLocation(x, y);
            let inPath = this._checkPointInPath();
            if (inPath) {
                return this;
            }
        });
    }

    _setMouseLocation (x, y) {
        this.mouseX = x;
        this.mouseY = y;
        this._setOffsetPosition();
    }

    _setOffsetPosition () {}

    _checkPointInPath () {
        this._renderSelf(this.context2);
        let inPath = false;
        inPath = this.context2.isPointInPath(
            this.mouseX * this.canvasScale,
            this.mouseY * this.canvasScale
        );
        this.context2.closePath();
        return inPath;
    }

    _renderSelf () {}

    _renderChildren () {
        let sortArray = this.children.sort((item1, item2) => {
            return item1.style['z-index'] > item2.style['z-index'];
        });
        sortArray.forEach(item => {
            item.render();
        });
    }

    _setEnvo (envoParams) {
        this.envoParams = envoParams;
        util.mixin(this, envoParams);
    }

    _checkCursor () {
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

    render () {
        this.renderIndex = this.envoParams.renderIndex + 1;
        this.envoParams.renderIndex = this.renderIndex;
        this._renderSelf();
        this._renderChildren();
    }

    lockOffset () {
        this.offsetChangeAble = false;
    }

    unlockOffset () {
        this.offsetChangeAble = true;
    }

    setStype (style, repaint = true) {
        util.mixin(this.style, style);
        this._checkCursor();
        if (repaint) {
            bus.trigger('repaint');
        }
    }

    setAttr (attr, repaint = false) {
        util.mixin(this.attr, attr);
        if (this.attr.draggable) {
            draggable.init(this);
        }
        if (repaint) {
            bus.trigger('repaint');
        }
    }

    addChild (node) {
        node._setEnvo(this.envoParams);
        node.setParent(this);
        this.children.push(node);
    }

    delChild () {}

    setParent (parent) {
        this.parent = parent;
    }
}
