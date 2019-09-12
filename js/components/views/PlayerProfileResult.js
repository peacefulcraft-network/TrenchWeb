var m = require("mithril");
var AppConfig = require("../../AppConfig.js");


var PlayerProfile = require("../models/PlayerProfile.js");

var AbilityMap = require("../../AbilityMap.json");
var ClassStats = require("./PlayerProfileResult/ClassStats.js");
var CombatLogTable = require("./PlayerProfileResult/CombatLogTable.js");

var PlayerProfileResult = {
    // XHR request, triggers auto redraw when user's stats have been retrieved
    oninit: (vnode) => { PlayerProfile.loadResults(vnode.attrs.uuid); },
    resultsBody: function(vnodes){
        return m("section.PlayerSearchResults", vnodes);
    },
    view: (vnode) => {
        //Make sure server gives us data
        if(PlayerProfile.results == null){
            return PlayerProfileResult.resultsBody([m("h2", "No results")]);
        }

        // Less typing later on when we need this
        let player = PlayerProfile.results[0];

        return m("div", {class: "profile"},
            [
                m("div", {class: "profile_header"},
                    [
                        // Bust of the player
                        // TODO: Make this it's own view component
                        m("div", {class:"profile_header_left"},
                            m("img.PlayerSearchResultsHead", {
                                src: AppConfig.player_bust_endpoint + player.uuid + "/240.png"
                            })
                        ),

                        // Big stats on the right
                        // TODO: Make this it's own view component
                        m("div", {class:"profile_header_right"},
                            [
                                m("span", {class: "profile_header_stat_wrapper"},
                                    [ 
                                        m("i", {class:"fas fa-bullseye", style:"color:red;"}),
                                        m("font", " " + player.player_kills),
                                        m("font", {class:"profile_header_stat_label"}, " Kills")
                                    ]
                                ),
                                m("span", {class: "profile_header_stat_wrapper"},
                                    [ 
                                        m("i", {class:"fas fa-skull", style:"color:white;"}),
                                        m("font", " " + player.player_deaths),
                                        m("font", {class:"profile_header_stat_label"}, " Deaths")
                                    ]
                                ),
                                m("span", {class: "profile_header_stat_wrapper"},
                                    [ 
                                        m("i", {class:"fas fa-heart-broken", style:"color:orange;"}),
                                        m("font", " " + player.player_damage),
                                        m("font", {class:"profile_header_stat_label"}, " Damage")
                                    ]
                                )
                            ]
                        ),
                    ]
                ),

                // Lower stats area, pass userdata in
                m(ClassStats, {player:player}),

                // Combat log
                // Not implemented yet
                m(CombatLogTable)
            ]
        );
    }
}

module.exports = PlayerProfileResult;