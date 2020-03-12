import m from 'mithril';
import Navigation from './components/views/Navigation.js';

/**
 * Page is split into two bits, the navigation section with search bar
 *  and display area where requested content is rendered
 */
export default {
  view: function(vnode){
    // Mount Navigation section, pass search params through to the search bar
    // Mount whichever "page" was specified by the requested route
    return [
      m(Navigation, {searchParams: vnode.attrs.searchParams}),
      m('section.mainbody', vnode.attrs.docBody)
    ];
  }
};