import 'babel-polyfill';
import xrender from '../../src/xrender';
let render = xrender.init(document.querySelector('#chart1'), window.devicePixelRatio * 2);

// let circle = new xrender.Circle({
//     center: {
//         x: 100,
//         y: 100
//     },
//     radius: 50,
//     fill: true,
//     stroke: false,
//     'background-color': 'red'
// }, {
//     draggable: true
// });
// let rect = new xrender.Rect({
//     start: {
//         x: 200,
//         y: 50
//     },
//     width: 100,
//     height: 100,
//     fill: true,
//     stroke: false,
//     'background-color': 'red'
// }, {
//     draggable: true
// });
// let font = new xrender.Font({
//     start: {
//         x: 350,
//         y: 50
//     },
//     'font-size': 16,
//     'font-text': '你好，\n世界。\n这是xrender的文字图形',
//     color: 'blue',
//     'max-width': '100'
// }, {
//     draggable: true
// });
let line = new xrender.Line({
    start: {
        x: 500,
        y: 50
    },
    end: {
        x: 600,
        y: 150
    },
    'border-color': 'blue'
}, {
    draggable: true
});
// let sector = new xrender.Sector({
//     center: {
//         x: 50,
//         y: 200
//     },
//     radius: 100,
//     sdeg: -10,
//     edeg: 60,
//     fill: true,
//     'background-color': 'yellow'
// }, {
//     draggable: true
// });
// let img = new xrender.Image({
//     start: {
//         x: 200,
//         y: 200
//     },
//     width: 100,
//     height: 100,
//     'image-src': 'http://www.w3school.com.cn/i/eg_tulip.jpg'
// }, {
//     draggable: true
// });
// render.addChild(circle);
// render.addChild(rect);
// render.addChild(font);
render.addChild(line);
// render.addChild(sector);
// render.addChild(img);
render.render();