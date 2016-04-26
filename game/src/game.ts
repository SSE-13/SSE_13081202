module game {


    export const GRID_PIXEL_WIDTH = 50;

    export const GRID_PIXEL_HEIGHT = 50;


    export class WorldMap extends render.DisplayObjectContainer {

        private cache: HTMLCanvasElement;
        public isDirty = true;

        public grid: astar.Grid;
        private mapData;



        constructor(mapData) {
            super();
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

        render(context: CanvasRenderingContext2D) {
            super.render(context);
        }
    }

    
    export class Tile extends render.Bitmap {

        public ownedRow: number;
        public ownedCol: number;

        constructor(source: string) {
            super(source);
        }
    }

    export class Material extends render.DisplayObject {
        materials: Array<render.Bitmap>;
        constructor() {
            super();
            this.materials = [];
        }
        public addMaterial(material: render.Bitmap) {
            this.materials.push(material);
        }
        render(context) {
            for (var i = 0; i < this.materials.length; i++) {
                var child = this.materials[i];
                child.draw(context);
            }
        }
    }

    //人物
    export class BoyShape extends render.DisplayObjectContainer {

        constructor() {
            super();
            var character = new render.Bitmap("character.png");
            character.x = 0;
            character.y = 0;
            this.addChild(character);
        }

    }
    
    
    // 人物运动
    export class BoyBehaviour extends Body {
        width = game.GRID_PIXEL_WIDTH;
        height = game.GRID_PIXEL_HEIGHT;
        steps = 1;
        path;
        private startX = 0;
        private startY = 0;
        //public finished=true;

        

        public move(grid: astar.Grid, row, col) {
            if (grid.getWalkable(col, row)) {
                grid.setStartNode(this.startX, this.startY);
                grid.setEndNode(col, row);
                var findpath = new astar.AStar();
                findpath.setHeurisitic(findpath.diagonal);
                var result = findpath.findPath(grid); 
                this.path = findpath._path;
                console.log(this.path)
                if (this.path != null) {
                    //网格和数组坐标转换
                    this.startX = col;
                    this.startY = row;
                }

            } else {
                console.log(grid.getWalkable(col, row));
                console.log("无法通过");
            }
        }
        
        
        public onTicker(duringTime) {

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
                        if (this.steps == this.path.length-1) {
                            this.steps = 1;
                            this.path = null;
                        } else {
                            this.steps += 1;
                        }
                    }
                }
                /*
                else
                {
                    this.finished=true;
                }
                */
            }
            //console.log(this.finished);
        }
    }
}