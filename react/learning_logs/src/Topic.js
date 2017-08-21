import React, { Component } from 'react';

class Topic extends Component{
	constructor(props){
		super(props);
		this.state = {
			topic: null
		}
	}

	componentWillMount(){
		fetch('http://localhost:11111/api/topics/get',{
			method: 'POST',
			headers: {
			    'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({ _id: this.props.match.params.topicId })
		}).then((response)=>{
			return response.json()
		}).then((topics)=>{
			const topic = topics && topics[0];
			this.setState({topic:topic});
		});
	}

	render(){
		if(!this.state.topic){
			return (<div>Donot have this topic.</div>)
		}
		return (
			<div>
				<p key={this.state.topic._id}><strong>{this.state.topic.text}</strong></p>
				<ul>
				{					
					this.state.topic.entries && this.state.topic.entries.length
						? this.state.topic.entries.map(entry => (
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