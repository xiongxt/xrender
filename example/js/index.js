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
let dragging = false;
circle.on('mousedown', () => {
    console.log('mousedown');
    console.log(circle.offsetX);
    dragging = true;
    circle.lockOffset();
    circle.setStype({
        'z-index': 6,
        'background-color': 'black'
    });
});

render.onMouseMove(() => {
    if (dragging) {
        console.log(
            `
            center:x:${circle.style.center.x},${circle.style.center.y}
            mouse:x:${circle.mouseX},${circle.mouseY}
            offset:x:${circle.offsetX},${circle.offsetY}
            `
        );
        circle.setStype({
            'z-index': 6,
            center: {
                x:
                    circle.style.center.x +
                    (circle.mouseX -
                        circle.offsetX -
                        (circle.style.center.x - circle.style.radius)),
                y:
                    circle.style.center.y +
                    (circle.mouseY -
                        circle.offsetY -
                        (circle.style.center.y - circle.style.radius))
            }
        });
    }
});

render.onMouseLeave(() => {
    dragging = false;
    circle.unlockOffset();
});

render.addElement(circle);
render.addElement(circle2);
render.render();
console.log(render);
window.render = render;
window.circle = circle;
