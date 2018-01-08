import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { updateTopic, selectTopic } from '../actions'
import { connect } from 'react-redux'
import moment from 'moment'

class Topic extends Component{
	constructor(props){
		super(props)

        this.inputText = null
		this.updateTopic = this.updateTopic.bind(this)

		this.textarea = null
		this.addEntry = this.addEntry.bind(this);
    }
    
    componentWillMount(){        
		this.props.dispatch(selectTopic(this.props.topics, this.props.match.params.topicId))		
	}

	updateTopic(){
		if(!this.inputText || !this.inputText.value){
			return;
		}
        const { dispatch, topic, history } = this.props
        topic.text = this.inputText.value
        dispatch(updateTopic(topic)).then(()=> history.goBack())
	}

	addEntry(){
		if(!this.textarea || !this.textarea.value){
			return;
		}

		const newentry = { text: this.textarea.value, date: moment().format("YYYY-MM-DD HH:mm:ss")}
		const { topic, dispatch } = this.props
		topic.entries = topic.entries || []
		topic.entries.push(newentry)
		dispatch(updateTopic(topic)).then(()=>this.textarea.value="")
	}

	render(){		
		const add = this.props.add || false;
		const edit = this.props.edit || false;
        
        const { topic, match } = this.props
        
		const btnTxt = add ? "Add" : "Save";
		if(add || edit){
			return (
				<div>
					<input type="text" ref={input=> (this.inputText = input) && (add ? "" : input.value = topic.text) } /><button onClick={this.updateTopic}>{btnTxt}</button>
				</div>
			)
        }

		if(!topic){
			return (<div>Donot have this topic.</div>)
		}
		return (			
			<div>
				<p key={topic._id}><strong><Link to={match.url}>{topic.text}</Link></strong></p>
				<Route path={match.url} render = {()=>(
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
					<div>
						<textarea ref={ textarea => this.textarea = textarea } cols="50" rows="5"></textarea>
						<button onClick = {this.addEntry}>Add new entry</button>
					</div>
					</div>
				)} />
			</div>
			);
		
	}
}

const mapStateToProps = state =>{
    const { topic } = state.topicApp
    return { topic }
}

export default connect(mapStateToProps)(Topic)