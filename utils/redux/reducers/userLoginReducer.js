import { CURRENT_USER } from '../constants';
const initialState = {
    user: {}
};
const userLoginReducer = (state = initialState, action) => {
    switch(action.type) {
        case CURRENT_USER:
            return {
                ...state,
                user:action.payload
            };
        default:
            return state;
    }
};
export default userLoginReducer;
