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
                dest: destValue
            };
        }
    });
    return animateOptions;
}

let easying = {
    linear (rate) {
        return rate;
    },
    swing (rate) {
        return -Math.cos(rate * Math.PI) / 2 + 0.5;
    }
};

export default {
    animate (dest, time = 1000) {
        let keyUrls = {};
        // 扁平化数据
        getObjectKeys(dest, keyUrls);
        this.animateOptions = getAnimateOptions(this, keyUrls, time);
        this.animateOptions.dest = dest;
        this._startAnimate();
    },
    _checkAllDone () {},
    _startAnimate () {
        requestAnimationFrame(() => {
            let curTime = new Date().getTime();
            let animateOptions = this.animateOptions;
            if (curTime - animateOptions.start >= animateOptions.allTime) {
                this.setStype(animateOptions.dest);
            } else {
                let rate =
                    (curTime - animateOptions.start) / animateOptions.allTime;
                rate = easying.swing(rate);
                console.log(rate);
                if (rate !== 0) {
                    let dest = {};
                    let changlist = animateOptions.changlist;
                    Object.keys(changlist).forEach(keyUrl => {
                        let data = changlist[keyUrl];
                        let val = (data.dest - data.old) * rate + data.old;
                        util.setValueByAttr(dest, keyUrl, val);
                        changlist[keyUrl].cur = val;
                    });
                    console.log(dest);
                    this.setStype(dest);
                }
                this._startAnimate();
            }
        });
    }
};
