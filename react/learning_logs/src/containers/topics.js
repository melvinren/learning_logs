import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTopics, deleteTopic,selectTopic, addTopic, newTopic } from '../actions'
import ComponentTopics from '../components/topics'
import ComponentTopic from '../components/topic'

class Topics extends Component{
	constructor(props){
        super(props)
		this.addTopic = this.addTopic.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.showTopic = this.showTopic.bind(this);
        this.handleChange = this.handleChange.bind(this)
	}

	componentWillMount(){        
        this.props.dispatch(fetchTopics())		
	}

    handleChange(e){
        this.props.dispatch(newTopic(e.target.value))
    }

	addTopic(){
		if(this.props.newtopic){
            this.props.dispatch(addTopic(this.props.newtopic))
        }
    }
    

    showTopic(topic){        
        this.props.dispatch(selectTopic(topic))
    }

	deleteTopic(topicId){		
		this.props.dispatch(deleteTopic(topicId))
	}

	render(){
        // console.log(this.props.match.url);
        const { topics, selectedTopic, match, newtopic } = this.props        
		return (
            <div>
                <h3>Topics</h3>
                <div>
                    <input type="text" onChange={this.handleChange} value={newtopic}/><button onClick={this.addTopic}>Add new topic</button>
                    <ComponentTopics topics = {topics} onDelete = {this.deleteTopic} onShow={this.showTopic}/>
                </div>        
                { selectedTopic && 
                    <ComponentTopic topic={selectedTopic} />        
                }
            </div>
        )
	}
}

const mapStateToProps = state => {        
    const { topics, topic, newtopic } = state    
    return {
        topics,
        selectedTopic: topic._id ? topic : topics[0],
        newtopic        
    }
}



const mapDispatchToProps = dispatch => {
    return {
        onDelete: id =>{
            console.log(id)
            // deleteTopic(e)
        },
        onEdit: topic => {
            console.log(topic)
        },
        dispatch  //很奇怪，这里一定要返回，不然props没有dispatch
    }
}

export default connect(    
    mapStateToProps    
)(Topics)