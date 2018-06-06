import xrender from '../../v2/xrender';

let render = xrender.init('#chart1');

let circle = new xrender.Circle({
    center: {
        x: 100,
        y: 100
    },
    radius: 100,
    fill: true,
    stroke: false,
    'z-index': 1,
    'background-color': 'red'
});

let circle2 = new xrender.Circle({
    center: {
        x: 150,
        y: 150
    },
    radius: 100,
    fill: true,
    stroke: false,
    'z-index': 2,
    'background-color': 'yellow'
});

circle.on('mouseenter', () => {
    circle.setStype({
        'background-color': 'green'
    });
});
circle.on('mouseleave', () => {
    circle.setStype({
        'background-color': 'blue'
    });
});

render.addElement(circle);
render.addElement(circle2);
render.render();
