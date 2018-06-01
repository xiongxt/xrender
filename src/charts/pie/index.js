import Chart from '../../core/chart';
import Colors from '../../core/colors';
import Legend from '../../modules/legend';
import Adapter from '../../core/adapter';
export default class Pie extends Chart {
    constructor (data, Context) {
        super(data);
        this.ctx = Context.context;
        this.width = Context.canvas.width;
        this.height = Context.canvas.height;
        this.legend = null;
        this.toGraphical();
    }

    render () { }

    toGraphical () {
        let legendData = [];
        this.data.forEach((item, index) => {
            legendData.push({
                color: Colors.getColor(index),
                label: item.name
            });
        });
        this.legend = new Legend(legendData, this);
        this.legend.render();
        this.circleCenter = {
            x: (this.width - 70) / 2,
            y: this.height / 2
        };
        this.radius = Math.min((this.width - 70), this.height) / 2 * 0.8;
        this.sectors = [];
        let eDeg = 0;
        let count = 0;
        this.data.forEach((item) => {
            count += item.value;
        });
        this.data.forEach((item, index) => {
            let sDeg = eDeg;
            eDeg = item.value / count * 360 + sDeg;
            this.sectors.push({
                type: 'collection',
                props: {
                    start: {
                        x: 0,
                        y: 0
                    },
                    children: [{
                        type: 'sector',
                        props: {
                            center: this.circleCenter,
                            radius: this.radius,
                            stroke: false,
                            fill: true,
                            fillStyle: Colors.getColor(index),
                            sDeg: sDeg,
                            eDeg: eDeg
                        }
                    }]
                }
            });
        });
        this.sectors = Adapter.compile(this.sectors);
        console.log(this.sectors);
        this.sectors.forEach(item => {
            item.render(this.ctx);
        });
    }
}
