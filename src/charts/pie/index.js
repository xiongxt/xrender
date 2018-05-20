import Chart from '../../core/chart';
import Colors from '../../core/colors';
import Legend from '../../modules/legend';
export default class Pie extends Chart {
    constructor (data, context) {
        super(data);
        this.context = context;
        this.toGraphical();
    }

    toGraphical () {
        console.log(this.data);
        let legendData = [];
        this.data.forEach((item, index) => {
            // legendData.push({
            //     color: color
            // });
        });
    }
}
