import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'; 
import NewEntry from './NewEntry';

class Topic extends Component{
	constructor(props){
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.updateTopic = this.updateTopic.bind(this);
		
		const defaultTopic =  { _id: '', text: '' };

		if(props.topics && props.topics.length && this.props.match.params.topicId){
			this.state = {
				topic : props.topics.find(t => t._id === this.props.match.params.topicId) || defaultTopic
			}
		}else{
			this.state = {
				topic: defaultTopic
			}
		}
	}

	handleChange(e) {
		let temp_topic = this.state.topic;
		temp_topic.text = e.target.value;
		this.setState({ topic: temp_topic });
	}
	updateTopic(){
		if(!this.state.topic.text){
			return;
		}
		fetch('/api/topic',{
			method: 'POST',
			headers: {
			    'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(this.state.topic)
		}).then((response)=>{
			return response.json()
		}).then((json)=>{
			console.log(json);
			if(json.topics){
				this.props.updateTopics && this.props.updateTopics(json.topics);
			}
			this.props.history.goBack();
		});		
	}

	render(){		
		const add = this.props.add || false;
		const edit = this.props.edit || false;
		
		const btnTxt = add ? "Add" : "Save";
		if(add || edit){
			return (
				<div>
					<input type="text" onChange={this.handleChange} value={this.state.topic.text}/><button onClick={this.updateTopic}>{btnTxt}</button>
				</div>
			)
		}

		if(!this.state.topic){
			return (<div>Donot have this topic.</div>)
		}
		return (			
			<div>
				<p key={this.state.topic._id}><strong>{this.state.topic.text}</strong></p>
				<Route exact path={this.props.match.url} render = {()=>(
					<div>
					<ul>
					{					
						this.state.topic.entries && this.state.topic.entries.length
							? this.state.topic.entries.map(entry => (
								<li key={entry.date}>
									<p>{entry.date}</p>
									<p>{entry.text}</p>
								</li>
								))
							: <li>No entry.</li>					
					}
					</ul>
					<Link to={`${this.props.match.url}/new_entry`} >Add new entry</Link>
					</div>
				)} />				
				<Route path={`${this.props.match.url}/new_entry`}  render = {(props)=> <NewEntry {...props} topic = {this.state.topic} />} />
			</div>
			);
		
	}
}

export default Topic;