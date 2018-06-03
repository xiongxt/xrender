import Render from './Render';
// import bus from './bus';

export default {
    init (selector, scale = 1) {
        this.el = document.querySelector(selector);
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        const envoParams = {
            ctx: this.context,
            width: this.el.clientWidth * scale,
            height: this.el.clientHeight * scale,
            scale: scale,
            originWidth: this.el.clientWidth,
            originHeight: this.el.clientHeight
        };

        this.canvas.style.width = `${envoParams.originWidth}px`;
        this.canvas.style.height = `${envoParams.originHeight}px`;
        this.canvas.width = envoParams.originWidth * scale;
        this.canvas.height = envoParams.originHeight * scale;

        this.el.appendChild(this.canvas);

        this.render = new Render(envoParams);

        this.el.addEventListener('click', (event) => {
            console.log(event);
        });
        this.el.addEventListener('mousemove', (event) => {
            console.log(`${event.offsetX},${event.offsetY}`);
        });
    }
};
