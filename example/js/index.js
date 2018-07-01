import 'babel-polyfill';
import xrender from '../../src/xrender';
let width = document.documentElement.clientWidth;
let height = document.documentElement.clientHeight;
let dom = document.querySelector('#chart1');
dom.style.width = width + 'px';
dom.style.height = height + 'px';
let render = xrender.init(dom, window.devicePixelRatio * 2, '#000');


function random(num) {
    return Math.floor(Math.random() * (num + 1));
}

for (let i = 0; i < 300; i++) {
    let radius = random(10);

    let circle = new xrender.Circle({
        center: {
            x: random(width),
            y: random(height)
        },
        radius: radius,
        fill: true,
        stroke: false,
        'background-color': '#ccc',
        cursor: 'pointer'
    }, {
        draggable: true
    });
    circle.attr.radius = radius;
    circle.on('mouseenter', () => {
        circle.animate({
            'background-color': '#fff',
            radius: circle.attr.radius * 2
        }, 200)
    })
    circle.on('mouseleave', () => {
        circle.animate({
            'background-color': '#ccc',
            radius: circle.attr.radius
        }, 200)
    })
    render.addChild(circle);
}
render.render();