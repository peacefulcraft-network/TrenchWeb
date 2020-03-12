import m from 'mithril';
import AppConfig from '../../AppConfig.js';

/**
 * Model that handles data for a player's statisitical profile
 */
export default {
  results: null,
  loadResults: function (params) {
    // Verify we have a valid uuid
    if(params == null || typeof params == 'undefined'){ return; }
    if(params.length != 32){ return; }
        
    // Ask for the data
    return m.request({
      method: 'GET',
      url:AppConfig.api_endpoint + '?action=profile&params=' + params,
      withCredentials: false
    })
        
    // Process the answer
      .then( (resp) => {
        if(resp == null || resp.length == 0){
          this.results = null;
          return;
        }
        this.results = resp;
        console.log(resp);
      })
        
    // Report if something goes wrong
    // TODO: Better (any) reporting to non-technical users
      .catch( (error) => {
        this.results = null;
        console.log('[PCN]' + error.code);
        console.log(error.message);
      });
  }
};