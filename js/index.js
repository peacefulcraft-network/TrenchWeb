//  Core
var m = require("mithril");
var Base = require("./Base.js");

//  Models
var PlayerSearch = require("./components/models/PlayerSearch.js");
var PlayerProfile = require("./components/models/PlayerProfile.js");

//  Views
var Home = require("./components/views/Home.js");
var PlayerSearchResults = require("./components/views/PlayerSearchResults.js");
var PlayerProfileResult = require("./components/views/PlayerProfileResult.js");

m.route(document.body, "/home",{
    "/home":{
        render: function(){
            return m(Base, {docBody: m(Home) });
        }
    },
    "/search/:searchParams":{
        render: function(vnode){
            //Pass searchParams first for nav, second for results
            return m(Base, { 
                searchParams: vnode.attrs.searchParams, 
                docBody:m(PlayerSearchResults, {searchParams : vnode.attrs.searchParams}) 
            });
        }
    },
    "/profile/:uuid":{
        render: function(vnode){
            
            if( (!PlayerProfile.getLoadStatus()) || PlayerProfile.getParams() != vnode.attrs.uuid){
                PlayerProfile.setParams(vnode.attrs.uuid);
                PlayerProfile.loadResults();
            }

            return m(Base, {docBody: m("h2","Player Profile! " + vnode.attrs.uuid) });
        }
    }
});