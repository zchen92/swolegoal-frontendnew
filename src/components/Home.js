import React, { Component } from 'react';
import Exercise from './Exercise.js';
import Url from '../Url';
import Nav from './Nav';
import Footer from './Footer'

class Home extends Component {

  render() {
    return (
      <div className="container-fluid">
        <Nav />
        <Exercise />
        <Footer />
      </div>
    );
  }
}

export default Home;

