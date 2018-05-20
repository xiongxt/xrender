import Circle from './circle';
import Font from './font';
import Line from './line';
import Rect from './rect';
import Sector from './sector';

let relation = {
    'circle': Circle,
    'font': Font,
    'line': Line,
    'rect': Rect,
    'sector': Sector
};

export default class adapter {
    static compile (list) {
        let res = [];
        list.forEach(item => {
            if (item.type === 'array') {
                res.push(adapter.compile(item.list));
            } else {
                res.push(new relation[item.type](item.props));
            }
        });
    }
}
