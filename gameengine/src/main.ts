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

function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;

    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT
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




function onTileClick(tile: editor.Tile) {
    console.log(tile);
    mapData[tile.ownedRow][tile.ownedCol] = mapData[tile.ownedRow][tile.ownedCol] ? 0 : 1;
    tile.setWalkable(mapData[tile.ownedRow][tile.ownedCol]);
    console.log(tile.ownedRow + " " + tile.ownedCol + " " + mapData[tile.ownedRow][tile.ownedCol]);  
}

var SaveHitTest = (localPoint: math.Point, displayObject: render.DisplayObject) => {
    if (localPoint.x >= 0 && localPoint.x <= 100 && localPoint.y >= 0 && localPoint.y <= 50)
        return true;
}



function onSaveClick() {
    console.log("saving");
    writeFile();
}

var storage = data.Storage.getInstance();
storage.readFile();
var mapData = storage.mapData;


var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();

var stage = new render.DisplayObjectContainer();

var button = new render.Rect();
stage.addChild(button);
button.x = 600;
button.y = 200;
button.width = 80;
button.height = 50;

var saveButton = new render.TextField();
stage.addChild(saveButton);
saveButton.text = "save";
saveButton.x = 600;
saveButton.y = 200;

var mapEditor = createMapEditor();
stage.addChild(mapEditor);
stage.addChild(saveButton);


<<<<<<< HEAD
var panel = new editor.ControlPanel();//UI±à¼­Æ÷
panel.x = 300;
stage.addChild(panel);
=======
renderCore.start(stage,["pic1.png","pic2.png","pic3.png","pic4.png","pic5.png","pic6.png","pic7.png","pic8.png"]);
>>>>>>> 6f4b4b29f2879735a1b89339416b86816989adbe

renderCore.start(stage);
eventCore.register(saveButton, SaveHitTest, onSaveClick);
