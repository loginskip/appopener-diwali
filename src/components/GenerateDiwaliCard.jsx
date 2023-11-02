import { Component } from "react";
import React from "react";
import classes from "../components/Styles.module.css";
import "../css/splash.css";

import logo from "../assets/logo.avif";

class GenerateDiwaliCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: "",
    };
    this.handleCardCreation = this.handleCardCreation.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      <>
        <div className={classes.logo_container}>
          <img className={classes.logo} src={logo} alt="Logo" />
          <p>APPOPENER</p>
        </div>
        <div className={classes.card_form_container}>
          <div
            className={classes.card_form}
            style={{ backgroundColor: "#6e9fc1" }}
          >
            <h3>Generate Diwali Card</h3>
            <form onSubmit={this.handleCardCreation}>
              <input
                type="text"
                placeholder="Enter your name"
                value={this.state.cardName}
                onChange={this.handleChange}
                style={{ backgroundColor: "#bde0fe" }}
              />
              <div className={classes.button_container}>
                <button style={{ backgroundColor: "#0078b8" }}>Generate</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
export default GenerateDiwaliCard;
