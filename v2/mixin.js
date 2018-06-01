export default function mixin (source, target) {
    target.forEach(key => {
        source[key] = target[key];
    });
}
