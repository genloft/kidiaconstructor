import { writable } from 'svelte/store';

const state = writable({ val: 0, logs: [] });

const logEvent = (msg) => {
    state.update(s => ({ ...s, logs: [...s.logs, msg] }));
};

state.update(s => {
    logEvent('A log inside update');
    return { ...s, val: 1 };
});

state.subscribe(s => console.log(JSON.stringify(s)))();
