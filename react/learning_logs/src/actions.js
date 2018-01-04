import 'whatwg-fetch';

/*
* action types
*/
export const ADD_TOPIC = "ADD_TOPIC"
export const NEW_TOPIC = "NEW_TOPIC"
export const EDIT_TOPIC = "EDIT_TOPIC"
export const DELETE_TOPIC = "DELETE_TOPIC"
export const SELECT_TOPIC = "SELECT_TOPIC"
export const REQUEST_TOPICS = "REQUEST_TOPICS"
export const RECEIVE_TOPICS = "RECEIVE_TOPICS"


function receiveTopics(data) {
    return { type: RECEIVE_TOPICS, topics: data.topics }
}

// thunk
function _fetchTopics(filter) {
    return dispatch => {        
        fetch('/api/topics/get',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((response)=>{
            return response.json()
        }).then(json => dispatch(receiveTopics(json)))
    }
}

export function fetchTopics(filter){
    return (dispatch, getState) => {
        //dispatch a thunk from thunk!
        return dispatch(_fetchTopics(filter))
    }
}

export function requestTopics(filter) {
    return { type: REQUEST_TOPICS, filter }
}

export function newTopic(text){
    return { type: NEW_TOPIC, text }
}

function _addTopic(topic){
    return dispatch =>
        fetch('/api/topic',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ text: topic })
        }).then((response)=>{
            return response.json()
        }).then((json)=>{
            dispatch({ type: ADD_TOPIC, topics: json.topics})           
        });		
}

export function addTopic(topic) {
    return (dispatch, getState) => {
        return dispatch(_addTopic(topic))
    }
}



export function editTopic(topic) {
    return { type: EDIT_TOPIC, topic }
}

function _deleteTopic(topicId){
    return dispatch => fetch('/api/topic/delete',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({_id: topicId})
    }).then((response)=>{
        return response.json()
    }).then((json)=>{
        dispatch({ type: DELETE_TOPIC, success:json.success, topicId })
    });
}

export function deleteTopic(id) {
    return (dispatch, getState) => {
        return dispatch(_deleteTopic(id))
    }
}

export function selectTopic(topic){
    return { type: SELECT_TOPIC, topic}
}