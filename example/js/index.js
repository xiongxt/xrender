import xrender from '../../v2/xrender';

let render = xrender.init('#chart1', window.devicePixelRatio * 2);

let circle = new xrender.Circle(
    {
        center: {
            x: 50,
            y: 50
        },
        radius: 50,
        fill: true,
        stroke: false,
        'z-index': 5,
        cursor: 'pointer',
        'background-color': 'rgba(255,0,0,1)'
    },
    {}
);

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

circle2.on('click', () => {
    circle2.animate(
        {
            radius: 50,
            center: {
                x: 350,
                y: 250
            },
            'background-color': 'INDIGO'
        },
        800,
        'swing'
    );
});

let rect = new xrender.Rect({
    start: {
        x: 100,
        y: 25
    },
    width: 100,
    height: 50,
    fill: true,
    'background-color': 'blue'
});

rect.on('click', () => {
    console.log(rect);
    rect.setStype({
        'background-color': 'gray'
    });
});

let sector = new xrender.Sector({
    center: {
        x: 100,
        y: 125
    },
    radius: 100,
    sdeg: -10,
    edeg: 60,
    fill: true,
    'background-color': 'yellow'
});

let line = new xrender.Line({
    start: {
        x: 232,
        y: 20
    },
    end: {
        x: 232,
        y: 200
    },
    'border-color': 'blue'
});

let font = new xrender.Font({
    start: {
        x: 0,
        y: 0
    },
    'font-size': 20,
    'font-text': 'abci我g打\n你一次可以放弃',
    'max-width': 'auto',
    color: 'pink'
});
font.on('mouseenter', () => {
    font.setStype({
        color: 'blue'
    });
});
font.on('mouseleave', () => {
    font.setStype({
        color: 'yellow'
    });
});

let img = new xrender.Image({
    start: {
        x: 0,
        y: 300
    }
});

let collection = new xrender.Collection({
    start: {
        x: 200,
        y: 200
    },
    width: 400,
    height: 400
});

//
render.addElement(circle2);
// render.addElement(circle);
// render.addElement(rect);
render.addElement(collection);
collection.addChild(circle);
collection.addChild(sector);
collection.addChild(line);
collection.addChild(font);
collection.addChild(rect);
render.addElement(img);
render.render();
console.log(render);
window.render = render;
window.circle = circle;
