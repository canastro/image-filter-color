# image-filter-color

Small library to apply a color transformation to a image.

## Install

```
npm install image-filter-color --save
```

## Usage
It applies a contrast transformation to a base64 image. If you want a more complete library, please check image-filters that wraps this and other libraries to provide a more complete suite of image filters.

This library gives you the possibility to apply color transformation based on a interval of colors. You need to provide a interval of colors and a color to replace a pixel that matches and one that doesn't.

```js
var ImageColor = require('image-filter-color');

var colorInterval = new ImageColor.ColorInterval({
    from: new ImageColor.Color(40, 60, 100),
    to: new ImageColor.Color(80, 100, 150),
    match: new ImageColor.Color(255, 0, 255),
    noMatch: new ImageColor.Color(null, null, null, 50)
});

var results = ImageColor.applyActions({
    data: data,
    colorsInterval: [colorInterval]
});
```
