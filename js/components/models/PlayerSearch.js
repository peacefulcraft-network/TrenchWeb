var m = require("mithril");
var AppConfig = require("../../AppConfig.js");

var PlayerSearch = {
    params: null,
        getParams: function(){
            return this.params;
        },
        setParams: function(params){ 
            PlayerSearch.params = params; 
            PlayerSearch.results = [];
            this.hasSearched = false;
        },
    results: [],
    hasSearched: false,
    loadResults: function(){
        let params = PlayerSearch.params;
        
        //Make sure we have something to search for
        if(params == null || typeof params == "undefined")
            return;

        //Make sure that it is something meaningful
        if(params.length < 1 || params.length > 16)
            return;

        //Make sure we don't redraw to infinity
        if(this.hasSearched){return;}
        this.hasSearched = true;

        return m.request({
            method: "GET",
            url:AppConfig.api_endpoint + "?action=search&params=" + params,
            withCredentials: false
        }).then(function(resp){
            if(resp.length == 0){
                PlayerSearch.results = [];
                return;
            }
            PlayerSearch.results = resp;
        }).catch(function(error){
            PlayerSearch.results = [];
            console.log("[PCN]" + error.code);
            console.log(error.message);
        });
    },
}

module.exports = PlayerSearch;