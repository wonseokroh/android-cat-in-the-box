import React, { Component } from "react";
import {
  Text,
  View,
  AsyncStorage,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import Modal from "react-native-modal";
import Swiper from "react-native-swiper";
import Images from "../../assets/img/catindex";

const { width, height } = Dimensions.get("window");

export default class SelectCat extends Component {
  state = {
    firstornot: false
  };
  componentDidMount() {
    this._isFirstTime();
  }
  componentWillUnmount() {
    clearTimeout(this._handleTimeout);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.tutorial) {
      return { firstornot: true };
    }
    return null;
  }
  render() {
    return (
      <View>
        <Modal
          isVisible={this.state.firstornot}
          style={styles.modalContent}
          animationIn={"slideInLeft"}
          animationOut={"slideOutRight"}
          animationInTiming={1000}
          animationOutTiming={1000}
        >
          <View style={{ flex: 0.07, alignItems: "flex-end" }}>
            <TouchableOpacity
              onPress={() => {
                this._closeTutorial();
              }}
            >
              <Image
                style={{ margin: 15, width: 25, height: 25 }}
                source={require("../../assets/img/cancel.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.title}>Tutorial</Text>
            <ScrollView>
              <View style={styles.wrapper}>
                <Image
                  source={Images["tut1"]}
                  style={{
                    width: width * 0.5,
                    height: height * 0.5,
                    marginTop: 10
                  }}
                />
                <Text style={{ fontSize: 17, fontFamily: "Goyang" }}>
                  고양이를 고르라옹
                </Text>
              </View>
              <View style={styles.blank} />
              <View style={styles.wrapper}>
                <Image
                  source={Images["tut2"]}
                  style={{
                    width: width * 0.5,
                    height: height * 0.5,
                    marginTop: 10
                  }}
                />
                <Text style={{ fontSize: 17, fontFamily: "Goyang" }}>
                  프로필을 누르면 자기 프로필을 볼 수 있다옹
                </Text>
              </View>
              <View style={styles.blank} />
              <View style={styles.wrapper}>
                <Image
                  source={Images["tut3"]}
                  style={{
                    width: width * 0.5,
                    height: height * 0.5,
                    marginTop: 10
                  }}
                />
                <Text style={{ fontSize: 17, fontFamily: "Goyang" }}>
                  자신의 프로필을 확인하고
                </Text>
                <Text style={{ fontSize: 17, fontFamily: "Goyang" }}>
                  고양이를 바꿀 수 있댜옹
                </Text>
              </View>
              <View style={styles.blank} />
              <View style={styles.wrapper}>
                <Image
                  source={Images["tut4"]}
                  style={{
                    width: width * 0.5,
                    height: height * 0.5,
                    marginTop: 10
                  }}
                />
                <Text style={{ fontSize: 17, fontFamily: "Goyang" }}>
                  채팅방
                </Text>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }

  _isFirstTime = async () => {
    const first = await AsyncStorage.getItem("firstTime");
    if (first || this.props.tutorial) {
      this.setState({
        firstornot: true
      });
    }
  };
  _closeTutorial = () => {
    this.setState({ firstornot: false });
    if (this.props.toggleTutorial) {
      this._handleTimeout();
    }
  };
  _handleTimeout = () => {
    setTimeout(() => {
      this.props.toggleTutorial(1);
    }, 1100);
  };
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    //justifyContent: "center",
    marginTop: 100,
    marginBottom: 50,
    //alignItems: "center",
    borderRadius: 20,
    borderColor: "black"
    // width: width * 0.7,
    // height: height * 0.7
  },
  title: {
    fontSize: 40,
    fontFamily: "Goyang"
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "red",
    // flex: 1
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  },
  blank: {
    height: 15
  }
});
