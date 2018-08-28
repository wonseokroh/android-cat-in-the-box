import React, { Component } from "react";
import TimePicker from "./presenter";

export default class Timer extends Component {
  state = {
    timeOver: false,
    time: "POP"
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.leftTime < prevState.time) {
      const time =
        100 + nextProps.leftTime - Math.floor(new Date().getTime() / 1000);
      return { time };
    }
    return null;
  }

  componentDidMount() {
    const timer = setInterval(() => {
      const time =
        100 + this.props.leftTime - Math.floor(new Date().getTime() / 1000);
      this.setState({ time });
    }, 1000);
    this.setState({ timer });
  }
  componentWillUnmount() {
    this._clearInterval();
  }

  _stopTimer = async () => {
    try {
      await this.props.socket.emit("timeOut");
      await this.props.resetchat();
      this.setState({ time: "" });
      await this.props.explodeChatRoom();
    } catch (err) {
      console.log(err);
    }
  };
  _clearInterval = () => {
    clearInterval(this.state.timer);
  };
  render() {
    return (
      <TimePicker
        time={this.state.time}
        stopTimer={this._stopTimer}
        clearInterval={this._clearInterval}
      />
    );
  }
}
