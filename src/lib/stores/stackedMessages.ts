import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const componentsStore: Writable<Array<any>> = writable([]);

componentsStore.subscribe((components) => {
    // console.log('componentsStore:', components);
});