import { CURRENT_USER } from '../constants';
export function userLogin(user) {
    return {
        type: CURRENT_USER,
        payload: user
    }
}
