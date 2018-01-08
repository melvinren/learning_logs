import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTopics, deleteTopic } from '../actions'
import { Route, Link, Switch } from 'react-router-dom'; 
import Topic from './topic'
import '../Topics.css'

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
        const { topics, match } = this.props        
        return (
        <div className="topics">
            <h4><Link to={match.url} >Topics</Link></h4>
            <Route exact path={match.url} render = {()=>(
                <div className="topics_wrap">
                    <Link to={`${match.url}/new_topic`} className="btn btn_add" >Add topic</Link>
                    <ul>				
                    {						
                        topics && topics.length 
                        ? topics.map(topic => (                            
                                <li key={topic._id}>
                                  <div className="topic_wrap">                                    
                                    <Link to={`${match.url}/${topic._id}`}  className="left">{topic.text}</Link>                                     
                                    <div className="right">
                                    <Link to={`${match.url}/${topic._id}/edit`} className="btn btn_edit">
                                        <span>EDIT</span>
                                        <i className="icon">E</i>
                                    </Link>
                                    <a className="btn btn_delete" onClick={ (e) => this.deleteTopic(topic._id) }>
                                        <span>DELETE</span>
                                        <i className="icon">X</i>
                                    </a>
                                    </div>
                                  </div>
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