var m = require("mithril");
var Navigation = require("./components/views/Navigation.js");

var Base = {
    view: function(vnode){
        return [
            m(Navigation),
            m("section.mainbody", vnode.attrs.docBody)
        ]
    }
}

module.exports = Base;