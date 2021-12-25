import { combineReducers } from "redux";
import newsReducer from './news'


//store

const rootReducer = combineReducers({
    news: newsReducer
})

export default rootReducer;