import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'; 
import NewEntry from './addentry';
import { updateTopic, selectTopic } from '../actions';
import { connect } from 'react-redux';

class Topic extends Component{
	constructor(props){
		super(props);

        this.inputText = null
		this.updateTopic = this.updateTopic.bind(this);
    }
    
    componentWillMount(){        
        this.props.dispatch(selectTopic(this.props.topics, this.props.match.params.topicId))
	}

	updateTopic(){
		if(!this.inputText || !this.inputText.value){
			return;
		}
        const { dispatch, topic } = this.props
        topic.text = this.inputText.value
        dispatch(updateTopic(topic))
	}

	render(){		
		const add = this.props.add || false;
		const edit = this.props.edit || false;
        
        const { topic, match } = this.props
        
		const btnTxt = add ? "Add" : "Save";
		if(add || edit){
			return (
				<div>
					<input type="text" ref={input=> this.inputText = input } /><button onClick={this.updateTopic}>{btnTxt}</button>
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
					<Link to={`${match.url}/new_entry`} >Add new entry</Link>
					</div>
				)} />				
				<Route path={`${match.url}/new_entry`}  render = {(props)=> <NewEntry {...props} topic = {topic} />} />
			</div>
			);
		
	}
}

const mapStateToProps = state =>{
    const { topic } = state.topicApp
    return { topic }
}

export default connect(mapStateToProps)(Topic)