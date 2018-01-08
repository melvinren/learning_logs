import React, { Component } from 'react'
import moment from 'moment'
import { updateTopic } from '../actions'
import { connect } from 'react-redux'

class NewEntry extends Component {
	constructor(props){
        super(props)
        this.textarea = null
		this.addEntry = this.addEntry.bind(this);
	}

	addEntry(){
		if(!this.textarea || !this.textarea.value){
			return;
		}

		const newentry = { text: this.textarea.value, date: moment().format("YYYY-MM-DD HH:mm:ss")}
		this.props.topic.entries = this.props.topic.entries || []
		this.props.topic.entries.push(newentry);

		this.props.dispatch(updateTopic(this.props.topic)).then(()=>this.props.history.goBack())
	}

	render(){		
		return (
			<div>
				<textarea ref={ textarea => this.textarea = textarea } cols="50" rows="5"></textarea>
				<button onClick = {this.addEntry}>Add new entry</button>
			</div>
		);
	}
}

export default connect()(NewEntry);