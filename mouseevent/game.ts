
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
    V = Math.PI / 2;

    onTicker(duringTime: number) {
        body.vx = 5;
        this.x += this.vx * duringTime;
        this.y = 200;
        this.rotation += this.V * duringTime;

    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
body.y = 200;
body.x = 100;
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var Head = 0;
var CHead = false;
var Leg = 0;
var CLeg = false;

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    alert (`点击位置为${localPoint.x},${localPoint.y}`);
    console.log(localPoint);

    if (localPoint.x <= Math.abs(displayObject.x * 6) && localPoint.y <= Math.abs(displayObject.y) &&
        localPoint.x > 0 && localPoint.y > 0) {
        Head += 1;
        CHead = true;

    }
    return CHead;
    
  
}

var LegHitTest = (localPoint: math.Point, displayObject: render.DisplayObject) => {
    console.log(localPoint);

    if (localPoint.x > 0 && localPoint.x <= Math.abs(displayObject.x * 2) && localPoint.y > 0 && localPoint.y < Math.abs(displayObject.y * 2)) {
        Leg += 1;
        CLeg = true;
    }

    return CLeg;

}

var headOnClick = () => {
    if (Head == 1) {
        if (body.vx != 0) {
            body.vx *= -1;
            body.V *= -1;
        }
        if (body.vx == 0) {
            Head = 0;
        }

    }

    if (Head != 1) {
        body.vx = 5;
        body.V = Math.PI / 2;
        Head = 0;
    }
    CHead = false;
}

var LegOnClick = () => {

    if (Leg == 1) {

        body.vx = 0;
        body.V = 0;
        body.rotation = 0;
    }
    if (Leg >= 1) {

        Leg = 0;
    }
    CLeg = false;
   


}

eventCore.register(head, headHitTest, headOnClick);
eventCore.register(leftleg, LegHitTest, LegOnClick);
eventCore.register(rightleg, LegHitTest, LegOnClick);










