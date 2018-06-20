/* eslint-disable no-useless-escape */
let hReg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
let rgbaReg = /^[rR][gG][Bb][Aa]?[\(]([\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?[\s]*(0\.\d{1,2}|1|0)?[\)]{1}$/;

let colors = {
    ALICEBLUE: '#F0F8FF',
    ANTIQUEWHITE: '#FAEBD7',
    AQUA: '#00FFFF',
    AQUAMARINE: '#7FFFD4',
    AZURE: '#F0FFFF',
    BEIGE: '#F5F5DC',
    BISQUE: '#FFE4C4',
    BLACK: '#000000',
    BLANCHEDALMOND: '#FFEBCD',
    BLUE: '#0000FF',
    BLUEVIOLET: '#8A2BE2',
    BROWN: '#A52A2A',
    BURLYWOOD: '#DEB887',
    CADETBLUE: '#5F9EA0',
    CHARTREUSE: '#7FFF00',
    CHOCOLATE: '#D2691E',
    CORAL: '#FF7F50',
    CORNFLOWERBLUE: '#6495ED',
    CORNSILK: '#FFF8DC',
    CRIMSON: '#DC143C',
    CYAN: '#00FFFF',
    DARKBLUE: '#00008B',
    DARKCYAN: '#008B8B',
    DARKGOLDENROD: '#B8860B',
    DARKGRAY: '#A9A9A9',
    DARKGREEN: '#006400',
    DARKKHAKI: '#BDB76B',
    DARKMAGENTA: '#8B008B',
    DARKOLIVEGREEN: '#556B2F',
    DARKORANGE: '#FF8C00',
    DARKORCHID: '#9932CC',
    DARKRED: '#8B0000',
    DARKSALMON: '#E9967A',
    DARKSEAGREEN: '#8FBC8F',
    DARKSLATEBLUE: '#483D8B',
    DARKSLATEGRAY: '#2F4F4F',
    DARKTURQUOISE: '#00CED1',
    DARKVIOLET: '#9400D3',
    DEEPPINK: '#FF1493',
    DEEPSKYBLUE: '#00BFFF',
    DIMGRAY: '#696969',
    DODGERBLUE: '#1E90FF',
    FELDSPAR: '#D19275',
    FIREBRICK: '#B22222',
    FLORALWHITE: '#FFFAF0',
    FORESTGREEN: '#228B22',
    FUCHSIA: '#FF00FF',
    GAINSBORO: '#DCDCDC',
    GHOSTWHITE: '#F8F8FF',
    GOLD: '#FFD700',
    GOLDENROD: '#DAA520',
    GRAY: '#808080',
    GREEN: '#008000',
    GREENYELLOW: '#ADFF2F',
    HONEYDEW: '#F0FFF0',
    HOTPINK: '#FF69B4',
    INDIANRED: '#CD5C5C',
    INDIGO: '#4B0082',
    IVORY: '#FFFFF0',
    KHAKI: '#F0E68C',
    LAVENDER: '#E6E6FA',
    LAVENDERBLUSH: '#FFF0F5',
    LAWNGREEN: '#7CFC00',
    LEMONCHIFFON: '#FFFACD',
    LIGHTBLUE: '#ADD8E6',
    LIGHTCORAL: '#F08080',
    LIGHTCYAN: '#E0FFFF',
    LIGHTGOLDENRODYELLOW: '#FAFAD2',
    LIGHTGREY: '#D3D3D3',
    LIGHTGREEN: '#90EE90',
    LIGHTPINK: '#FFB6C1',
    LIGHTSALMON: '#FFA07A',
    LIGHTSEAGREEN: '#20B2AA',
    LIGHTSKYBLUE: '#87CEFA',
    LIGHTSLATEBLUE: '#8470FF',
    LIGHTSLATEGRAY: '#778899',
    LIGHTSTEELBLUE: '#B0C4DE',
    LIGHTYELLOW: '#FFFFE0',
    LIME: '#00FF00',
    LIMEGREEN: '#32CD32',
    LINEN: '#FAF0E6',
    MAGENTA: '#FF00FF',
    MAROON: '#800000',
    MEDIUMAQUAMARINE: '#66CDAA',
    MEDIUMBLUE: '#0000CD',
    MEDIUMORCHID: '#BA55D3',
    MEDIUMPURPLE: '#9370D8',
    MEDIUMSEAGREEN: '#3CB371',
    MEDIUMSLATEBLUE: '#7B68EE',
    MEDIUMSPRINGGREEN: '#00FA9A',
    MEDIUMTURQUOISE: '#48D1CC',
    MEDIUMVIOLETRED: '#C71585',
    MIDNIGHTBLUE: '#191970',
    MINTCREAM: '#F5FFFA',
    MISTYROSE: '#FFE4E1',
    MOCCASIN: '#FFE4B5',
    NAVAJOWHITE: '#FFDEAD',
    NAVY: '#000080',
    OLDLACE: '#FDF5E6',
    OLIVE: '#808000',
    OLIVEDRAB: '#6B8E23',
    ORANGE: '#FFA500',
    ORANGERED: '#FF4500',
    ORCHID: '#DA70D6',
    PALEGOLDENROD: '#EEE8AA',
    PALEGREEN: '#98FB98',
    PALETURQUOISE: '#AFEEEE',
    PALEVIOLETRED: '#D87093',
    PAPAYAWHIP: '#FFEFD5',
    PEACHPUFF: '#FFDAB9',
    PERU: '#CD853F',
    PINK: '#FFC0CB',
    PLUM: '#DDA0DD',
    POWDERBLUE: '#B0E0E6',
    PURPLE: '#800080',
    RED: '#FF0000',
    ROSYBROWN: '#BC8F8F',
    ROYALBLUE: '#4169E1',
    SADDLEBROWN: '#8B4513',
    SALMON: '#FA8072',
    SANDYBROWN: '#F4A460',
    SEAGREEN: '#2E8B57',
    SEASHELL: '#FFF5EE',
    SIENNA: '#A0522D',
    SILVER: '#C0C0C0',
    SKYBLUE: '#87CEEB',
    SLATEBLUE: '#6A5ACD',
    SLATEGRAY: '#708090',
    SNOW: '#FFFAFA',
    SPRINGGREEN: '#00FF7F',
    STEELBLUE: '#4682B4',
    TAN: '#D2B48C',
    TEAL: '#008080',
    THISTLE: '#D8BFD8',
    TOMATO: '#FF6347',
    TURQUOISE: '#40E0D0',
    VIOLET: '#EE82EE',
    VIOLETRED: '#D02090',
    WHEAT: '#F5DEB3',
    WHITE: '#FFFFFF',
    WHITESMOKE: '#F5F5F5',
    YELLOW: '#FFFF00',
    YELLOWGREEN: '#9ACD32'
};
export default {
    checkColor (str = '') {
        str = str.toUpperCase();
        let res = {
            isColor: false,
            str: str
        };
        if (colors[str]) {
            str = colors[str];
        }
        if (hReg.test(str)) {
            res.isColor = true;
            res.type = '0X';
        }
        if (rgbaReg.test(str)) {
            res.isColor = true;
            res.type = 'rgba';
        }
        return res;
    },
    /**
     * 将16进制颜色转为颜色数据
     */
    parseColorDataFrom0X (str) {
        str = str.toUpperCase();
        if (colors[str]) {
            str = colors[str];
        }
        str = str.slice(1);
        let data;
        if (str.length === 3) {
            data = str.split('').map(item => parseInt(`0x${item}${item}`));
        } else {
            data = [0, 2, 4].map(start => {
                return parseInt(`0x${str.substr(start, 2)}`);
            });
        }
        data.push(1);
        return data;
    },
    parseColorDataFromRGBA (str) {
        let match = str.match(rgbaReg).splice(1);
        return match.map(item => {
            if (item !== undefined) {
                return parseFloat(item);
            } else {
                return 1;
            }
        });
    },
    getComputedColor (destColor, oldColor, rate) {
        let res = [];
        destColor = this.checkColor(destColor);
        oldColor = this.checkColor(oldColor);
        if (destColor.isColor && oldColor.isColor) {
            destColor = this.getColorData(destColor.str, destColor.type);
            oldColor = this.getColorData(oldColor.str, oldColor.type);
            res = destColor.map((item, index) => {
                let counted =
                    (destColor[index] - oldColor[index]) * rate +
                    oldColor[index];
                if (index === 3) {
                    return Math.round(counted * 100) / 100;
                } else {
                    return Math.round(counted);
                }
            });
            return `rgba(${res.join(',')})`;
        }
    },
    getColorData (str, type) {
        if (type === '0X') {
            return this.parseColorDataFrom0X(str);
        } else if (type === 'rgba') {
            return this.parseColorDataFromRGBA(str);
        }
    }
};
