
module editor {


    export const GRID_PIXEL_WIDTH = 50;

    export const GRID_PIXEL_HEIGHT = 50;

    export class WorldMap extends render.DisplayObjectContainer {


        private cache: HTMLCanvasElement;

        public isDirty = true;
        constructor() {

            super();
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;

        }


        render(context: CanvasRenderingContext2D) {
            super.render(context);
        }
    }


    export class Tile extends render.Rect {


        public ownedRow: number;
        public ownedCol: number;


        constructor() {
            super();
        }

        public setWalkable(value) {
<<<<<<< HEAD
            this.color = value ? "#0000FF" : "#FF0000";
=======
             //this.color = value ? "#0000FF" : "#FF0000";
             this.n = value;
            switch (value) {
                case 0:
                    this.source = "pic1.png"
                    break;
                case 1:
                    this.source = "pic2.png"
                    break;
                case 2:
                    this.source = "pic3.png"
                    break;
                case 3:
                    this.source = "pic4.png"
                    break;
                case 4:
                    this.source = "pic5.png"
                    break;
                case 5:
                    this.source = "pic6.png"
                    break;
                case 6:
                    this.source = "pic7.png"
                    break;
                case 7:
                    this.source = "pic8.png"
                    break;
                default:
                    break;
            }
>>>>>>> 6f4b4b29f2879735a1b89339416b86816989adbe
        }
    }
    
    
    export class ControlPanel extends render.DisplayObjectContainer {
        
        constructor(){
            super();
           
        }
        
    }
}
