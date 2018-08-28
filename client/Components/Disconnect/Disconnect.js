import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  AppState,
  BackHandler
} from "react-native";
import Store from "../store";

class test extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    appState: AppState.currentState
  };
  _handleBackPress = () => {
    return true;
  };
  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    BackHandler.addEventListener("hardwareBackPress", this._handleBackPress);
    if (this.state.appState === "active") {
      this.timeoutHandle = setTimeout(() => {
        context.disconnectcontrol();
      }, 1500);
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
    BackHandler.removeEventListener("hardwareBackPress", this._handleBackPress);
    clearTimeout(this.timeoutHandle);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");

      this.timeoutHandle = setTimeout(() => {
        context.disconnectcontrol();
      }, 1500);
    }
    this.setState({ appState: nextAppState });
  };

  render() {
    return (
      <View style={styles.container}>
        <Store.Consumer>
          {store => {
            context = store;
            return <Text style={styles.title}>고양이들이 사라졌다!</Text>;
          }}
        </Store.Consumer>
      </View>
    );
  }
}

export default test;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "#FFAA0E",
    fontFamily: "Goyang",
    fontSize: 35,
    marginTop: 10,
    marginBottom: 10
  }
});
