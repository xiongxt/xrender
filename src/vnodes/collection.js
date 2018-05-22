import VNode from '../core/vnode';
import Adapter from '../core/adapter';
export default class Collection extends VNode {
    constructor (config = {}) {
        super(config);
        this.children = Adapter.compile(this.children);
    }

    defaultConfig () {
        return {
            start: {
                x: 0,
                y: 0
            },
            children: []
        };
    }

    render (context) {
        context.save();
        context.translate(this.start.x, this.start.y);
        this.children.forEach(item => {
            item.render(context);
        });
        context.restore();
    }
}
