import { createStore, combineReducers } from 'redux';
import userLoginReducer from '../reducers/userLoginReducer';
const rootReducer = combineReducers(
    {
        user: userLoginReducer,
    }
);
const configureStore = () => {
    return createStore(rootReducer);
};
export default configureStore;
