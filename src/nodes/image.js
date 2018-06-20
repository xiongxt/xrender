import Node from '../Node';
export default class Image extends Node {
    _renderSelf (context) {
        if (!context) {
            context = this.context;
        }
        if (this.img) {
            context.drawImage(
                this.img,
                this.style.start.x * this.canvasScale,
                this.style.start.y * this.canvasScale,
                this.style.width * this.canvasScale,
                this.style.height * this.canvasScale
            );
        } else {
            var img = document.createElement('img');
            img.src = this.style['image-src'];
            img.style.display = 'none';
            img.onload = () => {
                this.img = img;
                if (this.style.width === 0 || this.style.width === 'auto') {
                    this.style.width = img.width;
                }
                if (this.style.height === 0 || this.style.height === 'auto') {
                    this.style.height = img.height;
                }
                context.drawImage(
                    this.img,
                    this.style.start.x * this.canvasScale,
                    this.style.start.y * this.canvasScale,
                    this.style.width * this.canvasScale,
                    this.style.height * this.canvasScale
                );
            };
            document.body.appendChild(img);
        }
    }

    _checkPointInPath () {
        let xSpace = this.mouseX - this.style.start.x;
        let ySpace = this.mouseY - this.style.start.y;
        return (
            xSpace >= 0 &&
            xSpace <= this.style.width &&
            ySpace >= 0 &&
            ySpace < this.style.height
        );
    }
}
