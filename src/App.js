import React, { Component } from 'react'

import DisplayMovies from "./components/Movies/DisplayMovies";

import { Provider } from "./Context";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './Fontawesome'


class App extends Component {
  render() {
    return (
      <Provider>
        <div className="App">
          <div className= "container">
           <DisplayMovies/>
          </div>  
        </div>      
      </Provider>

    )
  }
}

export default App;