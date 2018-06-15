import color from './color';
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

    getObjectKeys (obj, startStr = '', keyUrls = {}) {
        Object.keys(obj).forEach(key => {
            if (typeof obj[key] === 'object') {
                this.getObjectKeys(obj[key], key, keyUrls);
            } else if (typeof obj[key] === 'number') {
                if (startStr) {
                    keyUrls[`${startStr}.${key}`] = obj[key];
                } else {
                    keyUrls[key] = obj[key];
                }
            } else if (
                typeof obj[key] === 'string' &&
                color.checkColor(obj[key]).isColor
            ) {
                keyUrls[key] = obj[key];
            }
        });
        return keyUrls;
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
    },

    isHans (str) {
        return /^[\u3220-\uFA29]+$/.test(str);
    },

    clone (obj) {
        if (typeof obj !== 'object') {
            return obj;
        }
        var newobj = {};
        for (var attr in obj) {
            newobj[attr] = this.clone(obj[attr]);
        }
        return newobj;
    }
};
