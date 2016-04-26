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
    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
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
    picClick(tile);
    radioClick(tile);
    console.log(tile);
    //mapData[tile.ownedRow][tile.ownedCol] = mapData[tile.ownedRow][tile.ownedCol] ? 0 : 1;
    //tile.setWalkable(mapData[tile.ownedRow][tile.ownedCol]);
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
    BackGround.width = 210;
    BackGround.height = 50;
    BackGround.color = '#b7b7b7';
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
var picBtn = new Array();
function SetpicBtn() {
    var picPanel = new render.DisplayObjectContainer();
    for (var i = 0; i < 8; i++) {
        picBtn[i] = new ui.Button();
        picBtn[i].text = "P" + (i + 1);
        picBtn[i].with = 50;
        picBtn[i].height = 50;
        picBtn[i].source = i + 1;
        picBtn[i].x = (i % 4) * 133;
        picBtn[i].y = Math.floor(i / 4) * 60;
        picPanel.addChild(picBtn[i]);
    }
    return picPanel;
}
function picClick(tile) {
    picBtn[0].onClick = function () {
        tile.setWalkable(0);
    };
    picBtn[1].onClick = function () {
        tile.setWalkable(1);
    };
    picBtn[2].onClick = function () {
        tile.setWalkable(2);
    };
    picBtn[3].onClick = function () {
        tile.setWalkable(3);
    };
    picBtn[4].onClick = function () {
        tile.setWalkable(4);
    };
    picBtn[5].onClick = function () {
        tile.setWalkable(5);
    };
    picBtn[6].onClick = function () {
        tile.setWalkable(6);
    };
    picBtn[7].onClick = function () {
        tile.setWalkable(7);
    };
}
function radioClick(tile) {
    var count = 0;
    radioBtn.onClick = function () {
        count++;
        if (count % 2 == 1) {
            radioBtn.text = "不可走";
        }
        else {
            radioBtn.text = "可走";
        }
    };
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
var radioBtn = new ui.Button();
radioBtn.width = 100;
radioBtn.height = 30;
radioBtn.y = 110;
radioBtn.x = 550;
radioBtn.text = "可走";
radioBtn.color = '#b7b7b7';
stage.addChild(radioBtn);
var mapEditor = createMapEditor();
stage.addChild(mapEditor);
stage.addChild(saveButton);
//var panel = new editor.ControlPanel();//UI�༭��
//panel.x = 300;
//stage.addChild(panel);
var ResPanel = SetpicBtn();
ResPanel.x = 0;
ResPanel.y = 550;
stage.addChild(ResPanel);
renderCore.start(stage, ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg", "pic6.jpg", "pic7.jpg", "pic8.jpg"]);
renderCore.start(stage);
eventCore.register(saveButton, SaveHitTest, onSaveClick);
