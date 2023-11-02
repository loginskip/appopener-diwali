import { Component } from "react";
import React from "react";
import classes from "../components/Styles.module.css";
import "../css/splash.css";

import GenerateDiwaliCard from "../components/GenerateDiwaliCard";

class HappyDiwali extends Component {
  render() {
    return (
      <div
        className={classes.diwali_page}
        style={{ paddingBottom: "3rem", backgroundColor: "#bde0fe" }}
      >
        <GenerateDiwaliCard />
      </div>
    );
  }
}
export default HappyDiwali;
