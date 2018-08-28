import React, { Component } from "react";
import {
  Text,
  View,
  AsyncStorage,
  Dimensions,
  BackHandler
} from "react-native";
import Cat from "../Cat/Cat";
import styles from "./styles";

const { width, height } = Dimensions.get("window");
export default class SelectCat extends Component {
  static navigationOptions = {
    title: "슈뢰딩거의 고양이",
    headerStyle: {
      backgroundColor: "#f4da6c",
      height: height * 0.07
    },
    headerLeft: null,
    headerTintColor: "black",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 17
    }
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
    const upperCats = [1, 2, 3];
    const lowerCats = [4, 5, 6];
    return (
      <View style={styles.body}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.text}>고양이를 고를고양</Text>
          </View>
          <View style={styles.catContainer}>
            <View style={styles.cats}>
              {upperCats.map(cat => (
                <Cat key={cat} id={cat} sendCatInfom={this._sendCatInfom} />
              ))}
            </View>
            <View style={styles.cats}>
              {lowerCats.map(cat => (
                <Cat key={cat} id={cat} sendCatInfom={this._sendCatInfom} />
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  }
  // 고양이를 누르면 고양이 정보를 보내주고 화면을 넘김
  _sendCatInfom = async (catId, store) => {
    try {
      await store.socket.emit("info", catId);
      await AsyncStorage.removeItem("firstTime");
      await this.props.navigation.navigate("OpenBoxScreen");
    } catch (err) {
      console.log(err);
    }
  };
}
