/*
function readFile() {
    var map_path = __dirname + "/map.json"
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;
    return mapData;
}

function writeFile() {
    console.log(mapData);
    var map_path = __dirname + "/map.json"
    var json = "{\"map\":" + JSON.stringify(mapData) + "}";
    console.log(json);
    fs.writeFileSync(map_path, json, "utf-8");
    console.log("saved");
}
*/
function createMapEditor(MapData) {
    /*
    var world = new editor.WorldMap();
*/
    var world = new game.WorldMap(MapData);
    var rows = mapData.length;
    var cols = mapData[0].length;
    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile;
            //设置图片
            /*
            if(world.grid.getWalkable(col,row)){
                tile=new game.Tile("road.png");
            }else{
                tile=new game.Tile("barrier.png");
            }*/
            //==============================================
            switch (mapData[row][col]) {
                case 0:
                    tile = new game.Tile("pic1.png");
                    break;
                case 1:
                    tile = new game.Tile("pic2.png");
                    break;
                case 2:
                    tile = new game.Tile("pic3.png");
                    break;
                case 3:
                    tile = new game.Tile("pic4.png");
                    break;
                case 4:
                    tile = new game.Tile("pic5.png");
                    break;
                case 5:
                    tile = new game.Tile("pic6.png");
                    break;
                case 6:
                    tile = new game.Tile("pic7.png");
                    break;
                case 7:
                    tile = new game.Tile("pic8.png");
                    break;
                default:
                    break;
            }
            //tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT;
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);
            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return world;
}
function onTileClick(tile) {
    console.log(tile);
    //if(body.finished){
    body.move(map.grid, tile.ownedRow, tile.ownedCol);
    //}
}
var storage = data.Storage.getInstance();
storage.readFile();
var mapData = storage.mapData;
var ticker = new Ticker();
var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();
var stage = new render.DisplayObjectContainer();
//stage.addChild(mapEditor);
//var panel = new editor.ControlPanel();
//panel.x = 300;
//stage.addChild(panel);
//renderCore.start(stage);
var boyShape = new game.BoyShape();
var body = new game.BoyBehaviour(boyShape);
var map = createMapEditor(storage.mapData);
stage.addChild(map);
stage.addChild(boyShape);
ticker.start([body]);
ticker.onTicker();
renderCore.start(stage, ["pic1.png", "pic2.png", "pic3.png", "pic4.png", "pic5.png", "pic6.png", "pic7.png", "pic8.png", "character.png"]);
