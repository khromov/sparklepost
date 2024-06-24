import { writable } from 'svelte/store';

export const tabs = ['For you', 'Following', 'Svelte Society'];
export const activeTabIndex = writable(0);