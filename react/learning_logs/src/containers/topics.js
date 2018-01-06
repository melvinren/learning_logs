import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTopics, deleteTopic } from '../actions'
import { Route, Link, Switch } from 'react-router-dom'; 
import Topic from './topic'

class Topics extends Component{
	constructor(props){
        super(props)
        this.deleteTopic = this.deleteTopic.bind(this);
	}

	componentWillMount(){        
        this.props.dispatch(fetchTopics())		
	}

	deleteTopic(topicId){		
		this.props.dispatch(deleteTopic(topicId))
	}

	render(){
        console.log(this.props.match.url);
        const { topics, match } = this.props        
        return (
        <div>
            <h3><Link to={match.url} >Topics</Link></h3>
            <Route exact path={match.url} render = {()=>(
                <div>
                    <Link to={`${match.url}/new_topic`} >Add new topic</Link>
                    <ul>				
                    {						
                        topics && topics.length 
                        ? topics.map(topic => (
                                <li key={topic._id}>
                                    <Link to={`${match.url}/${topic._id}`}>{topic.text}</Link> 
                                    <Link to={`${match.url}/${topic._id}/edit`}>Edit</Link>
                                    <button onClick={ (e) => this.deleteTopic(topic._id) }>DELETE</button>
                                </li>
                            ))
                        : <li>No topics have been added yet.</li>					
                    }
                    </ul>
                </div>
            )} />
            <Switch>
                <Route path={`${match.url}/new_topic`} render = { (props) => <Topic {...props} topics = {topics} add={true} /> }/>					
                <Route path={`${match.url}/:topicId/edit`} render = { (props) => <Topic {...props} topics = {topics} edit={true} /> } />			
                <Route path={`${match.url}/:topicId`} render = { (props) => <Topic {...props} topics = {topics}  /> } />	
            </Switch>
        </div>)
	}
}

const mapStateToProps = state => {        

    const { topics } = state.topicApp    
    return {
        topics
    }
}



// const mapDispatchToProps = dispatch => {
//     return {
//         onDelete: id =>{
//             console.log(id)
//             // deleteTopic(e)
//         },
//         onEdit: topic => {
//             console.log(topic)
//         },
//         dispatch  //很奇怪，这里一定要返回，不然props没有dispatch
//     }
// }

export default connect(    
    mapStateToProps    
)(Topics)