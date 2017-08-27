import React, { Component } from 'react'
import moment from 'moment'

class NewEntry extends Component {
	constructor(props){
		super(props)
		this.state = { text: '' }
		console.log(props);
		this.valueChange = this.valueChange.bind(this);
		this.addEntry = this.addEntry.bind(this);
	}

	valueChange(e){
		this.setState({text: e.target.value});
	}

	addEntry(){
		if(!this.state.text){
			return;
		}

		var newentry = { text: this.state.text, date: moment().format("YYYY-MM-DD HH:mm:ss")}
		this.props.topic.entries = this.props.topic.entries || []
		this.props.topic.entries.push(newentry);

		fetch('/api/topic/',{
			method: 'POST',
			headers: {
			    'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(this.props.topic)
		}).then((response)=>{
			return response.json()
		}).then((json)=>{
			console.log(json);
			// if(json.topics){
			// 	this.props.updateTopics && this.props.updateTopics(json.topics);
			// }
			this.props.history.goBack();
		});			
	}

	render(){		
		return (
			<div>
				<textarea value={this.state.vlaue} onChange={this.valueChange} cols="50" rows="5"></textarea>
				<button onClick = {this.addEntry}>Add new entry</button>
			</div>
		);
	}
}

export default NewEntry;