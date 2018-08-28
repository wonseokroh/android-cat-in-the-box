import React, { Component } from "react";
import { View, Text, Image, AsyncStorage } from "react-native";
import styles from "./styles";

export default class Landing extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      this._userInfo();
    }, 3000);
  }

  componentWillUnmount() {
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
}
