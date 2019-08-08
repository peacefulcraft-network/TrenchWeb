var m = require("mithril");
var AppConfig = require("../../AppConfig.js");

var PlayerSearch = {
    params: null,
        setParams: function(params){ 
            PlayerSearch.params = params; 
            PlayerSearch.results = [];
        },
    results: [],
    loadResults: function(){
        let params = PlayerSearch.params;
        
        //Make sure we have something to search for
        if(params == null || typeof params == "undefined")
            return;

        //Make sure that it is something meaningful
        if(params.length < 2 || params.length > 16)
            return;

        return m.request({
            method: "GET",
            url:AppConfig.api_endpoint + "?action=search&params=" + params,
            withCredentials: false
        }).then(function(resp){
            if(resp.length == 0){
                PlayerSearch.results = [{error:"No Results"}];
                return;
            }
            PlayerSearch.results = resp;
        }).catch(function(error){
            PlayerSearch.results = [{"error":error.message}];
            console.log("[PCN]" + error.code);
            console.log(error.message);
        });
    },
}

module.exports = PlayerSearch;