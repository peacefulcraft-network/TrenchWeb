import m from 'mithril';

import '@/css/event_details.css';

export default {
  view: () => {
    return m('.event_details', [
      m('h1', 'K/D Competition!'),
      m('p', 'Starting Monday (4/13) Trench K/D ratios will be temporarily reset. Compete against your friends for the week and see who can get the highest K/D on the server. On Saturday (4/18) the staff will search and find the top 3. Results and rewards will be released on Sunday!')
    ]);
  },
};