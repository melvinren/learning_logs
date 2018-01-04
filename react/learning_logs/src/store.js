import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import topicApp from './reducers'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState){
    return createStore(
        topicApp, 
        preloadedState, 
        applyMiddleware(thunkMiddleware, loggerMiddleware))
}