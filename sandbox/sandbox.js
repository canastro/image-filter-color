var ImageColor = require('../index');

function applyResults(selector, src) {
    var target;
    var image;

    target = document.querySelectorAll(selector)[0];

    image = document.createElement('img');
    image.setAttribute('src', src);
    target.appendChild(image);
}

window.onload = function () {

    var img = new Image;
    img.onload = function(){
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var context = canvas.getContext('2d');
        context.drawImage(img,0,0);

        var data = context.getImageData(0, 0, img.width, img.height);

        var colorIntervalBlue = new ImageColor.ColorInterval({
            from: new ImageColor.Color(0, 40, 100),
            to: new ImageColor.Color(80, 100, 150),
            match: new ImageColor.Color(0, 255, 255),
            noMatch: new ImageColor.Color(null, null, null, 50)
        });

        var colorIntervalPink = new ImageColor.ColorInterval({
            from: new ImageColor.Color(120, 30, 70),
            to: new ImageColor.Color(150, 60, 100),
            match: new ImageColor.Color(255, 0, 255, 255)
        });

        var results2 = ImageColor.applyActions({
            data: data,
            colorsInterval: [colorIntervalBlue, colorIntervalPink]
        });
        applyResults('#target-1', results2);

    };
    img.src = "board.jpg";
}
