import React, { Component } from 'react';
import 'whatwg-fetch';
// import PropTypes from 'prop-types';
import { Route, Link, Switch } from 'react-router-dom'; 
import Topic from './Topic';

class Topics extends Component{
	constructor(props){
		super(props)

		this.updateTopics = this.updateTopics.bind(this);
		this.deleteTopic = this.deleteTopic.bind(this);

		this.state = {
			topics: []
		}
	}

	componentWillMount(){
		fetch('/api/topics/get',{
			method: 'POST',
			headers: {
			    'Content-Type': 'application/json;charset=utf-8'
			}
		}).then((response)=>{
			return response.json()
		}).then((topics)=>{
			this.setState({topics:topics});
		});
	}

	updateTopics(topics){
		var temp_topics = this.state.topics;
		temp_topics = temp_topics.concat(topics);
		this.setState({topics: temp_topics});
	}

	deleteTopic(topicId){		
		fetch('/api/topic/delete',{
			method: 'POST',
			headers: {
			    'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({_id: topicId})
		}).then((response)=>{
			return response.json()
		}).then((json)=>{
			var temp_topics = this.state.topics;
			var topic_index = temp_topics.findIndex(t=> t._id === topicId)
			temp_topics.splice(topic_index, 1);
			this.setState({topics: temp_topics});
		});
	}

	render(){
		// console.log(this.props.match.url);
		return (
			<div>
				<h3>Topics</h3>				
				<Route exact path={this.props.match.url} render = {()=>(
					<div>
						<Link to={`${this.props.match.url}/new_topic`} >Add new topic</Link>
						<ul>				
						{						
							this.state.topics && this.state.topics.length 
							? this.state.topics.map(topic => (
									<li key={topic._id}>
										<Link to={`${this.props.match.url}/${topic._id}`}>{topic.text}</Link> 
										<Link to={`${this.props.match.url}/${topic._id}/edit`}>Edit</Link>
										<button onClick={ (e) => this.deleteTopic(topic._id) }>DELETE</button>
									</li>
								))
							: <li>No topics have been added yet.</li>					
						}
						</ul>
					</div>
				)} />
				<Switch>
					<Route path={`${this.props.match.url}/new_topic`} render = { (props) => <Topic {...props} topics = {this.state.topics} add={true} updateTopics = { this.updateTopics } /> }/>					
					<Route path={`${this.props.match.url}/:topicId/edit`} render = { (props) => <Topic {...props} topics = {this.state.topics} edit={true} /> } />			
					<Route path={`${this.props.match.url}/:topicId`} render = { (props) => <Topic {...props} topics = {this.state.topics}  /> } />	
				</Switch>
			</div>
			);	
	}
}

export default Topics;