var m = require("mithril");
var AppConfig = require("../../AppConfig.js");

var PlayerProfile = {
    results: null,
    loadResults: (params) => {
        //Verify we have a valid uuid
        if(params == null || typeof params == "undefined"){ return; }
        if(params.length != 32){ return; }
        
        return m.request({
            method: "GET",
            url:AppConfig.api_endpoint + "?action=profile&params=" + params,
            withCredentials: false
        }).then( (resp) => {
            if(resp == null || resp.length == 0){
                PlayerProfile.results = null;
                return;
            }
            PlayerProfile.results = resp;
            console.log(resp);
        }).catch( (error) => {
            PlayerProfile.results = null;
            console.log("[PCN]" + error.code);
            console.log(error.message);
        });
    }
}

module.exports = PlayerProfile;