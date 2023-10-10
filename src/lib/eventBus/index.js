/* eslint-disable */

const eventBus = {
  on(event, callback) {
    window.addEventListener(event, (e) => callback(e.detail));
  },
  dispatch(event, data) {
    window.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event, callback) {
    window.removeEventListener(event, callback);
  },
};

export default eventBus;
