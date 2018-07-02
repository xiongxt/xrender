import xrender from '../../../src/xrender';
let width = document.documentElement.clientWidth;
let height = document.documentElement.clientHeight;
let dom = document.querySelector('#chart1');
dom.style.width = width + 'px';
dom.style.height = height + 'px';
let render = xrender.init(dom, window.devicePixelRatio * 2, '#000');

let radius = 6;
let cellWidth = 10;
let widthCount = Math.floor(width / cellWidth / 2);
let heightCount = Math.floor(height / cellWidth / 2);
let circles = [];
for (let i = 0; i <= widthCount; i++) {
    circles[i] = [];
    for (let j = 0; j <= heightCount; j++) {
        let center = {
            x: i * cellWidth * 2 + cellWidth,
            y: j * cellWidth * 2 + cellWidth + 100
        };
        circles[i][j] = new xrender.Circle({
            center,
            radius: radius,
            fill: true,
            stroke: false,
            'background-color': '#ccc',
            cursor: 'pointer'
        });
        circles[i][j].setCache('center', center);
        render.addChild(circles[i][j]);
    }
}

let timer = 0;

function paint() {
    for (let i = 0; i <= widthCount; i++) {
        let dis = Math.sin(i / Math.PI + Math.PI / 80 * timer) * 40;
        for (let j = 0; j <= heightCount; j++) {
            let circle = circles[i][j];
            let center = circle.getCache('center');
            circle.setStyle({
                center: {
                    x: center.x,
                    y: center.y + dis
                }
            }, false);
        }
    }
    render.render();
    timer++;
    requestAnimationFrame(paint);
}

requestAnimationFrame(paint)
render.render();