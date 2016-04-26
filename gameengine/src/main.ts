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

    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);
            map_tile.push(tile);


            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }

    return world;

}




function onTileClick(tile: editor.Tile) {

    stage.addChild(tileState(tile));
    picClick(tile);
    radioClick(tile);

    console.log(tile);
    //mapData[tile.ownedRow][tile.ownedCol] = tile.n;
    //tile.setWalkable(mapData[tile.ownedRow][tile.ownedCol]);
    console.log(tile.ownedRow + " " + tile.ownedCol + " " + mapData[tile.ownedRow][tile.ownedCol]);
}

var SaveHitTest = (localPoint: math.Point, displayObject: render.DisplayObject) => {
    if (localPoint.x >= 0 && localPoint.x <= 100 && localPoint.y >= 0 && localPoint.y <= 50)
        return true;
}


function tileState(tile: editor.Tile) {
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


function picClick(tile: editor.Tile) {
    picBtn[0].onClick = () => {
        var pos = new command.CommandA(tile.ownedRow, tile.ownedCol, tile.n);
        invoker.setCommand(pos);
        tile.setWalkable(0);
        mapData[tile.ownedRow][tile.ownedCol] = tile.n;
    }
    picBtn[1].onClick = () => {
        var pos = new command.CommandA(tile.ownedRow, tile.ownedCol, tile.n);
        invoker.setCommand(pos);
        tile.setWalkable(1);
        mapData[tile.ownedRow][tile.ownedCol] = tile.n;
    }
    picBtn[2].onClick = () => {
        var pos = new command.CommandA(tile.ownedRow, tile.ownedCol, tile.n);
        invoker.setCommand(pos);
        tile.setWalkable(2);
        mapData[tile.ownedRow][tile.ownedCol] = tile.n;
    }
    picBtn[3].onClick = () => {
        var pos = new command.CommandA(tile.ownedRow, tile.ownedCol, tile.n);
        invoker.setCommand(pos);
        tile.setWalkable(3);
        mapData[tile.ownedRow][tile.ownedCol] = tile.n;
    }
    picBtn[4].onClick = () => {
        var pos = new command.CommandA(tile.ownedRow, tile.ownedCol, tile.n);
        invoker.setCommand(pos);
        tile.setWalkable(4);
        mapData[tile.ownedRow][tile.ownedCol] = tile.n;
    }
    picBtn[5].onClick = () => {
        var pos = new command.CommandA(tile.ownedRow, tile.ownedCol, tile.n);
        invoker.setCommand(pos);
        tile.setWalkable(5);
        mapData[tile.ownedRow][tile.ownedCol] = tile.n;
    }
    picBtn[6].onClick = () => {
        var pos = new command.CommandA(tile.ownedRow, tile.ownedCol, tile.n);
        invoker.setCommand(pos);
        tile.setWalkable(6);
        mapData[tile.ownedRow][tile.ownedCol] = tile.n;
    }
    picBtn[7].onClick = () => {
        var pos = new command.CommandA(tile.ownedRow, tile.ownedCol, tile.n);
        invoker.setCommand(pos);
        tile.setWalkable(7);
        mapData[tile.ownedRow][tile.ownedCol] = tile.n;
    }
}

function radioClick(tile: editor.Tile) {
    var count = 0;
    radioBtn.text = "可走";
    radioBtn.onClick = () => {
        count++;
        if (count % 2 == 1) {
            radioBtn.text = "不可走";
        } else {
            radioBtn.text = "可走";
        }
    }
}

function onSaveClick() {
    console.log("saving");
    writeFile();
}

function Undo() {

    var undobutton = new render.DisplayObjectContainer();
    undobutton.width = 55;
    undobutton.height = 30;
    var Background = new render.Rect();
    Background.width = 55;
    Background.height = 30;
    Background.color = '#FFF0FF';

    var title = new render.TextField();
    title.text = 'Undo';

    undobutton.addChild(Background);
    undobutton.addChild(title);

    eventCore.register(undobutton, events.displayObjectRectHitTest, onUndoButtonClick);

    return undobutton;

}
function onUndoButtonClick() {

    if (invoker.canUndo()) {

        invoker.undo();

        var row = invoker.new_command.new_row;
        var col = invoker.new_command.new_col;
        var num = invoker.new_command.new_num;


        for (var i = 0; i < map_tile.length; i++) {
            if (map_tile[i].ownedRow == row && map_tile[i].ownedCol == col) {
                map_tile[i].setWalkable(num);
            }

        }
    }



}

var storage = data.Storage.getInstance();
storage.readFile();
var mapData = storage.mapData;


var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();

var stage = new render.DisplayObjectContainer();


var invoker = new command.Invoker();
invoker.init();

var map_tile = new Array();

var undo = Undo();
undo.x = 650;
undo.y = 200;

var button = new render.Rect();
stage.addChild(button);
button.x = 550;
button.y = 200;
button.width = 80;
button.height = 30;

var saveButton = new render.TextField();
stage.addChild(saveButton);
saveButton.text = "save";
saveButton.x = 550;
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
stage.addChild(undo);

//var panel = new editor.ControlPanel();//UI�༭��
//panel.x = 300;
//stage.addChild(panel);


var ResPanel = SetpicBtn();
ResPanel.x = 0;
ResPanel.y = 550;
stage.addChild(ResPanel);

renderCore.start(stage, ["pic1.png", "pic2.png", "pic3.png", "pic4.png", "pic5.png", "pic6.png", "pic7.png", "pic8.png"]);

renderCore.start(stage);
eventCore.register(saveButton, SaveHitTest, onSaveClick);
