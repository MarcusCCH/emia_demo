var express = require("express");
var mongoose = require("mongoose");
var middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};
module.exports = middlewareObj;
