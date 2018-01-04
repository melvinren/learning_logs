import React from 'react'

export default ({topics, onShow, onEdit, onDelete}) => (
    <ul>				
    {						
        topics && topics.length 
        ? topics.map( (topic,i) => (                
                <li key={topic._id}>
                    <span onClick={()=>onShow(topic)}>{topic.text}</span>                    
                    <button onClick={()=>onDelete(topic._id)}>DELETE</button>
                </li>
            ))
        : <li>No topics have been added yet.</li>					
    }
    </ul>
)