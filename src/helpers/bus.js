import util from './util';

const events = {};

export default {
    trigger (name = '', data = {}) {
        let funcs = events[name];
        if (funcs) {
            if (name === 'canvas/mousemove') {
                let nodes = [];
                funcs.forEach(func => {
                    let res = func(data);
                    if (res) {
                        nodes.push(res);
                    }
                });
                let node = util.getTopNode(nodes);
                node && node.fireMouseMoveEvents();
                nodes.forEach(_node => {
                    if (_node !== node) {
                        _node.fireMoveNotInPath();
                    }
                });
                return;
            }

            if (name === 'canvas/click') {
                let nodes = [];
                funcs.forEach(func => {
                    let res = func(data);
                    if (res) {
                        nodes.push(res);
                    }
                });
                let node = util.getTopNode(nodes);
                node && node.fireEvent('click');
                return;
            }

            if (name === 'canvas/mousedown') {
                let nodes = [];
                funcs.forEach(func => {
                    let res = func(data);
                    if (res) {
                        nodes.push(res);
                    }
                });
                let node = util.getTopNode(nodes);
                node && node.fireEvent('mousedown');
                return;
            }

            funcs.forEach(func => {
                func(data);
            });
        }
    },

    on (name = '', func = function () {}) {
        if (events[name]) {
            events[name].push(func);
        } else {
            events[name] = [func];
        }
        return this;
    }
};
