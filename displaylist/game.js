var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
var leftarm = new render.Bitmap();
var rightarm = new render.Bitmap();
var leftleg = new render.Bitmap();
var rightleg = new render.Bitmap();
var Hbody = new render.Bitmap();
head.source = "head.png";
leftarm.source = "leftarm.png";
rightarm.source = "rightarm.png";
leftleg.source = "leftleg.png";
rightleg.source = "rightleg.png";
Hbody.source = "body.png";
humanContainer.addChild(head);
humanContainer.addChild(leftarm);
humanContainer.addChild(rightarm);
humanContainer.addChild(leftleg);
humanContainer.addChild(rightleg);
humanContainer.addChild(Hbody);
var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png", "leftarm.png", "rightarm.png", "leftleg.png", "rightleg.png", "body.png"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        // this.x = 
        // this.y = 
        // this.rotation =
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);
//# sourceMappingURL=game.js.map