var Color = require('./color');
var ColorInterval = require('./color-interval');

/**
 * @name getCanvas
 * @param {number} w - width
 * @param {number} h - height
 */
function getCanvas(w, h) {
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    return canvas;
}

/**
 * @name getPixels
 * @param {object} canvas
 * @param {object} context
 * @param {object} imageData
 */
function getPixels(canvas, context, imageData) {
    context.putImageData(imageData, 0, 0);
    return context.getImageData(0, 0, canvas.width, canvas.height);
}

/**
 * @name applyPixelTransformation
 * @param {array} pixles
 * @param {number} index
 * @param {Color} color
 */
function applyPixelTransformation(pixels, index, color) {
    pixels[index] = color.r || pixels[index];
    pixels[index + 1] = color.g || pixels[index + 1];
    pixels[index + 2] = color.b || pixels[index + 2];
    pixels[index + 3] = color.a || pixels[index + 3];
}

/**
 * @name evaluatePixel
 * @param {array} data
 * @param {number} index
 * @param {ColorInterval} colorInterval
 */
function evaluatePixel(data, index, colorInterval) {

    var red = data[index];
    var green = data[index + 1];
    var blue = data[index + 2];
    var alpha = data[index + 3];

    if (red >= colorInterval.from.r && red <= colorInterval.to.r &&
        green >= colorInterval.from.g && green <= colorInterval.to.g &&
        blue >= colorInterval.from.b && blue <= colorInterval.to.b) {

        if (colorInterval.match) {
            applyPixelTransformation(data, index, colorInterval.match);
        }
        return;
    }

    if (colorInterval.noMatch) {
        applyPixelTransformation(data, index, colorInterval.noMatch);
    }

}

/**
 * @name transform
 * @param {object} canvas
 * @param {object} context
 * @param {array} imageData
 * @param {array} colorsInterval
 */
function transform(canvas, context, imageData, colorsInterval) {
    var data = imageData.data;

    for (var i = 0; i < data.length; i+= 4) {
        colorsInterval.forEach(function(colorInterval) {
            evaluatePixel(data, i, colorInterval);
        });
    }

    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/jpeg', 1);
}

/**
 * @name applyActions
 * @param {object} options
 * @param {string} options.data - data of a image extracted from a canvas
 * @param {object} options.actions
 * @param {FilterColorAction} options.actions.match
 * @param {stringFilterColorAction} options.actions.noMatch
 * @param {Array[ColorInterval]} options.colorsInterval
 */
function applyActions(options) {
    var result;
    var canvas;
    var context;

    if (!options.data || !options.colorsInterval) {
        throw new Error('image-color:: invalid options provided');
    }

    canvas = getCanvas(options.data.width, options.data.height);
    context = canvas.getContext('2d');

    options.data = getPixels(canvas, context, options.data);
    result = transform(canvas, context, options.data, options.colorsInterval);

    return result;
}

module.exports = {
    Color: Color,
    ColorInterval: ColorInterval,
    applyActions: applyActions
};
