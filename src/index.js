import Context from './core/context';
import Rect from './vnodes/rect';
import Line from './vnodes/line';
import Font from './vnodes/font';
export default {
    init (config = {
        type: 'bar',
        data: [

        ]
    }) {
        let ctx = new Context();
        ctx.render(config.el, [
            new Rect({
                start: { x: 0, y: 0 },
                width: 150,
                height: 200,
                backgroundColor: '#ff6600'
            }),
            new Line({
                start: { x: 0, y: 400 },
                end: { x: 200, y: 200 }
            }),
            new Font({
                start: { x: 200, y: 0 },
                text: 'hello world 中文测试',
                fontSize: '16px',
                lineWidth: 10,
                color: '#cccccc'
            })
        ]);
    }
};
