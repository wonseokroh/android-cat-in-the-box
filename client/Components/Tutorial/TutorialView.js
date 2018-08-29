import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  Text,
  BackHandler
} from "react-native";
import { Icon } from "react-native-elements";

const { width, height } = Dimensions.get("window");

export default class OpenBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {}
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
