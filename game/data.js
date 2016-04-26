var data;
(function (data) {
    var Storage = (function () {
        function Storage() {
        }
        Storage.getInstance = function () {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        };
        Storage.prototype.readFile = function () {
            this.mapData = null;
            this.startRequest();
            /*
            var content = fs.readFileSync(map_path, "utf-8");
            var obj = JSON.parse(content);
            this.mapData = obj.map;*/
        };
        Storage.prototype.startRequest = function () {
            this.xmlHttp = new XMLHttpRequest();
            try {
                this.xmlHttp.open("GET", "map.json", false);
                this.xmlHttp.send(null);
                this.xmlHttp.onreadystatechange = this.handleStateChange();
            }
            catch (exception) {
                alert("XMLHttp Fail");
            }
        };
        Storage.prototype.handleStateChange = function () {
            if (this.xmlHttp.readyState == 4) {
                if (this.xmlHttp.status == 200 || this.xmlHttp.status == 0) {
                    this.mapData = JSON.parse(this.xmlHttp.responseText).map;
                }
            }
        };
        return Storage;
    }());
    data.Storage = Storage;
})(data || (data = {}));
