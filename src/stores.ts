import { readable } from 'svelte/store';

export const easyMDEInstance = readable(null, function start(set) {

  set(5)
  return function stop() {};
});