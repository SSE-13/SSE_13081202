
module data {

    export class Storage {

        private static _instance: Storage;

        public static getInstance(): Storage {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        }


        public readFile() {
            this.mapData = null;
            this.startRequest();
            /*
            var content = fs.readFileSync(map_path, "utf-8");
            var obj = JSON.parse(content);
            this.mapData = obj.map;*/
        }
        
        //public saveFile(){
            
        //}
        
        private xmlHttp;
        public mapData;
        
        private startRequest()
        {
            this.xmlHttp = new XMLHttpRequest();
            try
            {
                this.xmlHttp.open("GET", "map.json", false);
                this.xmlHttp.send(null);
                this.xmlHttp.onreadystatechange = this.handleStateChange();
            }
            catch(exception)
            {
                alert("XMLHttp Fail");
            }
        }
        private handleStateChange()
        {
            if(this.xmlHttp.readyState == 4)
            {
                if (this.xmlHttp.status == 200 || this.xmlHttp.status == 0)
                {
                    this.mapData = JSON.parse(this.xmlHttp.responseText).map;
                }
            }
        }
        
    }
}