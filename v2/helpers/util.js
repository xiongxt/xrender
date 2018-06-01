
export default {

    arrayGroupByAttr (array = [], attr = '') {
        let res = {};
        array.forEach((item) => {
            if (res[item[attr]]) {
                res[item[attr]].push(item);
            } else {
                res[item[attr]] = [item];
            }
        });
        return res;
    }

    // toArra

};
