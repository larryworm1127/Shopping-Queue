import React from 'react';
import NavBar from './Nav/navbar';
import HeadSection from "../components/Home/HeadSection";
import ServiceSect from "../components/Home/ServiceSect";
import Footer from "../components/Home/Footer"


/* Component for the Home page */
class Home extends React.Component {
  render() {
    return (
      <div className="App">
      <NavBar/>
        <HeadSection />
        <ServiceSect />
        <Footer/>
        </div>
    );
  }
}

export default Home;
