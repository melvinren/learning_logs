import React, { Component } from 'react';
// import PropTypes from 'prop-types';

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
				<p>Topics</p>
				<ul>
				{
					this.state.topics.map(topic => (
						<li key={topic.id}><a href={`${topic.id}`}>{topic.name}</a></li>
					))
				}
				</ul>
			</div>
			);
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