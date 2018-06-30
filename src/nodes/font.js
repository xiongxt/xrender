import Node from '../Node';
export default class Font extends Node {
    _renderSelf(context) {
        if (!context) {
            context = this.context;
        }
        if (!this.font) {
            this.font = {
                textWidthConfig: {}
            };
        }
        context.beginPath();

        this._autoSplitText();
        this.font.splitedText.forEach((str, index) => {
            context.font = `normal 
                ${this.style['font-size'] * this.canvasScale}px
                ${this.style['font-family']}`;
            context.fillStyle = this.style.color;
            context.textBaseline = 'hanging';
            context.textAlign = this.style['text-align'];
            context.fillText(
                str,
                this.style.start.x * this.canvasScale,
                this.style.start.y * this.canvasScale +
                this.style['font-size'] * this.canvasScale * index +
                this.style['row-spacing'] * this.canvasScale * index
            );
        });
        context.closePath();
    }

    _getTextWidthConfig(context) {
        if (!context) {
            context = this.context;
        }

        let font = `normal ${this.style['font-size'] * this.canvasScale}px ${
            this.style['font-family']
        }`;
        if (!this.font.textWidthConfig[font]) {
            context.font = font;
            let str =
                ' abcdefghijklmnopqretuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~!@#$%^&*()_+`-=,./;[]<>?:{}|\\\'"，。/？；‘“：【】「」|、！）（';
            let res = {};
            str.split('').forEach(char => {
                res[char] = context.measureText(char).width / this.canvasScale;
            });
            res.hans = context.measureText('我').width / this.canvasScale;
            this.font.textWidthConfig[this.style['font-family']] = res;
        }
        return this.font.textWidthConfig[this.style['font-family']];
    }

    _measureTextWidth(context) {
        if (!context) {
            context = this.context;
        }

        let font = `normal ${this.style['font-size'] * this.canvasScale}px ${
            this.style['font-family']
        }`;
        context.font = font;
        let maxLen = 0;
        this.font.splitedText.forEach(str => {
            maxLen = Math.max(context.measureText(str).width / 2, maxLen);
        });
        this.style.width = maxLen;
    }

    _measureTextHeight() {
        let size = this.font.splitedText.length;
        this.style.height =
            this.style['font-size'] * size +
            this.style['row-spacing'] * (size - 1);
    }

    _autoSplitText() {
        let res = [];
        let str = this.style['font-text'];
        if (this.style['max-width'] === 'auto') {
            res = str.split('\n');
        } else {
            let maxWidth = this.style['max-width'];
            let config = this._getTextWidthConfig();
            let _str = '';
            let _strLen = 0;
            str.split('').forEach(char => {
                let charLen = config[char];
                if (!charLen) {
                    charLen = config.hans;
                }
                if (char === '\n') {
                    res.push(_str);
                    _strLen = 0;
                    _str = '';
                } else {
                    if (_strLen + charLen <= maxWidth) {
                        _strLen += charLen;
                        _str += char;
                    } else {
                        res.push(_str);
                        _strLen = charLen;
                        _str = char;
                    }
                }
            });
            if (_str !== '') {
                res.push(_str);
            }
        }
        this.font.splitedText = res;
        this._measureTextWidth();
        this._measureTextHeight();
        return res;
    }

    _checkPointInPath() {
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