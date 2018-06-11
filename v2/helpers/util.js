let timer = new Date().getTime();

export default {
    mixin (source = {}, target = {}) {
        Object.keys(target).forEach(key => {
            source[key] = target[key];
        });
    },

    guid () {
        return timer++;
    },

    getArrayGroupByAttr (array = [], attr = '') {
        let res = {};
        array.forEach(item => {
            let val = this.getValueByAttr(item, attr);
            if (res[val]) {
                res[val].push(item);
            } else {
                res[val] = [item];
            }
        });
        return res;
    },

    getValueByAttr (obj, attr) {
        let array = attr.split('.');
        array.forEach(key => {
            obj = obj[key];
        });
        return obj;
    },

    setValueByAttr (obj, attr, val) {
        let array = attr.split('.');
        if (array.length === 1) {
            obj[attr] = val;
        } else {
            let last = array.splice(-1)[0];
            let _obj = obj;
            array.forEach(key => {
                if (!obj[key]) {
                    obj[key] = {};
                }
                _obj = obj[key];
            });
            _obj[last] = val;
        }
    },

    getTopNode (nodes) {
        let max = 0;
        let finalNode = null;
        nodes.forEach(node => {
            if (node.renderIndex > max) {
                finalNode = node;
                max = node.renderIndex;
            }
        });
        return finalNode;
    }
};
