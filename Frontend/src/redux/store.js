import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

const saveState = (state) => {
    try {
        const serialisedState = JSON.stringify(state);
        window.localStorage.setItem('app_state', serialisedState);
    } catch (error) {
        console.log(error);
    }
};

const loadState = () => {
    try {
        const serialisedState = window.localStorage.getItem('app_state');
        if (!serialisedState) return undefined;
        return JSON.parse(serialisedState);
    } catch (error) {
        console.log(error);
    }
};
const existedState = loadState();
const store = createStore(rootReducer, existedState);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;