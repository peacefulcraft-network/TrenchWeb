import m from 'mithril';
import AppConfig from '@/AppConfig';

import '@/css/top_ten_kdr.css';

export default {
  results: [],
  req: null,
  oninit: (v) => {
    if (v.state.req === null) {
      v.state.req = m.request({
        method: 'GET',
        url: AppConfig.api_endpoint + '?action=top10kills',
        withCredentials: false,
      }).then((resp) => {
        if(resp.length > 0) {
          v.state.results = resp;
        }
      });
    }
  },

  view: (v) => {
    let results = [
      m('span.title', 'Username'),
      m('span.title', 'Kills'),
      m('span.title', 'Deaths'),
      m('span.title', 'KDR'),
    ];

    v.state.results.forEach((res) => {
      results.push(m('span', res.username));
      results.push(m('span', res.player_kills));
      results.push(m('span', res.player_deaths));
      results.push(m('span', res.kdr));
    });

    return m('.top_ten_kdr', [
      m('h1', 'Leaderboard'),
      m('.leaderboard', results),
    ]);
  },
};