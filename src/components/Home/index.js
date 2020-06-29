import React from 'react';
import NavBar from '../Nav/navbar';
import HeadSection from './HeadSection';
import ServiceSect from './ServiceSect';
import Footer from './Footer';


/* Component for the Home page */
class Home extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <HeadSection/>
        <ServiceSect/>
        <Footer/>
      </div>
    );
  }
}

export default Home;
