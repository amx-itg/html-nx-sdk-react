/* eslint-disable */

import eventBus from '../lib/eventBus';

export const HcBroadCastService = {
  button: {
    channel: function (port, channel, state) {
      eventBus.dispatch('channel.event', {
        event: 'state',
        port,
        channel,
        state,
      });
    },
    text: function (port, channel, newText) {
      //console.log('Text,',port,channel,newText);
      eventBus.dispatch('channel.event', {
        event: 'text',
        port,
        channel,
        newText,
      });
    },
    enable: function (port, channel, state) {
      eventBus.dispatch('channel.event', {
        event: 'enable',
        port,
        channel,
        state,
      });
    },
    show: function (port, channel, state) {
      eventBus.dispatch('channel.event', {
        event: 'show',
        port,
        channel,
        state,
      });
    },
  },
  level: {
    level: function (port, level, value) {
      eventBus.dispatch('level.event', { port, level, value });
    },
  },
  log: function () {
    eventBus.dispatch('logUpdates');
  },
  auth: function (opts) {
    eventBus.dispatch('hcontrol.auth', opts);
  },
  page: function (opts) {
    eventBus.dispatch('page.event', opts);
  },
};
