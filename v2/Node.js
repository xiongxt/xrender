import bus from './helpers/bus';
import mixin from './helpers/mixin';
import style from './helpers/style';
import Event from './helpers/Event';
// import util from './helpers/util';

export default class Node extends Event {
    constructor (myStyle = {}, myAttrs = {}) {
        super();
        this.style = Object.assign({}, style);
        this.setStype(myStyle, false);
        this.children = [];
        this.needCheck = false;

        this.parent = null;
        this.isPointInPath = false;
        this.mouseStatus = [];

        this._checkCursor();

        bus.on('canvas/mousemove', ({ x, y }) => {
            this.mouseX = x;
            this.mouseY = y;
            let inPath = this._checkPointInPath();
            if (inPath === false) {
                this.recoredMouseStatus(false);
                this.fireMouseLeaveEvents();
            }
            if (inPath) {
                return this;
            }
        });
        bus.on('canvas/click', ({ x, y }) => {
            this.mouseX = x;
            this.mouseY = y;
            let inPath = this._checkPointInPath();
            if (inPath) {
                return this;
            }
        });
        bus.on('canvas/mousedown', ({ x, y }) => {
            this.mouseX = x;
            this.mouseY = y;
            let inPath = this._checkPointInPath();
            if (inPath) {
                return this;
            }
        });
    }

    _setMouseLocation (x, y) {
        this.mouseX = x;
        this.mouseY = y;
    }
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
        mixin(this, envoParams);
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

    setStype (style, repaint = true) {
        mixin(this.style, style);
        this._checkCursor();
        if (repaint) {
            bus.trigger('repaint');
        }
    }

    setAttr () {}

    getAttr () {}

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
