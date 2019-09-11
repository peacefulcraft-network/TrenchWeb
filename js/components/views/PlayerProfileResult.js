var m = require("mithril");
var AppConfig = require("../../AppConfig.js");
var PlayerProfile = require("../models/PlayerProfile.js");

var PlayerProfileResult = {
    oninit: (vnode) => { PlayerProfile.loadResults(vnode.attrs.uuid); },
    resultsBody: function(vnodes){
        return m("section.PlayerSearchResults", vnodes);
    },
    view: function(vnode) {
        if(PlayerProfile.results == null){
            return this.resultsBody([m("h2", "No results")]);
        }

        let player = PlayerProfile.results[0];

        return m("div",
            [
                m("div", {class: "profile_header"},
                    [
                        // Bust of the player
                        m("div", {class:"profile_header_left"},
                            m("img.PlayerSearchResultsHead", {
                                src: AppConfig.player_bust_endpoint + player.uuid + "/240.png"
                            })
                        ),

                        // Big stats on the right
                        m("div", {class:"profile_header_right"},
                            [
                                m("span", {class: "profile_header_stat_wrapper"},
                                    [ 
                                        m("font", player.player_kills),
                                        m("font", {class:"profile_header_stat_label"}, " Kills")
                                    ]
                                ),
                                m("span", {class: "profile_header_stat_wrapper"},
                                    [ 
                                        m("font", player.player_deaths),
                                        m("font", {class:"profile_header_stat_label"}, " Deaths")
                                    ]
                                ),
                                m("span", {class: "profile_header_stat_wrapper"},
                                    [ 
                                        m("font", player.player_damage),
                                        m("font", {class:"profile_header_stat_label"}, " Damage")
                                    ]
                                )
                            ]
                        )
                    ]
                )
            ]
        );
    }
}

module.exports = PlayerProfileResult;