import Context from './core/context';

export default {
    init (config = {
        type: 'bar',
        data: []
    }) {
        // let canvas = document.createElement('canvas');
        // canvas.width = 200;
        // canvas.height = 200;
        // canvas.style.border = '1px solid #ccc';

        // document.body.appendChild(canvas);

        // let context = canvas.getContext('2d');
        // context.fillStyle = '#ff0000';
        // context.fillRect(0, 0, 150, 75);
        let ctx = new Context();
        ctx.render();
    }
};
