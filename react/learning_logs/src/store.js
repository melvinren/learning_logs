import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import topicApp from './reducers'

const loggerMiddleware = createLogger()
const _routerMiddleware = routerMiddleware(createHistory())

export default function configureStore(preloadedState){
    return createStore(combineReducers({
            topicApp,
            router: routerReducer
        }),
        preloadedState, 
        applyMiddleware(_routerMiddleware, thunkMiddleware, loggerMiddleware))
}