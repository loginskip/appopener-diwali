import { Component } from "react";
import React from "react";
import classes from "../components/Styles.module.css";
import { getURLandredirect } from "../helper/api";
import "../css/splash.css";

class Diwali extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intentvalue: "",
      original_url: "",
      ostype: "",
      cardName: "",
    };
    this.handleCardCreation = this.handleCardCreation.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(e) {
    this.setState({ cardName: e.target.value });
  }

  handleCardCreation(e) {
    e.preventDefault();
    if (this.state.cardName.length) {
      window.open(
        `${window.location.origin}/diwali/${this.state.cardName}`,
        "_blank"
      );
      this.setState({ cardName: "" });
    }
  }

  render() {
    return (
      <div className={classes.diwali_page} style={{ paddingBottom: "3rem" }}>
        <div className={classes.redirect_box}>
          <p>If redirect dont't occur</p>
          <a id="abcd" target="_blank" style={{ cursor: "pointer" }}>
            Click here
          </a>
        </div>

        <div className={classes.card_form_container}>
          <div className={classes.card_form}>
            <h3>Generate Diwali Card</h3>
            <form onSubmit={this.handleCardCreation}>
              <input
                type="text"
                placeholder="Enter your name"
                value={this.state.cardName}
                onChange={this.handleChange}
              />
              <div className={classes.button_container}>
                <button>Generate</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Diwali;
