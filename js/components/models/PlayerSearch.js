var m = require("mithril");
var AppConfig = require("../../AppConfig.js");

/**
 * Model that handles searching
 */
var PlayerSearch = {
    results: [],
    loadResults: function(params){
        
        // Make sure we have something to search for
        if(params == null || typeof params == "undefined")
            return;

        // Make sure that it is something meaningful
        if(params.length < 1 || params.length > 16)
            return;

        // Ask for the data
        return m.request({
            method: "GET",
            url:AppConfig.api_endpoint + "?action=search&params=" + params,
            withCredentials: false
        })
        
        // Process the answer; store the result
        .then(function(resp){
            if(resp.length == 0){
                PlayerSearch.results = [];
                return;
            }
            PlayerSearch.results = resp;
        })
        
        // If something goes wrong
        // TODO: Better (any) error reporting for non-technical users
        .catch(function(error){
            PlayerSearch.results = [];
            console.log("[PCN]" + error.code);
            console.log(error.message);
        });
    },
}

module.exports = PlayerSearch;