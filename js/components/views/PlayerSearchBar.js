m = require("mithril");
PlayerSearch = require("../models/PlayerSearch.js");
/**
 * A input[text] box with a button that routes to the search page
 */
var PlayerSearchBar = {
    fireSearch: function(params) { 
        m.route.set("/search/" + params);
        PlayerSearch.loadResults(params);  
    },
    view: (vnode) => {
        return m("span",
            m("input.playerSearch[type=text]", {
                oninput: (e) => { 
                    PlayerSearchBar.fireSearch(e.target.value);
                },
                value:vnode.attrs.searchParams
            }),
            m("input.playerSearch[type=button]", {
                value:"Search", 
                onclick: () => {
                    //oninput should have set searchParams and passed it through
                    PlayerSearchBar.fireSearch(vnode.attrs.searchParams);
                },
            })
        );
    }
}

module.exports = PlayerSearchBar;