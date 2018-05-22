import Module from '../../core/module';
import Font from '../../vnodes/font';
import Adapter from '../../core/adapter';
const config = {
    right: 10,
    top: 10,
    colorImgWidth: 24,
    colorImgHeight: 16,
    colorImgBottom: 8,
    colorImgRight: 10
};

export default class Legend extends Module {
    constructor (data, chart) {
        super();
        this.chart = chart;
        this.fontUtil = new Font({ fontSize: '12px' });
        this.data = data;
        this.width = 0;
        this.height = 0;
        this.toGraphical();
    }

    toGraphical () {
        let maxTextWidth = this._getMaxFontWidth();
        let collection = {
            type: 'collection',
            props: {
                start: {
                    x: this.chart.width - config.right - maxTextWidth - config.colorImgRight - config.colorImgWidth,
                    y: config.top
                },
                children: []
            }
        };
        this.data.forEach((item, index) => {
            collection.props.children.push({
                type: 'collection',
                props: {
                    start: {
                        x: 0,
                        y: (config.colorImgHeight + config.colorImgBottom) * index
                    },
                    children: [
                        {
                            type: 'rect',
                            props: {
                                start: {
                                    x: 0,
                                    y: 0
                                },
                                width: config.colorImgWidth,
                                height: config.colorImgHeight,
                                stroke: false,
                                fill: true,
                                fillStyle: item.color
                            }
                        },
                        {
                            type: 'font',
                            props: {
                                start: {
                                    x: config.colorImgWidth + config.colorImgRight,
                                    y: 1
                                },
                                text: item.label,
                                fontSize: '12px',
                                color: item.color
                            }
                        }
                    ]
                }
            });
        });
        this.collectionData = collection;
        this.collection = Adapter.compile(collection);
    }

    render () {
        this.collection.render(this.chart.ctx);
    }

    _getMaxFontWidth () {
        let maxWidth = 0;
        this.data.forEach(item => {
            maxWidth = Math.max(this.fontUtil.measureText(item.label, this.chart.ctx).width, maxWidth);
        });
        return maxWidth;
    }
}
