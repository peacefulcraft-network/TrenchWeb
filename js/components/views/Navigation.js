var m = require("mithril");
var PlayerSearchBar = require("./PlayerSearchBar.js");

/**
 * Page Navigation section
 * Contains logo, search bar, and home link
 */
var Navigation = {

    // TODO: this is kindof uneccessary and could just be static without the init
    oninit: () =>{ 
        this.links = [
            {display:"Home", path:"/home"}, 
        ]
    },

    view: (vnode) => {
        return m("navigation", {},
            m("img.logo", {
                src:"https://www.peacefulcraft.net/assets/logo-aglqhi2l.png", 
                width:40, 
                height:40
            }),
            
            // Pass params to the serach bar
            m(PlayerSearchBar, {searchParams: vnode.attrs.searchParams}),

            // Map the links
            m(".navLinks", this.links.map(function(link){
                return(m(m.route.Link, {href:link.path}, link.display));
            }))
        );
    }
};

module.exports = Navigation;