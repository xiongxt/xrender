import Context from './core/context';
import Pie from './charts/pie';
export default {
    init (config = {
        type: 'bar',
        data: []
    }) {
        let ctx = new Context();
        ctx.render(config.el);
        switch (config.type) {
        case 'pie':
            ctx.setChart(new Pie(config.data, ctx));
            break;
        }
    }
};
