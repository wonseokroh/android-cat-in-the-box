import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
  AsyncStorage,
  AppState,
  BackHandler
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
      appState: AppState.currentState,
      chating: false
    };
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ fontFamily: "Goyang", fontSize: 17, color: "white" }}>
            반갑다옹
          </Text>
        </View>
      ),
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

  _handleBackPress = () => {
    this._exitChat();
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
    BackHandler.addEventListener("hardwareBackPress", this._handleBackPress);
    this.props.navigation.setParams({
      exitChat: this._exitChat,
      explodeChatRoom: this._explodeChatRoom
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
    BackHandler.removeEventListener("hardwareBackPress", this._handleBackPress);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chatroom}>
          <Chat />
        </View>
        <Text style={styles.text}>이 구역의 고양이들</Text>
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
      "고양이들을 떠날고양?",
      "",
      [
        {
          text: "떠날고양",
          onPress: () => {
            context.socket.emit("leaveRoom");
            context.resetchat();
            this.props.navigation.navigate("OpenBoxScreen");
          }
        },
        { text: "더 있을고양" }
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
  text: {
    fontFamily: "Goyang",
    fontSize: 30,
    marginBottom: 5
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
    flex: 0.8,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "green"
  }
});
