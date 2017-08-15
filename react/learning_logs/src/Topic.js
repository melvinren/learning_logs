import React, { Component } from 'react';

class Topic extends Component{
	render(){
		const topic = { 
			id: this.props.match.params.topicId, 
			name: "fake topic", 
			entries: [
				{
					id:1,
					date: new Date().toString(),
					text: 'lajsdflasdla'
				},
				{
					id:2,
					date: new Date().toString(),
					text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
				}
			]
		}
		return (
			<div>
				<p key={topic.id}><strong>{topic.id}</strong> {topic.name}</p>
				<ul>
				{					
					topic.entries && topic.entries.length
						? topic.entries.map(entry => (
							<li key={entry.id}>
								<p>{entry.date}</p>
								<p>{entry.text}</p>
							</li>
							))
						: <li>No entry.</li>					
				}
				</ul>
			</div>
			);
	}
}

export default Topic;