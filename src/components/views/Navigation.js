import m from 'mithril';
import PlayerSearchBar from './PlayerSearchBar.js';

/**
 * Page Navigation section
 * Contains logo, search bar, and home link
 */
export default {

  // TODO: this is kindof uneccessary and could just be static without the init
  oninit: function() { 
    this.links = [
      {display:'Home', path:'/home'}, 
    ];
  },

  view: function(vnode) {
    return m('navigation', {},
      // Map the links
      m('.navLinks', this.links.map(function(link){
        return m(m.route.Link, {href:link.path}, link.display);
      })),
            
      // Pass params to the serach bar
      m(PlayerSearchBar, {searchParams: vnode.attrs.searchParams}),

      m('a.logo', { href: 'https://www.peacefulcraft.net' },
        m('img.logo', {
          src:'https://www.peacefulcraft.net/assets/logo-aglqhi2l.png', 
          width:40, 
          height:40
        })
      ),
    );
  }
};