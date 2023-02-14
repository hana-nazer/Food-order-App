import React, { Fragment } from "react";
import classes from "./Header.module.css";
import Meals from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

function Header() {
  return (
    <Fragment>
      <header className={classes.header}>
        <h2>ReactMeals</h2>
        <HeaderCartButton />
      </header>
      <div className={classes["main-image"]}>
        <img src={Meals} alt="Delicious food!" />
      </div>
    </Fragment>
  );
}

export default Header;
