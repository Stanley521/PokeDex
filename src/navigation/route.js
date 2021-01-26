import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RouteWrapper({
  component: Component,
  notPrivate,
  covid,
  ...rest
}) {
  var user = useSelector(state => state.user?.data)
  console.log(user);
  const  {
    id
  } = user;
  const signed = (id) ? true : false;

  /**
   * Redirect user to SignIn page if he tries to access a private route
   * without authentication.
   */
  if (!notPrivate && !signed) {
    return <Redirect to="/signin" />;
  }

  /**
   * Redirect user to Main page if he tries to access a non private route
   * (SignIn or SignUp) after being authenticated.
   */
  if (notPrivate && signed) {
    return <Redirect to="/" />;
  }
  
  /**
   * If not included on both previous cases, redirect user to the desired route.
   */
  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};

RouteWrapper.defaultProps = {
  isPrivate: false
};
