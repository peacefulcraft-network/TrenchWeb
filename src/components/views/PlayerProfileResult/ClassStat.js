import m from  'mithril';

/**
 * Stat display, formats icon, data, and label to return neatly
 */
export default {
    
  view: (vnode) => {
    // Assign arguments for clarity
    let fai = vnode.attrs.pair.fai;         // Font Awesome icon
    let key = vnode.attrs.pair.key;         // Key for the data
    let display = vnode.attrs.pair.display; // Label
    let player = vnode.attrs.player;        // Player data

    return m('div',{class:'class_stat_entry'}, 
      [
        m('i', {class:fai, style:'color:white;'}),
        m('font', {class:'class_stat_entry_value'}, ' ' + player[key]),
        m('font',{}, ' ' + display)
      ]
    );
  }

};