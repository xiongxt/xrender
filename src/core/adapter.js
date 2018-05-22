import Circle from '../vnodes/circle';
import Font from '../vnodes/font';
import Line from '../vnodes/line';
import Rect from '../vnodes/rect';
import Sector from '../vnodes/sector';
import Collection from '../vnodes/collection';
let relation = {
    'circle': Circle,
    'font': Font,
    'line': Line,
    'rect': Rect,
    'sector': Sector,
    'collection': Collection
};

export default class adapter {
    static compile (data) {
        if (Object.prototype.toString.call(data) === '[object Array]') {
            let res = [];
            data.forEach(item => {
                res.push(new relation[item.type](item.props));
            });
            return res;
        } else {
            return new Collection(data.props);
        }
    }
}
