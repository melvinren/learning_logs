import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunkMiddleware from 'redux-thunk'
import topicApp from './reducers'

// import { createLogger } from 'redux-logger'
// const loggerMiddleware = createLogger()

const _routerMiddleware = routerMiddleware(createHistory())

export default function configureStore(preloadedState){
    return createStore(combineReducers({
            topicApp,
            router: routerReducer
        }),
        preloadedState, 
        applyMiddleware(_routerMiddleware, thunkMiddleware))
}