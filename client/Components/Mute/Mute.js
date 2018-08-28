import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
class test extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>혼자 있을 시간이 필요한고양</Text>
      </View>
    );
  }
}

export default test;
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
    fontWeight: "900",
    marginBottom: 10
  }
});
