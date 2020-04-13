import m from 'mithril';

import EventDetails from '@/components/views/EventDetails';
import TopTenKDR from '@/components/models/TopTenKDR.js';

export default {
  view: () => {
    return m('section', {class:'home'}, [
      m(EventDetails),
      m(TopTenKDR),
      /*m('p',
        'TrenchPvP is a custom, TDM, PvP Minigame. On this website you can view your'+
        ' game statistics. We know that many of the statistics are not accurate right now'+
        ' but we\'re working to fix that. This website is at an equal state of development' +
        ' and we will continue to add functionality over the next several months.'
      ),*/
    ]
    );
  }
};