import util from './util';

function getObjectKeys (obj, keyUrls = {}, startStr = '') {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object') {
            getObjectKeys(obj[key], keyUrls, key);
        } else if (typeof obj[key] === 'number') {
            if (startStr) {
                keyUrls[startStr + '.' + key] = obj[key];
            } else {
                keyUrls[key] = obj[key];
            }
        }
    });
}

/**
 * 过滤掉没有改变的属性
 */
function getAnimateOptions (node, keyUrls, time) {
    let curTime = new Date().getTime();
    let animateOptions = {
        start: curTime,
        now: curTime,
        changlist: {},
        allTime: time
    };
    Object.keys(keyUrls).forEach(keyUrl => {
        let oldValue = util.getValueByAttr(node.style, keyUrl);
        let destValue = keyUrls[keyUrl];
        if (oldValue !== destValue) {
            animateOptions.changlist[keyUrl] = {
                old: oldValue,
                cur: oldValue,
                dest: destValue,
                status: 'doing'
            };
        }
    });
    return animateOptions;
}

export default {
    animate (dest, time = 1000) {
        let keyUrls = {};
        getObjectKeys(dest, keyUrls);
        this.animateOptions = getAnimateOptions(this, keyUrls, time);
        this._startAnimate();
    },
    _checkAllDone () {},
    _startAnimate () {
        requestAnimationFrame(() => {
            let curTime = new Date().getTime();
            let animateOptions = this.animateOptions;
            let rate = (curTime - animateOptions.now) / animateOptions.allTime;
            // animateOptions.changlist.forEach(key)
        });
    }
};
