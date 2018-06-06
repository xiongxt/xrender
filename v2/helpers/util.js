export default {
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
    }

    // toArra
};
