import xrender from '../../v2/xrender';

let render = xrender.init('#chart1', window.devicePixelRatio * 2);

let circle = new xrender.Circle({
    center: {
        x: 100,
        y: 100
    },
    radius: 100,
    fill: true,
    stroke: false,
    'z-index': 3,
    cursor: 'move',
    'background-color': 'blue'
});

let circle2 = new xrender.Circle({
    center: {
        x: 150,
        y: 150
    },
    radius: 100,
    fill: true,
    stroke: false,
    'z-index': 4,
    'background-color': 'yellow'
});

circle.on('mouseenter', () => {
    circle.setStype({
        'background-color': '#ccc'
    });
});
circle.on('mouseleave', () => {
    circle.setStype({
        'background-color': 'blue'
    });
});
circle.on('click', () => {
    circle.setStype({
        'background-color': 'black'
    });
});
circle.on('mousedown', () => {
    console.log('mousedown');
    console.log(circle.mouseX);
    circle.setStype({
        'background-color': 'black'
    });
});
circle.on('mousemove', () => {
    console.log('mousemove');
});

render.addElement(circle);
render.addElement(circle2);
render.render();
console.log(render);
window.render = render;
window.circle = circle;
