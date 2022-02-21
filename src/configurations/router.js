import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from "../views/LoginScreen";
import HomeScreen from "../views/HomeScreen";
import CreatePostScreen from "../views/CreatePostScreen";
import WelcomeScreen from "../views/WelcomScreen";

const Stack = createStackNavigator();

const hide = {headerShown: false};

export default class Router extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="welcome">
        <Stack.Screen name="welcome" component={WelcomeScreen} options={hide} />
        <Stack.Screen name="login" component={LoginScreen} options={hide} />
        <Stack.Screen name="home" component={HomeScreen} options={hide} />
        <Stack.Screen name="createPost" component={CreatePostScreen} options={hide} />
      </Stack.Navigator>
    );
  }
}
