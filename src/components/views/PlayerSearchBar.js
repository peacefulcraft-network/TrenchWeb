import m from 'mithril';
import PlayerSearch from '../models/PlayerSearch.js';
/**
 * A input[text] box with a button that routes to the search page
 */
export default {
  fireSearch: function(params) { 
    m.route.set('/search/' + params);
    PlayerSearch.loadResults(params);  
  },

  view: function(vnode) {
    return m('span',
      m('input.playerSearch[type=text]', {
        oninput: (e) => { 
          this.fireSearch(e.target.value);
        },
        value:vnode.attrs.searchParams
      }),
      m('input.playerSearch[type=button]', {
        value:'Search', 
        onclick: () => {
          // oninput should have set searchParams and passed it through
          this.fireSearch(vnode.attrs.searchParams);
        },
      })
    );
  }
};