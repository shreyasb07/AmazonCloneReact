import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route exact path="/checkout" 
          element={
            <div>
              <Header />
              <Checkout />
            </div>
          } />
        <Route exact path="/" element = 
        {
        <div>
            <Header />
            <Home />
          </div>
        } />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
