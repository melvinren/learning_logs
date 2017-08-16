import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom'; 
import Topic from './Topic';

class Topics extends Component{
	constructor(props){
		super(props)

		this.state = {
			topics: [
				{ "id":1, "name": "react" },
				{ "id":2, "name": "vue" }
			]
		}
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
									<li key={topic.id}><Link to={`${this.props.match.url}/${topic.id}`}>{topic.name}</Link></li>
								))
							: <li>No topics have been added yet.</li>					
						}
						</ul>
					</div>
				)} />
				<Route path={`${this.props.match.url}/new_topic`} component={newTopic} />
				<Route path={`${this.props.match.url}/:topicId(\\d+)`} component={Topic} />				
			</div>
			);
	}
}

const newTopic = ()=>(
	<div>
		<input /><button>Add</button>
	</div>
	);

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