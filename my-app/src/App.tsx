import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './components/login/Login';

import About from './components/about/About';
import Home from './components/home/Home';
import SignUp from './components/signUp/SignUp';

function App() {
  return (
    <div className="App">
      <Layout /> 
    </div>
  );
}

export default App;
