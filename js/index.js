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
    "/search/:searchParams":{
        render: function(vnode){
            //Trigger search based on url params
            if((!PlayerSearch.hasSearched) || PlayerSearch.getParams() != vnode.attrs.searchParams){
                PlayerSearch.setParams(vnode.attrs.searchParams);
                PlayerSearch.loadResults();
            }

            return m(Base, { 
                searchParams: vnode.attrs.searchParams, 
                docBody:m(PlayerSearchResults) 
            });
        }
    },
    "/profile/:uuid":{
        render: function(vnode){
            return m(Base, {docBody: m("h2","Player Profile! " + vnode.attrs.uuid) });
        }
    }
});