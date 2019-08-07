//  Core
var m = require("mithril");
var Base = require("./Base.js");

//  Models
var PlayerSearch = require("./components/models/PlayerSearch.js");
var PlayerProfile = require("./components/models/PlayerProfile.js");

//  Views
var PlayerSearchResults = require("./components/views/PlayerSearchResults.js");
var PlayerProfileResult = require("./components/views/PlayerProfileResult.js");

m.route(document.body, "/home",{
    "/home":{
        render: function(){
            return m(Base, {docBody: m("h2","Hello!") });
        }
    },
    "/search/:params":{
        render: function(vnode){
            if(PlayerSearch.params == null)
                PlayerSearch.setParams(vnode.attrs.params);
            
            if(PlayerSearch.results.length == 0){
                PlayerSearch.loadResults();
            }

            return m(Base, { docBody:m(PlayerSearchResults) });
        }
    },
    "/profile/:uuid":{
        render: function(vnode){
            return m(Base, {docBody: m("h2","Player Profile! " + vnode.attrs.uuid) });
        }
    }
});