function readFile() {
    var map_path = __dirname + "/map.json";
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;
    return mapData;
}
function writeFile() {
    console.log(mapData);
    var map_path = __dirname + "/map.json";
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
    stage.addChild(tileState(tile));
    console.log(tile);
    mapData[tile.ownedRow][tile.ownedCol] = mapData[tile.ownedRow][tile.ownedCol] ? 0 : 1;
    tile.setWalkable(mapData[tile.ownedRow][tile.ownedCol]);
    console.log(tile.ownedRow + " " + tile.ownedCol + " " + mapData[tile.ownedRow][tile.ownedCol]);
}
var SaveHitTest = function (localPoint, displayObject) {
    if (localPoint.x >= 0 && localPoint.x <= 100 && localPoint.y >= 0 && localPoint.y <= 50)
        return true;
};
function tileState(tile) {
    var Panel = new render.DisplayObjectContainer();
    Panel.x = 550;
    Panel.y = 50;
    var BackGround = new render.Rect();
    BackGround.width = 150;
    BackGround.height = 50;
    BackGround.color = '#bee4f0';
    Panel.addChild(BackGround);
    var x = tile.ownedRow + 1;
    var y = tile.ownedCol + 1;
    var Pos = new render.TextField();
    Pos.text = "坐标：(" + x + "," + y + ")";
    Pos.x = 10;
    Pos.y = 10;
    Panel.addChild(Pos);
    return Panel;
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
var panel = new editor.ControlPanel(); //UI�༭��
panel.x = 300;
stage.addChild(panel);
renderCore.start(stage);
eventCore.register(saveButton, SaveHitTest, onSaveClick);
