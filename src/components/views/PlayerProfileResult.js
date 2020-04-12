import m from 'mithril';
import AppConfig from '../../AppConfig.js';


import PlayerProfile from '../models/PlayerProfile.js';

import ClassStats from './PlayerProfileResult/ClassStats.js';
import CombatLogTable from './PlayerProfileResult/CombatLogTable.js';

export default {
  // XHR request, triggers auto redraw when user's stats have been retrieved
  oninit: (vnode) => { PlayerProfile.loadResults(vnode.attrs.uuid); },

  resultsBody: function(vnodes){
    return m('section.PlayerSearchResults', vnodes);
  },

  view: function() {
    //Make sure server gives us data
    if(PlayerProfile.results == null){
      return this.resultsBody([m('h2', 'No results')]);
    }

    // Less typing later on when we need this
    let player = PlayerProfile.results[0];

    return m('div', {class: 'profile'},
      [
        m('div', {class: 'profile_header'},
          [
            // Bust of the player
            // TODO: Make this it's own view component
            m('div', {class:'profile_header_left'},
              m('img.PlayerSearchResultsHead', {
                src: AppConfig.player_bust_endpoint + player.uuid + '/240.png'
              })
            ),

            // Big stats on the right
            // TODO: Make this it's own view component
            m('div', {class:'profile_header_right'},
              [
                m('span', {class: 'profile_header_stat_wrapper'},
                  [ 
                    m('i', {class:'fas fa-bullseye', style:'color:red;'}),
                    m('font', ' ' + player.player_kills),
                    m('font', {class:'profile_header_stat_label'}, ' Kills')
                  ]
                ),
                m('span', {class: 'profile_header_stat_wrapper'},
                  [ 
                    m('i', {class:'fas fa-skull', style:'color:#CCC;'}),
                    m('font', ' ' + player.player_deaths),
                    m('font', {class:'profile_header_stat_label'}, ' Deaths')
                  ]
                ),
                m('span', {class: 'profile_header_stat_wrapper'},
                  [ 
                    m('i', {class:'fas fa-heart-broken', style:'color:orange;'}),
                    m('font', ' ' + player.player_damage),
                    m('font', {class:'profile_header_stat_label'}, ' Damage')
                  ]
                )
              ]
            ),
          ]
        ),

        // Lower stats area, pass userdata in
        m(ClassStats, {player:player}),
      ]
    );
  }
};