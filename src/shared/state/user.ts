import { atom, selector, } from 'recoil';
import { User } from 'helpers';

export const userAtom = atom<User | null>({
    key: 'user',
    default: null,
})

export const usernameAtom = selector({
    key: 'username',
    get: ({ get }) => {
        return get(userAtom)?.username;
    }
})