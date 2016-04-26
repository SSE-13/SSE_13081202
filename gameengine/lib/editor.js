var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var editor;
(function (editor) {
    editor.GRID_PIXEL_WIDTH = 50;
    editor.GRID_PIXEL_HEIGHT = 50;
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap() {
            _super.call(this);
            this.isDirty = true;
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;
        }
        WorldMap.prototype.render = function (context) {
            _super.prototype.render.call(this, context);
        };
        return WorldMap;
    }(render.DisplayObjectContainer));
    editor.WorldMap = WorldMap;
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile() {
            _super.call(this);
        }
        Tile.prototype.setWalkable = function (value) {
            //this.color = value ? "#0000FF" : "#FF0000";
            this.n = value;
            switch (value) {
                case 0:
                    this.source = "pic1.jpg";
                    break;
                case 1:
                    this.source = "pic2.jpg";
                    break;
                case 2:
                    this.source = "pic3.jpg";
                    break;
                case 3:
                    this.source = "pic4.jpg";
                    break;
                case 4:
                    this.source = "pic5.jpg";
                    break;
                case 5:
                    this.source = "pic6.jpg";
                    break;
                case 6:
                    this.source = "pic7.jpg";
                    break;
                case 7:
                    this.source = "pic8.jpg";
                    break;
                default:
                    break;
            }
        };
        return Tile;
    }(render.Bitmap));
    editor.Tile = Tile;
    var ControlPanel = (function (_super) {
        __extends(ControlPanel, _super);
        function ControlPanel() {
            _super.call(this);
        }
        return ControlPanel;
    }(render.DisplayObjectContainer));
    editor.ControlPanel = ControlPanel;
})(editor || (editor = {}));
