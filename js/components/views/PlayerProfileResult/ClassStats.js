var m = require("mithril");

var AbilityMap = require("../../../AbilityMap.json");

var ClassStat = require("./ClassStat");

/**
 * Box for displaying class-specific statistics
 *   - Maps from AbilityMap object that provies keys, labels, etc
 */
var ClassStats = {

    // Get the abilities we'll need to display
    oninit: () => {
        this.classStatDisplay = Object.keys(AbilityMap)[0];
    },

    view: (vnode) => {

        return m("div", {class: "class_stats"},
            [

                // Navigation area to choose which class info user wants
                m("div", {class:"class_stat_navigation"},
                    Object.keys(AbilityMap).map(
                        (navText) => {
                            return m("span",{
                                    onclick: (e) => { this.classStatDisplay = e.target.innerHTML; }
                                },
                                navText
                            );
                        }
                    )
                ),

                // Statistics Display Area
                m("div", {class:"class_stat_wrapper"},
                    AbilityMap[this.classStatDisplay].map( (pair) =>{
                        return m(ClassStat,{player:vnode.attrs.player, pair:pair});
                    })
                )
            ]
        );

    }

};

module.exports = ClassStats;