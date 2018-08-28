import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { Icon } from "react-native-elements";

export default class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLimit: 1,
      timeOver: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.time < prevState.timeLimit) {
      return { timeOver: true };
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.timeOver !== this.state.timeOver) {
      this.props.stopTimer();
    }
  }

  render() {
    return (
      <View style={styles.timer}>
        <Icon name="md-time" type="ionicon" color="black" size={21} />
        <Text style={styles.text}>{this.props.time}</Text>
      </View>
    );
  }
}
