import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';


function App() {

  const [{user}, dispatch] = useStateValue();

  useEffect(()=>{
//run once only when app component loads
    auth.onAuthStateChanged(authUser => {
      console.log("User:", authUser);

      if(authUser){
        //user logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }else{
        //user logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  },[])

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
