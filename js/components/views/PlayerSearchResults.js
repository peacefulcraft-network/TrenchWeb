var m = require("mithril");
var AppConfig = require("../../AppConfig.js");
var PlayerSearch = require("../models/PlayerSearch.js");

var PlayerSearchResults = {
    oninit: (vnode) => { PlayerSearch.loadResults(vnode.attrs.searchParams);},
    resultsBody: function(vnodes){
        return m("section.PlayerSearchResults", vnodes);
    },
    resultsRow: function(player){
        return m("div.PlayerSearchResultsRow",
            m("img.PlayerSearchResultsHead", {
                src: AppConfig.player_head_endpoint + player.uuid + "/60.png"
            }),
            m("div.PlayerSearchResultsInfoWrapper",
                m("div.PlayerSearchResultsPlayerMeta",
                    m("span.PlayerSearchResultPlayerName", player.username),
                    m("span.PlayerSearchResultPlayerClass", player.favorite_class)
                ),
                m("div.PlayerSearchResultsPlayerQuickStats",
                    m("font.PlayerSearchResultsPlayerQuickStat","Kills: ",
                        m("font.PlayerSearchResultsPlayerQuickStatValue", player.player_kills)
                    ),
                    m("font.PlayerSearchResultsPlayerQuickStat","Deaths: ",
                        m("font.PlayerSearchResultsPlayerQuickStatValue", player.player_deaths)
                    ),
                    m("font.PlayerSearchResultsPlayerQuickStat","Ratio: ", 
                        m("font.PlayerSearchResultsPlayerQuickStatValue",
                            (player.player_kills / player.player_deaths).toFixed(2)
                        )
                    )
                )
            )
        );
    },
    view: function() {
        if(PlayerSearch.results.length == 0){
            return this.resultsBody([m("h2", "No Results")]);
        }

        let vnodes = [];
        PlayerSearch.results.forEach( (player) =>{
            vnodes.push(
                m(m.route.Link, {
                    href:"/profile/" + player.uuid,
                    style:"text-decoration: none;"
                }, this.resultsRow(player))
            );
        });

        return this.resultsBody(vnodes);
    }
}

module.exports = PlayerSearchResults;