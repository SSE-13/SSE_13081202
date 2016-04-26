var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    game.GRID_PIXEL_WIDTH = 50;
    game.GRID_PIXEL_HEIGHT = 50;
    var WorldMap = (function (_super) {
        __extends(WorldMap, _super);
        function WorldMap(mapData) {
            _super.call(this);
            this.isDirty = true;
            this.mapData = mapData;
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;
            var rows = mapData.length;
            var cols = mapData[0].length;
            var grid = new astar.Grid(rows, cols);
            this.grid = grid;
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    var value = mapData[i][j];
                    //0:不可走，1:可走
                    grid.setWalkable(j, i, value == 1 ? true : false);
                }
            }
        }
        WorldMap.prototype.render = function (context) {
            _super.prototype.render.call(this, context);
        };
        return WorldMap;
    }(render.DisplayObjectContainer));
    game.WorldMap = WorldMap;
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile(source) {
            _super.call(this, source);
        }
        return Tile;
    }(render.Bitmap));
    game.Tile = Tile;
    var Material = (function (_super) {
        __extends(Material, _super);
        function Material() {
            _super.call(this);
            this.materials = [];
        }
        Material.prototype.addMaterial = function (material) {
            this.materials.push(material);
        };
        Material.prototype.render = function (context) {
            for (var i = 0; i < this.materials.length; i++) {
                var child = this.materials[i];
                child.draw(context);
            }
        };
        return Material;
    }(render.DisplayObject));
    game.Material = Material;
    //人物
    var BoyShape = (function (_super) {
        __extends(BoyShape, _super);
        function BoyShape() {
            _super.call(this);
            var character = new render.Bitmap("character.png");
            character.x = 0;
            character.y = 0;
            this.addChild(character);
        }
        return BoyShape;
    }(render.DisplayObjectContainer));
    game.BoyShape = BoyShape;
    // 人物运动
    var BoyBehaviour = (function (_super) {
        __extends(BoyBehaviour, _super);
        function BoyBehaviour() {
            _super.apply(this, arguments);
            this.width = game.GRID_PIXEL_WIDTH;
            this.height = game.GRID_PIXEL_HEIGHT;
            this.steps = 1;
            this.startX = 0;
            this.startY = 0;
        }
        //public finished=true;
        BoyBehaviour.prototype.move = function (grid, row, col) {
            if (grid.getWalkable(col, row)) {
                grid.setStartNode(this.startX, this.startY);
                grid.setEndNode(col, row);
                var findpath = new astar.AStar();
                findpath.setHeurisitic(findpath.diagonal);
                var result = findpath.findPath(grid);
                this.path = findpath._path;
                console.log(this.path);
                if (this.path != null) {
                    //网格和数组坐标转换
                    this.startX = col;
                    this.startY = row;
                }
            }
            else {
                console.log(grid.getWalkable(col, row));
                console.log("无法通过");
            }
        };
        BoyBehaviour.prototype.onTicker = function (duringTime) {
            if (this.path != null) {
                if (this.steps < this.path.length) {
                    //this.finished=false;
                    var targetNode = this.path[this.steps];
                    var targetx = targetNode.x * this.width;
                    var targety = targetNode.y * this.height;
                    if (this.x < targetx) {
                        this.x = (this.x + this.vx * duringTime > targetx) ? targetx : (this.x + this.vx * duringTime);
                    }
                    if (this.x > targetx) {
                        this.x = (this.x - this.vx * duringTime < targetx) ? targetx : (this.x - this.vx * duringTime);
                    }
                    if (this.y < targety) {
                        this.y = (this.y + this.vy * duringTime > targety) ? targety : (this.y + this.vy * duringTime);
                    }
                    if (this.y > targety) {
                        this.y = (this.y - this.vy * duringTime < targety) ? targety : (this.y - this.vy * duringTime);
                    }
                    if (this.x == targetx && this.y == targety) {
                        if (this.steps == this.path.length - 1) {
                            this.steps = 1;
                            this.path = null;
                        }
                        else {
                            this.steps += 1;
                        }
                    }
                }
            }
            //console.log(this.finished);
        };
        return BoyBehaviour;
    }(Body));
    game.BoyBehaviour = BoyBehaviour;
})(game || (game = {}));
