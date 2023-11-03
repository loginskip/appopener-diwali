import React from "react";
import classes from "../components/Styles.module.css";
import HeroSection from "../components/HeroSection";
import PageContent from "../components/PageContent";
import Footer from "../components/Footer";
import { Component } from "react";
import DiwaliSign from "../components/DiwaliSign";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <React.Fragment
          style={{
            position: "relative",
            innerHeight: "100vh",
            innerWidth: "100vw",
          }}
        >
          <DiwaliSign />
          <div className={classes.mainContainer}>
            <HeroSection />
            <PageContent></PageContent>
            <Footer />
          </div>
        </React.Fragment>
      </>
    );
  }
}

export default Home;
