const events = {};

export default {

    trigger (name = '', data = {}) {
        if (events[name]) {
            events[name].forEach(func => {
                func(data);
            });
        }
    },

    on (name = '', func = function () {}) {
        if (events[name]) {
            events[name].push(func);
        } else {
            events[name] = [func];
        }
    }
};
