import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Topics from './Topics';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
          <ul>
            <Link to= "/">Home</Link>
            <Link to= "/login">Login</Link>
            <Link to="/topics">Topics</Link>
          </ul>
        </div>
        <hr/>
        <Route exact path='/' component={Home} />    
        <Route path='/topics' component={Topics} />        
      </div>      
      </Router>
    );
  }
}

export default App;
