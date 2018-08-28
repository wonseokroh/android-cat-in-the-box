import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  Text
} from "react-native";
import Store from "../store";
import { Icon } from "react-native-elements";

const { width, height } = Dimensions.get("window");

export default class OpenBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0
    };

    this._handlePressIn = this._handlePressIn.bind(this);
    this._handlePressOut = this._handlePressOut.bind(this);
  }

  _handlePressIn() {
    Animated.spring(this.animatedValue, {
      toValue: 0.5
    }).start();
  }
  _handlePressOut() {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40
    }).start();
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: "고양이들을 만나러 갈고양?",
      headerStyle: {
        backgroundColor: "#f4da6c",
        height: height * 0.07
      },
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 17,
        alignSelf: "auto"
      },
      headerLeft: null,
      headerRightContainerStyle: { marginRight: 5 },
      headerRight: (
        <Store.Consumer>
          {store => {
            return (
              <TouchableOpacity
                onPress={() => params.openProfile(store.socket)}
              >
                <Icon
                  name="cat"
                  type="material-community"
                  color="white"
                  size={28}
                  iconStyle={{
                    paddingRight: 10,
                    paddingLeft: 20,
                    paddingTop: 10,
                    paddingBottom: 10
                  }}
                />
              </TouchableOpacity>
            );
          }}
        </Store.Consumer>
      )
    };
  };
  componentDidMount() {
    this.props.navigation.setParams({ openProfile: this._openProfile });
    // navigator.geolocation.getCurrentPosition(position => {
    //   var lat = parseFloat(position.coords.latitude);
    //   var long = parseFloat(position.coords.longitude);
    //   this.setState({
    //     latitude: lat,
    //     longitude: long
    //   });
    // });
  }
  componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutHandler);
  }
  render() {
    const animatedStyle = {
      transform: [{ scale: this.animatedValue }]
    };
    return (
      <View style={styles.container}>
        <Text style={styles.text}>상자속에 고양이들이 있을 것 같다옹</Text>
        <Store.Consumer>
          {store => {
            return (
              <TouchableWithoutFeedback
                onPressIn={this._handlePressIn}
                // onPressOut={}
                onPressOut={() => {
                  this._handlePressOut();
                  setTimeout(() => {
                    this._findRoom(store.socket);
                  }, 500);
                }}
              >
                <Animated.View style={animatedStyle}>
                  <Image
                    style={{ width: 250, height: 250 }}
                    source={require("../../assets/img/openBox.gif")}
                  />
                </Animated.View>
              </TouchableWithoutFeedback>
            );
          }}
        </Store.Consumer>
      </View>
    );
  }
  _findRoom = async socket => {
    // const { latitude, longitude } = this.state;
    try {
      // await socket.emit("findRoom", { latitude, longitude });
      await this.props.navigation.navigate("LoadingScreen");
    } catch (err) {
      console.log(err);
    }
  };
  _openProfile = async socket => {
    try {
      await socket.emit("info");
      await this.props.navigation.navigate("ProfileScreen");
    } catch (err) {
      console.log(err);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontFamily: "Goyang",
    fontSize: 20
  }
});
