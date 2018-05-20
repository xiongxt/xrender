import lightChart from '../../src';

lightChart.init({
    el: document.getElementById('chart1'),
    type: 'pie',
    data: [{
        name: '中国',
        value: 50
    },
    {
        name: '美国',
        value: 80
    },
    {
        name: '日本',
        value: 40
    }
    ]
});
