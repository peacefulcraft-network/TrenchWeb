//  Core
import m from 'mithril';
import Base from './Base.js';

//  Views
import Home from './components/views/Home.js';
import PlayerSearchResults from './components/views/PlayerSearchResults.js';
import PlayerProfileResult from './components/views/PlayerProfileResult.js';

import '@/css/main.css';

m.route(document.body, '/home',{
  '/home':{
    render: function(){
      return m(Base, {docBody: m(Home) });
    }
  },
  '/search/:searchParams':{
    render: function(vnode){
      // Pass searchParams first for nav, second for results
      return m(Base, { 
        searchParams: vnode.attrs.searchParams, 
        docBody:m(PlayerSearchResults, {searchParams : vnode.attrs.searchParams}) 
      });
    }
  },
  '/profile/:uuid':{
    render: function(vnode){
      // Pass player uuid for searching
      return m(Base, {
        docBody: m(PlayerProfileResult, {uuid: vnode.attrs.uuid}) 
      });
    }
  }
});
