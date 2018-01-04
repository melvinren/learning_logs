import React from 'react';

export default ({topic}) =>  (			
    <div>
        <p key={topic._id}><strong>{topic.text}</strong></p>        
        <div>
            <ul>
            {					
                topic.entries && topic.entries.length
                    ? topic.entries.map(entry => (
                        <li key={entry.date}>
                            <p>{entry.date}</p>
                            <p>{entry.text}</p>
                        </li>
                        ))
                    : <li>No entry.</li>					
            }
            </ul>
        </div>        
    </div>
    )