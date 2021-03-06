var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 基类，负责处理x,y,rotation 等属性
 */
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
    }
    DisplayObject.prototype.draw = function (context) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);
        context.restore();
    };
    DisplayObject.prototype.render = function (context) {
    };
    return DisplayObject;
}());
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
    }
    Bitmap.prototype.render = function (context) {
        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    };
    return Bitmap;
}(DisplayObject));
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        _super.apply(this, arguments);
        this.width = 100;
        this.height = 100;
        this.color = '#FF0000';
    }
    Rect.prototype.render = function (context) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    };
    return Rect;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
        this.font = "20px Arial";
        this.color = '#000000';
        this.filltext = 'HelloWorld';
    }
    TextField.prototype.render = function (context) {
        context.font = this.font;
        context.fillStyle = this.color;
        context.fillText(this.filltext, 0, 20);
    };
    return TextField;
}(DisplayObject));
function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject = renderQueue[i];
        displayObject.draw(context);
    }
}
var imagePool = {};
function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function (imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;
        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        function onLoadError() {
            alert('资源加载失败:' + imageUrl);
        }
    });
}
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var rect = new Rect();
rect.width = 245;
rect.height = 400;
rect.color = '#bdeed5';
var rect2 = new Rect();
rect2.width = 245;
rect2.height = 170;
rect2.x = 0;
rect2.y = 60;
rect2.color = '#ebe6d8';
var rect3 = new Rect();
rect3.width = 225;
rect3.height = 50;
rect3.x = 10;
rect3.y = 320;
rect3.color = '#0072bb';
var text = new TextField();
text.x = 200;
text.y = 5;
text.filltext = 'V.1.5.6';
text.font = "5px STXihei";
text.color = '#df1a23';
var text2 = new TextField();
text2.x = 110;
text2.y = 15;
text2.filltext = 'CA9E 213E CCF7 2C2B';
text2.font = "5px STXihei";
text2.color = '#df1a23';
var bitmap = new Bitmap();
bitmap.source = 'clear_icon.png';
bitmap.x = 10;
bitmap.y = 15;
var bitmap2 = new Bitmap();
bitmap2.source = 'Login_icon.png';
bitmap2.x = 70;
bitmap2.y = 280;
var bitmap3 = new Bitmap();
bitmap3.source = 'start_icon.png';
bitmap3.x = 45;
bitmap3.y = 240;
var bitmap4 = new Bitmap();
bitmap4.source = 'title_icon.png';
bitmap4.x = 4;
bitmap4.y = 60;
//渲染队列
var renderQueue = [rect, rect2, rect3, bitmap, bitmap2, bitmap3, bitmap4, text, text2];
//资源加载列表
var imageList = ['clear_icon.png', 'Login_icon.png', 'start_icon.png', 'title_icon.png'];
//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function () {
    drawQueue(renderQueue);
});
