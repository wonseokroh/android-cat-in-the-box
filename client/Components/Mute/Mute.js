import React, { Component } from "react";
import { View, Text, Image, StyleSheet, BackHandler } from "react-native";

export default class Mute extends Component {
  static navigationOptions = {
    header: null
  };

  _handleBackPress = () => {
    return true;
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this._handleBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this._handleBackPress);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>혼자 있을 시간이 필요한고양</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4da6c",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "white",
    fontFamily: "Goyang",
    fontSize: 25,
    marginTop: 10,
    marginBottom: 10
  }
});
