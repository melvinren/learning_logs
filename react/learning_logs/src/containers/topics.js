import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTopics, deleteTopic, clearTopics } from '../actions'
import { Route, Link, Switch } from 'react-router-dom'; 
import Topic from './topic'
import '../Topics.css'
import Scroll from 'react-infinite-scroll-component'

class Topics extends Component{
	constructor(props){
        super(props)
        this.deleteTopic = this.deleteTopic.bind(this);
        this.pageIndex = 1;
	}

	componentWillMount(){        
        this.props.dispatch(fetchTopics())
    }
    
    componentWillUnmount(){
        this.props.dispatch(clearTopics())
    }

	deleteTopic(topicId){		
		this.props.dispatch(deleteTopic(topicId))
    }
    
    loadMoreData(){
        this.pageIndex++
        this.props.dispatch(fetchTopics({pageIndex: this.pageIndex}))
    }

	render(){        
        const { topics, match, hasMore } = this.props
        return (
        <div className="topics">            
            <Link className="ml15" to={match.url} ><strong>Topics</strong></Link>
            <Route exact path={match.url} render = {()=>(
                <div className="topics_wrap">   
                    <div className="ml15">                 
                        <Link to={`${match.url}/new_topic`} className="btn btn_add" >Add topic</Link>
                    </div>
                    <Scroll 
                        next = {()=>this.loadMoreData()}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        endMessage={<h4>没有更多数据了</h4>}
                    >
                    <ul>				
                    {						
                        topics && topics.length 
                        ? topics.map(topic => (                            
                                <li key={topic._id}>
                                  <div className="topic_wrap">                                    
                                    <Link to={`${match.url}/${topic._id}`}  className="left">                                        
                                        <p>{topic.text}</p>
                                        <p className="oneline"><small>{topic.entries && topic.entries[0] && topic.entries[0].text}</small></p>
                                    </Link>                                     
                                    <div className="right">
                                    <Link to={`${match.url}/${topic._id}/edit`} className="btn_edit">
                                        EDIT
                                    </Link>
                                    <a className="btn_delete" onClick={ (e) => this.deleteTopic(topic._id) }>
                                        DELETE
                                    </a>
                                    </div>
                                  </div>
                                </li>
                            ))
                        : <li>No topics have been added yet.</li>					
                    }
                    </ul>
                    </Scroll>
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
    const { topics, hasMore } = state.topicApp        
    return {
        topics,
        hasMore
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