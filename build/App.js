"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_navigation_1 = require("react-navigation");
const home_1 = require("./pages/home");
const AppNavigator = react_navigation_1.createStackNavigator({
    Home: home_1.Home,
});
exports.default = home_1.Home;
