var m = require("mithril");
var AppConfig = require("../../AppConfig.js");

/**
 * Model that handles data for a player's statisitical profile
 */
var PlayerProfile = {
    results: null,
    loadResults: (params) => {
        // Verify we have a valid uuid
        if(params == null || typeof params == "undefined"){ return; }
        if(params.length != 32){ return; }
        
        // Ask for the data
        return m.request({
            method: "GET",
            url:AppConfig.api_endpoint + "?action=profile&params=" + params,
            withCredentials: false
        })
        
        // Process the answer
        .then( (resp) => {
            if(resp == null || resp.length == 0){
                PlayerProfile.results = null;
                return;
            }
            PlayerProfile.results = resp;
            console.log(resp);
        })
        
        // Report if something goes wrong
        // TODO: Better (any) reporting to non-technical users
        .catch( (error) => {
            PlayerProfile.results = null;
            console.log("[PCN]" + error.code);
            console.log(error.message);
        });
    }
}

module.exports = PlayerProfile;