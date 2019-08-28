var m = require("mithril");
var PlayerSearchBar = require("./PlayerSearchBar.js");

var Navigation = {
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
            m(PlayerSearchBar, {searchParams: vnode.attrs.searchParams}),
            m(".navLinks", this.links.map(function(link){
                return(m(m.route.Link, {href:link.path}, link.display));
            }))
        );
    }
};

module.exports = Navigation;