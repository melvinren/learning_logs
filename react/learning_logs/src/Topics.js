import React, { Component } from 'react';
import 'whatwg-fetch';
// import PropTypes from 'prop-types';
import { Route, Link, Switch, Redirect } from 'react-router-dom'; 
import Topic from './Topic';

class Topics extends Component{
	constructor(props){
		super(props)

		this.state = {
			topics: []
		}
	}

	componentWillMount(){
		fetch('http://localhost:11111/api/topics/get',{
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

	render(){
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
									<li key={topic._id}><Link to={`${this.props.match.url}/${topic._id}`}>{topic.text}</Link></li>
								))
							: <li>No topics have been added yet.</li>					
						}
						</ul>
					</div>
				)} />
				<Switch>
					<Route path={`${this.props.match.url}/new_topic`} component={newTopic} />
					<Route path={`${this.props.match.url}/:topicId`} component={Topic} />			
				</Switch>
			</div>
			);	
	}
}

class newTopic extends Component{
	constructor(props){
		super(props);
		this.newTopic = this.newTopic.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = { text: ''}
	}
	render(){
		return (
			<div>
				<input onChange={this.handleChange} value={this.state.text}/><button onClick={this.newTopic}>Add</button>
			</div>
		);
	}
	handleChange(e) {
		this.setState({text: e.target.value});
	}
	newTopic(){
		if(!this.state.text){
			return;
		}
		fetch('http://localhost:11111/api/topic',{
			method: 'POST',
			headers: {
			    'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify({text: this.state.text})
		}).then((response)=>{
			return response.json()
		}).then((json)=>{
			console.log(json);
			// return <Redirect to={`${this.props.match.url.replace('/new_topic','')}`} ></Redirect>
		});		
	}
}

// class Topic extends Component{
// 	constructor(props){
// 		super(props);
// 		this.clickHandle = this.clickHandle.bind(this);
// 	}
// 	render(){
// 		return(
// 			<li onClick={this.clickHandle}><a href="#">{this.props.topic.name}</a></li>
// 		)
// 	}

// 	clickHandle(e){
// 		console.log(this.props.topic);
// 	}
// }
// Topic.PropTypes = {
// 	topic: PropTypes.object.isRequired,
// }

export default Topics;