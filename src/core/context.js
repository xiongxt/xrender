export default class Context {
    constructor () {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
    }
    render (el, children = []) {
        this.canvas.width = el.clientWidth;
        this.canvas.height = el.clientHeight;
        el.appendChild(this.canvas);
        this.context.fillStyle = '#ff0000';
        this.context.fillRect(0, 0, 150, 75);
        children.forEach(item => {
            item.render(this.context);
        });
    }
}
