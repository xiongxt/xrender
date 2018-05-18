export default class VNode {
    constructor (config = {}) {
        Object.assign(this, this.defaultConfig(), config);
        console.log(this);
    }
    defaultConfig () {
        return {};
    }
}
