import Context from './core/context';
import Rect from './vnodes/rect';
import Line from './vnodes/line';
import Font from './vnodes/font';
import Circle from './vnodes/circle';
export default {
    init (config = {
        type: 'bar',
        data: [

        ]
    }) {
        let ctx = new Context();
        ctx.render(config.el, [
            new Rect({
                start: { x: 10.5, y: 10.5 },
                width: 150,
                height: 200,
                strokeStyle: 'red'
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
            }),
            new Circle({
                center: { x: 200, y: 200 },
                radius: 100,
                lineWidth: 10,
                strokeStyle: 'green',
                fill: false
            })
        ]);
    }
};
