var m = require("mithril");
var Navigation = require("./components/views/Navigation.js");

var Base = {
    view: function(vnode){
        return [
            m(Navigation, {searchParams: vnode.attrs.searchParams}),
            m("section.mainbody", vnode.attrs.docBody)
        ]
    }
}

module.exports = Base;