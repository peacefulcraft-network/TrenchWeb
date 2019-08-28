m = require("mithril");
PlayerSearch = require("../models/PlayerSearch.js");
/**
 * A input[text] box with a button that routes to the search page
 */
var PlayerSearchBar = {
    fireSearch: function() { m.route.set("/search/" + PlayerSearch.params); },
    view: function(vnode){
        return m("span",
            m("input.playerSearch[type=text]", {
                oninput: function(e){ 
                    m.route.set("/search/" + e.target.value);
                },
                value:vnode.attrs.searchParams
            }),
            m("input.playerSearch[type=button]", {
                value:"Search", 
                onclick: function() {
                    PlayerSearchBar.fireSearch();
                },
            })
        );
    }
}

module.exports = PlayerSearchBar;