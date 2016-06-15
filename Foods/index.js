
exports.getFoodsByCalories = (req, res) => {
    this.baseUrl = "http://platform.fatsecret.com/rest/server.api?";
    this.key = "oauth_consumer_key=92847985df8d42189d3691fd95bdf91d";
    this.shared = "69bd95472ed3418eb717b0f4b7aa8c02";
    this.sigMethod = "oauth_signature_method=HMAC-SHA1";
    this.timeStamp = "oauth_timestamp=";
    this.version = "oauth_version=1.0";
    this.method =  "method=foods.search";
    this.token = "&";
    var url = this.baseUrl + this.method + this.token + this.key ;//TODO
    // http.request(url, (res) => {
    //     //TODO
    // });
};