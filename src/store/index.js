import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import ListReducer from './reducer/list_reducer'


const Reducers = combineReducers({
    ListReducer
})
const Store = createStore(Reducers, applyMiddleware(thunk))

export default Store;