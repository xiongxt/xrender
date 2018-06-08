export default class Event {
    constructor () {
        this.events = {
            click: [],
            mouseenter: [],
            mouseleave: [],
            mousedown: [],
            mouseup: [],
            mousemove: []
        };
    }

    on (name = '', callback = () => {}) {
        if (this.events[name]) {
            this.events[name].push(callback);
        } else {
            this.events[name] = [callback];
        }
    }

    off (name = '', callback) {
        if (callback) {
            let index = this.events[name].indexOf(callback);
            if (index !== -1) {
                this.events[name] = this.events[name].splice(index, 1);
            }
        } else {
            this.events[name] = [];
        }
    }

    getEventCallbacks (name) {
        if (this.events[name]) {
            return this.events[name];
        } else {
            return [];
        }
    }

    fireEvent (name, data = {}) {
        if (this.getEventCallbacks(name).length) {
            this.events[name].forEach(func => {
                func(this, data);
            });
        }
    }

    fireMouseMoveEvents () {
        this.recoredMouseStatus(true);
        let length = this.mouseStatus.length;
        let lastStatus = this.mouseStatus[length - 1];
        let lastStatus2 = this.mouseStatus[length - 2];
        if (lastStatus === true && lastStatus2 === false) {
            this.fireEvent('mouseenter');
        }
        this.fireEvent('mousemove');
    }

    fireMouseLeaveEvents () {
        let length = this.mouseStatus.length;
        let lastStatus = this.mouseStatus[length - 1];
        let lastStatus2 = this.mouseStatus[length - 2];

        if (lastStatus === false && lastStatus2 === true) {
            this.fireEvent('mouseleave');
        }
    }

    recoredMouseStatus (status = false) {
        this.mouseStatus.push(status);
        this.mouseStatus = this.mouseStatus.slice(-2);
    }

    fireClickEvents () {
        this.fireEvent('click');
    }

    fireMoveNotInPath () {
        this.recoredMouseStatus(false);
        this.fireMouseLeaveEvents();
    }
}
