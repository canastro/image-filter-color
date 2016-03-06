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

        var results = ImageColor.imageColor({
            data: data,
            colorInterval: new ImageColor.ColorInterval(40, 80, 60, 100, 100, 150),
            actions: {
                match: null,
                noMatch: new ImageColor.Color(null, null, null, 50)
            }
        });
        applyResults('#target-1', results);
    };
    img.src = "https://lh3.googleusercontent.com/UVvaEs6lT9ZDxy6F4el3RLbz9Vb-58XMqi7wGv5EELjJ38tIyCQQljxyjKHKDle6SPztviWHve2ioQoTYXhG1_bQxnfys5OU4Zrcyf8HEypoNSPUJYpc231Ix3q0GHOHhFCUM_4B6eZobfUJeZBLdWADKLbOy6gDVR9jcyy8erDMEdS1humpok3erVte-rcDLUaM6o2dT3-tlRGLR4N9c40bKOwqb-E3CqB3cdfL2XQmt_8F5T3KTJn5EBhr4mlgUfLC2pIxPT5aX6cAu-X31vMXs7wdzFdyRtCDUq03g9j4RNIoxWYncVLp6WD08L7M65lYU4xCzski_RymMdU8iFIYUu3oDs4WBRnCIMgOHBLeVBihKW4Hvbysaa2FLSnsTkHmVLqglq2KHYnGl-aoP0X4-i3mYn4DiKI_vVsqgjx0s-w9FuXvL-P9bLH1x4jor9PyCDSwyMa8XzTGgTJe7moX_71baH92R5aJAlxIDHeIoKdq758nDU25w-cSBHKQcm49oLiGjQw72GzOt4LO8-NjRYGunXWalG20RaBK0lXBEZg3l1Yxq6IN2wKEdlHWBUz9=w1844-h1382-no";
}
