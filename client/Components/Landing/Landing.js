import React, { Component } from "react";
import { View, Text, Image, AsyncStorage, AppState } from "react-native";
import styles from "./styles";

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState
    };
  }

  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    this.timeoutHandle = setTimeout(() => {
      this._userInfo();
    }, 3000);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
    clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>슈뢰딩거의 고양이</Text>
        {/* <Image
          style={{ width: 400, height: 400 }}
          source={require("../../assets/img/firstImg.png")}
        /> */}
      </View>
    );
  }
  _userInfo = async () => {
    //위도 경도, 첫 접속인지 아닌지 확인 후 뷰를 넘김
    try {
      const firstTime = await AsyncStorage.getItem("firstTime");
      if (firstTime === "firstTime") {
        this.props.navigation.navigate("SelectCatScreen");
      } else {
        this.props.navigation.navigate("OpenBoxScreen");
      }
    } catch (err) {
      console.log(err);
    }
  };
  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.timeoutHandle = setTimeout(() => {
        this._userInfo();
      }, 1700);
    }
    this.setState({ appState: nextAppState });
  };
}
