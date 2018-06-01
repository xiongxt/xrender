import Render from './Render';
// import bus from './bus';

export default {
    init (selector) {
        this.dom = null;
        this.convas = null;
        this.width = null;
        this.height = null;

        this.render = new Render();

        this.dom.addEventListener('click', () => { });
        this.dom.addEventListener('mousemove', () => { });
    }
};
