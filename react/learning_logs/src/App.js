import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
// import Topics from './Topics';
import { Route, Link } from 'react-router-dom';
import FullLoading from './containers/fullscreenloading'

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'


import Topics from './containers/topics'
import { Provider } from 'react-redux'
import configureStore from './store'


const history = createHistory()

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <div>
            <ul>
              <Link to= "/">Home</Link>
              <Link to= "/about">About</Link>
              <Link to="/topics">Topics</Link>
            </ul>
          </div>
          <hr/>
          <Route exact path='/' component={Home} />    
          <Route path='/about' render = {() => <div><h2>About</h2></div>} />
          <Route path='/topics' component = {Topics}/>        
          {<FullLoading />}
        </div>              
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
