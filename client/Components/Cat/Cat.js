import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Image,
  Animated,
  StyleSheet
} from "react-native";
import Store from "../store";

export default class Cat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catId: this.props.id,
      animatePress: new Animated.Value(1)
    };
    this.images = {
      1: require("../../assets/img/cat1.png"),
      2: require("../../assets/img/cat2.png"),
      3: require("../../assets/img/cat3.png"),
      4: require("../../assets/img/cat4.png"),
      5: require("../../assets/img/cat5.png"),
      6: require("../../assets/img/cat6.png"),
      7: require("../../assets/img/cat7.png")
    };
  }

  animateIn = () => {
    Animated.spring(this.state.animatePress, {
      toValue: 0.8
    }).start();
  };

  handleSetTimeout = (catId, store) => {
    const { sendCatInfom } = this.props;
    setTimeout(() => {
      sendCatInfom(catId, store);
    }, 500);
  };

  animateOut = async (catId, store) => {
    try {
      await Animated.spring(this.state.animatePress, {
        toValue: 1,
        friction: 3,
        tension: 40
      }).start();
      await this.handleSetTimeout(catId, store);
    } catch (err) {
      console.log(err);
    }
  };

  componentWillUnmount() {
    clearTimeout(this.handleSetTimeout);
  }

  render() {
    const { catId } = this.state;
    return (
      <View>
        <Store.Consumer>
          {store => {
            return (
              <TouchableWithoutFeedback
                onPressIn={() => this.animateIn()}
                onPressOut={() => this.animateOut(catId, store)}
              >
                <View style={styles.container}>
                  <Animated.View
                    style={{
                      transform: [
                        {
                          scale: this.state.animatePress
                        }
                      ],
                      borderWidth: 5,
                      width: 80,
                      height: 80,
                      borderRadius: 40,
                      borderColor: "#f4da6c",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Image
                      source={this.images[catId]}
                      style={{ width: 42, height: 42 }}
                    />
                  </Animated.View>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        </Store.Consumer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
