
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


    export class Tile extends render.Bitmap {


        public ownedRow: number;
        public ownedCol: number;
        
        


        constructor() {
            super();
        }

        public setWalkable(value) {
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
        }
    }
    
    
    export class ControlPanel extends render.DisplayObjectContainer {
        
        constructor(){
            super();
           
        }
        
    }
}
