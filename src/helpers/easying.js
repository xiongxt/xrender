export default {
    linear (x) {
        return x;
    },
    swing (x) {
        return -Math.cos(x * Math.PI) / 2 + 0.5;
    }
};
