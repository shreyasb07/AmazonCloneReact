import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

import {loadStripe} from '@stripe/stripe-js';
import {Elements, ELements} from '@stripe/react-stripe-js';
import Orders from './Orders';


const stripePromise  = loadStripe('pk_test_51LIIQSCohUGRSJidLZt2btGhlcyMgEZyTliYdD5Q3M2L11bLPriUV67KEzmTJtS9AP1b6yZryIVCur4lRNVjLKlQ00oLC5s2pe');

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
      <Route path='/orders' element={
      <div>
        <Header />
        <Orders />
      </div>
      } 
      
      />
        <Route path='/login' element={<Login />} />
        <Route exact path="/checkout" 
          element={
            <div>
              <Header />
              <Checkout />
            </div>
          } />
        <Route exact path="/payment" 
          element={
            <div>
              <Header />
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </div>
          } />
        <Route path="/" element = 
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
