import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
  AsyncStorage,
  AppState
} from "react-native";
import { Icon } from "react-native-elements";
import Timer from "../Timer";
import Store from "../store";
import CatsList from "../CatsList/CatsList";
import Chat from "../Chat/Chat";

const { width, height } = Dimensions.get("window");
export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myuserid: 10,
      mycatid: 0,
      mynickname: "",
      appState: AppState.currentState
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "반갑다옹",
      headerStyle: {
        backgroundColor: "#f4da6c",
        height: height * 0.07
      },
      headerLeftContainerStyle: { marginLeft: 10 },
      headerLeft: (
        <Store.Consumer>
          {store => {
            return (
              <Timer
                resetchat={store.resetchat}
                socket={store.socket}
                leftTime={store.leftTime}
                organizedTime={store.organizedTime}
                explodeChatRoom={params.explodeChatRoom}
              />
            );
          }}
        </Store.Consumer>
      ),
      headerRightContainerStyle: { marginRight: 15 },
      headerRight: (
        <Store.Consumer>
          {store => {
            context = store;
            return (
              <Icon
                onPress={() => params.exitChat(store)}
                type="ionicon"
                name="md-exit"
                color="white"
                iconStyle={{ paddingLeft: 10 }}
              />
            );
          }}
        </Store.Consumer>
      ),
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };
  componentWillUpdate() {
    context.muteornot
      ? this.props.navigation.navigate("MuteScreen")
      : this.props.navigation.navigate("ChatRoomScreen");
  }

  componentWillMount() {
    this._myuserinfo();
  }

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    this.props.navigation.setParams({
      exitChat: this._exitChat,
      explodeChatRoom: this._explodeChatRoom
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chatroom}>
          <Chat />
        </View>
        <View style={styles.options}>
          <View style={styles.catsstate}>
            <View style={styles.statespace}>
              <CatsList myuserid={this.state.myuserid} />
            </View>
          </View>
        </View>
      </View>
    );
  }

  _myuserinfo = async () => {
    var myuserid = await AsyncStorage.getItem("myUserId");
    myuserid = JSON.parse(myuserid);
    this.setState({
      myuserid: myuserid["userId"],
      mycatid: myuserid["catId"],
      mynickname: myuserid["nickname"]
    });
  };

  _exitChat = store => {
    Alert.alert(
      "채팅방을 나가시겠습니까?",
      "",
      [
        {
          text: "나가기",
          onPress: () => {
            store.socket.emit("leaveRoom");
            store.resetchat();
            this.props.navigation.navigate("OpenBoxScreen");
          }
        },
        { text: "취소" }
      ],
      { cancelable: false }
    );
  };

  // Timer 에서 쓰임. 타임아웃되면 화면 전환
  _explodeChatRoom = () => {
    this.props.navigation.navigate("OpenBoxScreen");
  };

  // 앱이 백그라운드에서 다시 돌아왔을 때 실행
  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      context.socket.emit("leftTime");
    }
    this.setState({ appState: nextAppState });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  catsstate: {
    flex: 1,
    width: width * 0.9,
    alignItems: "center"
  },
  statespace: {
    width: width * 0.96,
    flex: 1
    //margin: 5
  },
  chatroom: {
    flex: 1,
    width: width,
    margin: 5
    //backgroundColor: "green"
  },
  options: {
    flex: 0.7,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "green"
  }
});
