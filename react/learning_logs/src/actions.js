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
export const CLEAR_TOPICS = "CLEAR_TOPICS"

export const UPDATE_TOPIC = "UPDATE_TOPIC"

export const SHOW_FULL_LOADING = "SHOW_FULL_LOADING"
export const HIDE_FULL_LOADING = "HIDE_FULL_LOADING"

function receiveTopics(data) {
    return { type: RECEIVE_TOPICS, topics: data.topics }
}

// thunk
function _fetchTopics(filter={pageIndex:1}) {
    let { pageIndex } = filter
    pageIndex = pageIndex || 1    
    return dispatch => {        
        return fetch(`/api/topics/get/${pageIndex}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((response)=>{
            return response.json()
        }).then(json => dispatch(receiveTopics(json)))    
        .catch(() => {
            // err handle
        })
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
    return dispatch => {
        dispatch(showFullLoading())
        return fetch('/api/topic',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ text: topic })
        }).then((response)=>{
            return response.json()
        }).then((json)=>{
            dispatch(hideFullLoading())
            dispatch({ type: ADD_TOPIC, topics: json.topics})           
        }).catch(() => {
            dispatch(hideFullLoading())	
        })
    }
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
    return dispatch =>{
        dispatch(showFullLoading())
        return fetch('/api/topic/delete',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({_id: topicId})
        }).then((response)=>{
            return response.json()
        }).then((json)=>{
            dispatch(hideFullLoading())
            return dispatch({ type: DELETE_TOPIC, success:json.success, topicId })
        }).catch(() => {
            dispatch(hideFullLoading())	
        })
    }
}

export function deleteTopic(id) {
    return (dispatch, getState) => {
        return dispatch(_deleteTopic(id))
    }
}

export function selectTopic(topics, topicId){
    return { type: SELECT_TOPIC, topics, topicId }
}

function _updateTopic(topic){
    return dispatch => {
        dispatch(showFullLoading())
        return fetch('/api/topic/',{
			method: 'POST',
			headers: {
			    'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(topic)
		}).then((response)=>{
			return response.json()
		}).then((json)=>{		
            dispatch(hideFullLoading())	
            return dispatch({ type: UPDATE_TOPIC, success:json.success, topic: json.topics && json.topics[0] })
        }).catch(() => {
            dispatch(hideFullLoading())	
        })
    }
}
export function updateTopic(topic){
    return (dispatch, getState) => {
        return dispatch(_updateTopic(topic))
    }
}

export function clearTopics(){
    return { type: CLEAR_TOPICS }
}

export function showFullLoading(){
    return { type: SHOW_FULL_LOADING }
}
export function hideFullLoading(){
    return { type: HIDE_FULL_LOADING }
}