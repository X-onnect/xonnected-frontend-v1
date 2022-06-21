import { atom } from 'recoil';

export const experimentAtom = atom({
    key: 'experiment',
    default: 'Initial',
})