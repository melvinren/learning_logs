import { combineReducers } from 'redux'
import {
    ADD_TOPIC,
    EDIT_TOPIC,
    DELETE_TOPIC,
    SELECT_TOPIC,
    RECEIVE_TOPICS,
    NEW_TOPIC
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
        case RECEIVE_TOPICS:
            return action.topics;
        default:
            return state
    }
}

function topic(state = {}, action){
    switch(action.type){
        case SELECT_TOPIC:
            return action.topic
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

const topicApp = combineReducers({
    topics,
    topic,
    newtopic
})

export default topicApp