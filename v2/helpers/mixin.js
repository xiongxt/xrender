export default function mixin (source = {}, target = {}) {
    Object.keys(target).forEach(key => {
        source[key] = target[key];
    });
}
