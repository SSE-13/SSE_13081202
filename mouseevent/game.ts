
var humanContainer = new render.DisplayObjectContainer();
var Container = new render.DisplayObjectContainer();
humanContainer.x = 150;
humanContainer.y = 250;

humanContainer.addChild(Container);
Container.y = -210;
Container.x = -120;

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

Container.addChild(head)
Container.addChild(leftarm)
Container.addChild(rightarm)
Container.addChild(leftleg)
Container.addChild(rightleg)
Container.addChild(Hbody)

var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png", "leftarm.png", "rightarm.png", "leftleg.png", "rightleg.png", "body.png"]);

class HumanBody extends Body {
    
    
    vx:number = 5;
    

    onTicker(duringTime: number) {
        body.vx = 5;
        this.x += this.vx * duringTime;
        this.y = 200;
        this.rotation += Math.PI * duringTime;

    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    alert (`点击位置为${localPoint.x},${localPoint.y}`);
    return true;
}

var headOnClick = () => {
    alert("clicked!!");
    //修改 HumanBody 的速度，使其反向移动
}

eventCore.register(head,headHitTest,headOnClick);










