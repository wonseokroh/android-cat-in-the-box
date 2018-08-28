import React from "react";
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  AsyncStorage
} from "react-native";
import Store from "../store";

const { width, height } = Dimensions.get("window");
export default class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      clearInput: false,
      myuserid: 10,
      mycatid: 0,
      mynickname: ""
    };
  }

  componentWillMount() {
    //this._whoamI();
    this._myuserinfo();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chatinput}>
          <Store.Consumer>
            {store => {
              return (
                <TextInput
                  style={styles.textInput}
                  editable={store.muteornot ? false : true}
                  multiline={false}
                  value={!this.state.clearInput ? this.state.message : null}
                  onChangeText={message => {
                    this.setState({ message: message, clearInput: false });
                    if (this.state.message.length !== 0) {
                      store.socket.emit("typing", {
                        nickname: this.state.mynickname
                      });
                    }
                  }}
                  returnKeyType="default"
                  autoCorrect={false}
                  onSubmitEditing={() =>
                    this._sendMessage(store.socket, this.state.message)
                  }
                  underlineColorAndroid={"transparent"}
                />
              );
            }}
          </Store.Consumer>
          <Store.Consumer>
            {store => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    {
                      store.muteornot
                        ? Alert.alert("1분간 채팅 금지")
                        : this._sendMessage(store.socket, this.state.message);
                    }
                  }}
                >
                  <View>
                    <Image
                      source={require("../../assets/img/arrow2.png")}
                      style={{ marginRight: 3, marginTop: 1 }}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          </Store.Consumer>
        </View>
      </View>
    );
  }

  _sendMessage = (socket, message) => {
    if (message.length > 0) {
      this.setState({
        clearInput: !this.state.clearInput,
        message: ""
      });

      socket.emit("chat", {
        message: message,
        userId: this.state.myuserid,
        catImage: this.state.mycatid,
        nickname: this.state.mynickname
      });
    }
  };

  _myuserinfo = async () => {
    var myuserid = await AsyncStorage.getItem("myUserId");
    myuserid = JSON.parse(myuserid);
    this.setState({
      myuserid: myuserid["userId"],
      mycatid: myuserid["catId"],
      mynickname: myuserid["nickname"]
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    width: width * 0.85,
    height: height * 0.05,
    marginLeft: 2
  },
  chatinput: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 30,
    height: 38
  },
  subtitle: {
    color: "black",
    fontSize: 20,
    marginTop: 20,
    fontWeight: "500",
    fontWeight: "bold"
  }
});
