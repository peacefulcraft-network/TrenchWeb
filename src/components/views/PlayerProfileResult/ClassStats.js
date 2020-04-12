import m from 'mithril';

import AbilityMap from '@/AbilityMap.json';

import Select from '@/components/elements/Select';
import ClassStat from './ClassStat';

/**
 * Box for displaying class-specific statistics
 *   - Maps from AbilityMap object that provies keys, labels, etc
 */
export default {

  // Get the abilities we'll need to display
  oninit: (vnode) => {
    vnode.state.classStatDisplay = Object.keys(AbilityMap)[0];
  },

  view: (vnode) => {

    return m('div', {class: 'class_stats'},
      [

        // Navigation area to choose which class info user wants
        m(Select, {
          opts: Object.keys(AbilityMap),
          value: vnode.state.classStatDisplay,
          onchange: (e) => { vnode.state.classStatDisplay = e.target.value; }
        }),

        // Statistics Display Area
        m('div', {class:'class_stat_wrapper'},
          AbilityMap[vnode.state.classStatDisplay].map( (pair) =>{
            return m(ClassStat,{player:vnode.attrs.player, pair:pair});
          })
        )
      ]
    );

  }

};