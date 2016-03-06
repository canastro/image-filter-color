function Color(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
}

function ColorInterval(rFrom, rTo, gFrom, gTo, bFrom, bTo) {
    if ((!rFrom || !rTo) && (rFrom > rTo)) {
        throw 'image-color:: Invalid ColorInterval';
    }

    if ((!gFrom || !gTo) && (gFrom > gTo)) {
        throw 'image-color:: Invalid ColorInterval';
    }

    if ((!bFrom || !bTo) && (bFrom > bTo)) {
        throw 'image-color:: Invalid ColorInterval';
    }

    this.from = new Color(rFrom, gFrom, bFrom);
    this.to = new Color(rTo, gTo, bTo);
}

function getCanvas(w, h) {
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    return canvas;
}

function getPixels(canvas, ctx, imageData) {
    ctx.putImageData(imageData, 0, 0);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function transform(canvas, context, imageData, colorInterval, match, noMatch) {
    var data = imageData.data;

    for (var i = 0; i < data.length; i+= 4) {

        var red = data[i];
        var green = data[i + 1];
        var blue = data[i + 2];
        var alpha = data[i + 3];

        if (red >= colorInterval.from.r && red <= colorInterval.to.r &&
            green >= colorInterval.from.g && green <= colorInterval.to.g &&
            blue >= colorInterval.from.b && blue <= colorInterval.to.b) {

            if (!match) {
                continue;
            }

            data[i] = match.r || red;
            data[i + 1] = match.g || green;
            data[i + 2] = match.b || blue;
            data[i + 3] = match.a || alpha;
        }

        if (noMatch) {
            data[i] = noMatch.r || red;
            data[i + 1] = noMatch.g || green;
            data[i + 2] = noMatch.b || blue;
            data[i + 3] = noMatch.a || alpha;
        }

    }

    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/jpeg', 1);
}

/**
 * @name imageColor
 * @param {object} options
 * @param {string} options.data - data of a image extracted from a canvas
 * @param {object} options.actions
 * @param {FilterColorAction} options.actions.match
 * @param {stringFilterColorAction} options.actions.noMatch
 * @param {ColorInterval} options.colorInterval
 */
function imageColor(options) {
    var result;
    var canvas;
    var context;

    if (!options.data || !options.colorInterval || !options.colorInterval instanceof ColorInterval) {
        throw new Error('image-color:: invalid options provided');
    }

    canvas = getCanvas(options.data.width, options.data.height);
    context = canvas.getContext('2d');

    options.data = getPixels(canvas, context, options.data);
    result = transform(canvas, context, options.data, options.colorInterval, options.actions.match, options.actions.noMatch);

    return result;
}

module.exports = {
    Color: Color,
    ColorInterval: ColorInterval,
    imageColor: imageColor
};
