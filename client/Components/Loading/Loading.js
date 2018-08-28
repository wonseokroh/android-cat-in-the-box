import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import Store from "../store";

export default class Loading extends Component {
  state = {
    latitude: 0,
    longitude: 0
  };
  static navigationOptions = {
    header: null
  };
  async componentDidMount() {
    try {
      await navigator.geolocation.getCurrentPosition(position => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);
        this.setState({
          latitude: lat,
          longitude: long
        });
      });
      this.timeoutHandle = await setTimeout(() => {
        const { latitude, longitude } = this.state;
        socket.emit("findRoom", { latitude, longitude });
        this.props.navigation.navigate("ChatRoomScreen");
      }, 2500);
    } catch (err) {
      console.log(err);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>주변 고양이를 찾는중!!</Text>
        <Store.Consumer>
          {store => {
            socket = store.socket;
          }}
        </Store.Consumer>
        <Image
          style={{ width: 250, height: 250 }}
          source={require("../../assets/img/loading.gif")}
        />
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
    fontSize: 30,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "Goyang"
  }
});
