function isNullOrUndefined(value) {
    return value === null || value === undefined;
}

function validateInterval(from, to) {

    if ((isNullOrUndefined(from) || isNullOrUndefined(to)) && (from > to)) {
        return false;
    }

    return true;
}

module.exports = function ColorInterval(options) {

    if (!options.from || !options.to) {
        throw 'image-color:: Invalid ColorInterval';
    }

    this.from = options.from;
    this.to = options.to;

    if (!validateInterval(this.from.r, this.to.r)) {
        throw 'image-color:: Invalid ColorInterval => red color';
    }

    if (!validateInterval(this.from.g, this.to.g)) {
        throw 'image-color:: Invalid ColorInterval => green color';
    }

    if (!validateInterval(this.from.b, this.to.b)) {
        throw 'image-color:: Invalid ColorInterval => blue color';
    }

    this.match = options.match;
    this.noMatch = options.noMatch;
}
