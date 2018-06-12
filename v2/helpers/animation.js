import util from './util';
import easying from './easying';
import color from './color';
/**
 * 过滤掉没有改变的属性
 */
function getAnimateOptions (node, keyUrls, time) {
    let curTime = new Date().getTime();
    let animateOptions = {
        start: curTime,
        changlist: {},
        allTime: time
    };
    Object.keys(keyUrls).forEach(keyUrl => {
        let oldValue = util.getValueByAttr(node.style, keyUrl);
        let destValue = keyUrls[keyUrl];
        if (oldValue !== destValue) {
            let type = 'number';
            if (
                typeof destValue === 'string' &&
                color.checkColor(destValue).isColor
            ) {
                type = 'color';
            }
            animateOptions.changlist[keyUrl] = {
                old: oldValue,
                dest: destValue,
                type
            };
        }
    });
    return animateOptions;
}

export default {
    animate (dest, time = 1000, easying = 'linear') {
        let keyUrls = util.getObjectKeys(dest);
        this.animateOptions = getAnimateOptions(this, keyUrls, time);
        this.animateOptions.dest = dest;
        this.animateOptions.easying = easying;
        console.log(this.animateOptions);
        this.fireEvent('beforeAnimate');
        this._startAnimate();
    },
    _startAnimate () {
        requestAnimationFrame(() => {
            let curTime = new Date().getTime();
            let animateOptions = this.animateOptions;
            if (animateOptions) {
                let rate =
                    (curTime - animateOptions.start) / animateOptions.allTime;
                if (rate >= 1) {
                    this.setStype(animateOptions.dest);
                    this.fireEvent('afterAnimate');
                    delete this.animateOptions;
                } else {
                    rate = easying[animateOptions.easying](rate);
                    if (rate !== 0) {
                        this.fireEvent('duringAnimate', { rate });
                        let dest = {};
                        let changlist = animateOptions.changlist;
                        Object.keys(changlist).forEach(keyUrl => {
                            let data = changlist[keyUrl];
                            let val;
                            if (data.type === 'color') {
                                val = color.getComputedColor(
                                    data.dest,
                                    data.old,
                                    rate
                                );
                            } else {
                                val = (data.dest - data.old) * rate + data.old;
                            }

                            util.setValueByAttr(dest, keyUrl, val);
                        });
                        this.setStype(dest);
                    }
                    this._startAnimate();
                }
            }
        });
    }
};
