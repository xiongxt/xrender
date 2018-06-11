import xrender from '../../v2/xrender';

let render = xrender.init('#chart1', window.devicePixelRatio * 2);

let circle = new xrender.Circle({
    center: {
        x: 50,
        y: 50
    },
    radius: 50,
    fill: true,
    stroke: false,
    'z-index': 3,
    cursor: 'pointer',
    'background-color': 'blue'
});

let circle2 = new xrender.Circle({
    center: {
        x: 25,
        y: 25
    },
    radius: 25,
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
    console.log('circle1 click');
});
circle2.on('click', () => {
    console.log('circle2 click');
    circle2.animate(
        {
            radius: 50,
            center: {
                x: 200,
                y: 200
            }
        },
        200
    );
    circle2.animate(
        {
            radius: 50,
            center: {
                x: 350,
                y: 250
            }
        },
        800
    );
});

render.addElement(circle);
render.addElement(circle2);
render.render();
console.log(render);
window.render = render;
window.circle = circle;
