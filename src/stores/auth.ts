import { writable } from 'svelte/store';

export const authToken = writable<string | null>(null);
export const theme = writable<'light' | 'dark'>('light');
