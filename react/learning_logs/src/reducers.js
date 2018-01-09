import { combineReducers } from 'redux'
import {
    ADD_TOPIC,
    EDIT_TOPIC,
    DELETE_TOPIC,
    SELECT_TOPIC,
    RECEIVE_TOPICS,
    NEW_TOPIC,
    UPDATE_TOPIC,
    CLEAR_TOPICS,
    SHOW_FULL_LOADING,
    HIDE_FULL_LOADING
} from './actions'

function topics(state =  [], action) {
    switch(action.type){        
        case ADD_TOPIC:
            if(action.topics){
                return [                    
                    action.topics[0],
                    ...state
                ]
            }else{
                return state
            }
        case EDIT_TOPIC:
            return [
                ...state,
                {
                    topic: action.topic,
                    completed: false
                }
            ]
        case DELETE_TOPIC:            
            if(action.success === 1){
                const topics = state.slice(0)                
                const topic_index = topics.findIndex(t=> t._id === action.topicId)
                topics.splice(topic_index, 1);
                return topics
            } else {
                return state
            }
        case UPDATE_TOPIC:
            if(action.success === 1 && action.topic){
                const topics = state.slice(0)                
                topics.unshift(action.topic)
                return topics
            } else {
                return state
            }
        case RECEIVE_TOPICS:
            return state.concat(action.topics)
        case CLEAR_TOPICS:
            return []
        default:
            return state
    }
}

function hasMore(state = true, action){
    switch(action.type){
        case RECEIVE_TOPICS:
            return (action.topics && action.topics.length > 0) || false
        default:
            return state
    }
}

function topic(state = {}, action){
    switch(action.type){
        case SELECT_TOPIC:
            if(action.topicId){
                return action.topics.find(t=> t._id === action.topicId) || null
            }else{
                return  { _id: '', text: '' }
            }       
        case UPDATE_TOPIC:
            if(action.success === 1){
                if(action.topic){
                    return Object.assign({},action.topic, { saved: true })
                }                
                return { ...state, saved: true }
            } else {
                return state
            }            
        default:
            return state
    }
}

function newtopic(state = '', action){
    switch(action.type){
        case NEW_TOPIC:
            return action.text
        default:
            return state
    }
}

function fullloading(state = false, action){
    switch(action.type){
        case SHOW_FULL_LOADING:
            return true
        case HIDE_FULL_LOADING:
            return false
        default:
            return state
    }
}

const topicApp = combineReducers({
    topics,
    topic,
    newtopic,
    hasMore,
    fullloading
})

export default topicApp