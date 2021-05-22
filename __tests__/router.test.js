/**
 * @jest-environment jsdom
 */

import {pushToHistory} from '../scripts/router.js';

describe( 'PushTests', () => {
    test('one Push', () => {
        let len = history.length;
        pushToHistory('settings', '');
        expect(history.length).toBe(len+1);
    });

    test('settings', () => {
        let len = history.length;
        pushToHistory('settings', '');
        expect(history.state.page).toBe('settings');
    });

    test('default', () => {
        let len = history.length;
        pushToHistory('', '');
        expect(history.state.page).toBeUndefined();
    });

    test('entry', () => {
        let len = history.length;
        pushToHistory('entry', 1);
        expect(history.state.page).toBe('entry1');
    });
});