import bus from './bus';
import mixin from './mixin';
import style from './helpers/style';
// import util from './helpers/util';

export default class Node {
    constructor (myStyle = {}, myAttrs = {}) {
        this.events = {
            click: [],
            mouseenter: [],
            mouseleave: []
        };
        this.style = Object.assign({}, style);
        this.setStype(myStyle);
        this.children = [];
        this.needCheck = false;

        this.parent = null;
        this.isPointInPath = false;

        bus.on('canvas/mousemove', ({ x, y }) => {
            this.mouseX = x;
            this.mouseY = y;
            this.needCheck = true;
        });
        bus.on('canvas/mouseenter', () => {
            this.needCheck = true;
        });
        bus.on('canvas/mouseleave', () => {
            this.needCheck = false;
        });
    }

    checkPointInPath () {
        let _isPointInPath = this.context.isPointInPath(
            this.mouseX,
            this.mouseY
        );
        if (
            this.events['mouseenter'].length &&
            _isPointInPath === true &&
            this.isPointInPath === false
        ) {
            this.events['mouseenter'].forEach(func => {
                func(this);
            });
        }

        if (
            this.events['mouseleave'].length &&
            _isPointInPath === false &&
            this.isPointInPath === true
        ) {
            this.events['mouseleave'].forEach(func => {
                func(this);
            });
        }
        this.isPointInPath = _isPointInPath;
    }

    renderSelf () {}

    renderChildren () {
        this.children
            .sort((item1, item2) => {
                return item1.style['z-index'] > item2.style['z-index'];
            })
            .forEach(item => {
                item.render();
            });
    }

    render () {
        // this.needCheck = false;
        this.renderSelf();
        this.renderChildren();
        // this.children.forEach(item => {
        //     item.render();
        // });
    }

    setEnvo (envoParams) {
        this.envoParams = envoParams;
        mixin(this, envoParams);
    }

    setStype (style) {
        mixin(this.style, style);
    }

    setAttr () {}

    getAttr () {}

    addChild (node) {
        node.setEnvo(this.envoParams);
        node.setParent(this);
        this.children.push(node);
    }

    delChild () {}

    setParent (parent) {
        this.parent = parent;
    }

    on (name = '', callback = () => {}) {
        this.events[name].push(callback);
    }

    off () {}
    _checkEvents () {
        // if (
        //     this.events['mouseenter'].length &&
        //     _isPointInPath === true &&
        //     this.isPointInPath === false
        // ) {
        //     this.events['mouseenter'].forEach(func => {
        //         func(this);
        //     });
        // }
        // if (
        //     this.events['mouseleave'].length &&
        //     _isPointInPath === false &&
        //     this.isPointInPath === true
        // ) {
        //     this.events['mouseleave'].forEach(func => {
        //         func(this);
        //     });
        // }
    }
    _checkVisibleOnPoint () {}
}
