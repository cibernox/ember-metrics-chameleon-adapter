import BaseAdapter from 'ember-metrics/metrics-adapters/base';
import canUseDOM from 'ember-metrics/utils/can-use-dom';
import Ember from 'ember';

const { testing } = Ember;

export default BaseAdapter.extend({
  toStringExtension() {
    return 'chameleon';
  },

  init() {
    let config = this.get('config');
    var methods = ["setup", "identify", "alias", "track", "set", "show", "on", "off", "custom", "help", "_data"];
    let chmln = {};
    this.chmln = chmln;
    chmln.accountToken = config.token;
    chmln.location = window.location.href.toString();
    methods.forEach(function(method) {
      let ary = [];
      chmln[method + "_a"] = ary;
      chmln[method] = function() {
        ary.push(arguments);
      };
    });
    if (!canUseDOM) {
      return;
    }
    window.chmln = this.chmln;
    if (testing) {
      return;
    }
    this._script = document.createElement("script");
    this._script.src = "https://fast.trychameleon.com/messo/"+config.token+"/messo.min.js";
    this._script.async = true;
    document.head.appendChild(this._script);
  },

  identify(options) {
    this.chmln.identify(options);
  },

  willDestroy() {
    if (canUseDOM) {
      if (this._script) {
        document.removeChild(this._script);
        this._script = null;
      }
      delete window.chmln;
    }
  }
});
