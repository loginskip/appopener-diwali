import { Component } from "react";
import React from "react";
import classes from "../components/Styles.module.css";
import { getURLandredirect } from "../helper/api";
import "../css/splash.css";

import GenerateDiwaliCard from "../components/GenerateDiwaliCard";

class Diwali extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intentvalue: "",
      original_url: "",
      ostype: "",
    };
  }

  componentDidMount() {
    let apptag = this.props.match.params.apptype;
    let shortstring = this.props.match.params.shorturl;
    getURLandredirect(apptag, shortstring).then((res) => {
      this.setState({ intentvalue: res.data.app_intend });
      this.setState({ original_url: res.data.originalURL });
      this.setState({ ostype: res.data.os_type });
      let app_intend = this.state.intentvalue;
      let originalURL = this.state.original_url;

      const click_link = document.getElementById("abcd");

      if (app_intend === "Desktop" || app_intend === "Mobile") {
        app_intend = originalURL;
      }

      if (this.state.ostype == "windows") {
        click_link.setAttribute("href", app_intend);
        click_link.click();
      } else {
        click_link.setAttribute("href", app_intend);
        window.location.assign(app_intend);
      }
    });
  }

  render() {
    return (
      <div
        className={classes.diwali_page}
        style={{ paddingBottom: "3rem", backgroundColor: "#bde0fe" }}
      >
        <GenerateDiwaliCard />
        <div className={classes.redirect_box}>
          <p>If redirect dont't occur</p>
          <a id="abcd" target="_blank" style={{ cursor: "pointer" }}>
            Click here
          </a>
        </div>
        
      </div>
      <GoogleAd slot="6109298143" googleAdId="ca-pub-5645705217995911"/>
    );
  }
}

export default Diwali;
