import React from "react";
import { AsyncStorage, Vibration } from "react-native";
import SelectCat from "./Components/SelectCat/SelectCat";
import OpenBox from "./Components/OpenBox/OpenBox";
import Profile from "./Components/Profile/Profile";
import ChatRoom from "./Components/ChatRoom/ChatRoom";
import Loading from "./Components/Loading/Loading";
import Landing from "./Components/Landing/Landing";
import Cat from "./Components/Cat/Cat";
import { createStackNavigator } from "react-navigation";
import { Font } from "expo";
import Store from "./Components/store";
import SocketIOClient from "socket.io-client";
import EditProfile from "./Components/EditProfile/EditProfile";
import Mute from "./Components/Mute/Mute";
import Disconnect from "./Components/Disconnect/Disconnect";

const AppNavigator = createStackNavigator(
  {
    LoadingScreen: { screen: Loading },
    SelectCatScreen: { screen: SelectCat },
    OpenBoxScreen: { screen: OpenBox },
    ProfileScreen: { screen: Profile },
    ChatRoomScreen: { screen: ChatRoom },
    LandingScreen: { screen: Landing },
    CatComponent: { screen: Cat },
    EditProfileScreen: { screen: EditProfile },
    MuteScreen: { screen: Mute },
    DisconnectScreen: { screen: Disconnect }
  },
  {
    initialRouteName: "LandingScreen",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);
const thisroomcats = "Typing을 기다리는 중";
export default class AppPresenter extends React.Component {
  constructor(props) {
    super(props);

    // <--------------          socket           --------------> //

    this._socket = SocketIOClient("https://catadmin.gq", {
      query: this.props.token
    });

    this._socket.on("info", myInfo => {
      // console.log(myInfo, "    this is myInfo");
      this.setState({
        myInfo
      });
    });

    this._socket.on("findRoom", (users, leftTime) => {
      const time = 100 + leftTime - Math.floor(new Date().getTime() / 1000);
      this.setState({
        roomusers: JSON.parse(users),
        organizedTime: time,
        leftTime,
        chatOver: false,
        typing: "Typing을 기다리는 중"
      });
      // console.log(leftTime, "<----- left time");
    });

    this._socket.on("disconnect", async () => {
      await console.log("disconneted");
      await this.setState({
        disconnectornot: true
      });
      await this._resetchat();
      await console.log(this.state.disconnectornot, "this is apppresenter");
    });

    this._socket.on("leaveRoom", users => {
      this.setState({
        roomusers: JSON.parse(users)
      });
      console.log(users, "<----- leaveRoom event");
    });

    //"chat"으로 들어온 정보를 messages 라는 배열에 저장하기 위함
    this._socket.on("chat", data => {
      this._storemessage({
        nickname: data.nickname,
        userId: data.userId,
        catId: data.catImage,
        message: data.message
      });
    });

    this._socket.on("selectCat", userInfo => {
      this._getUserInfo(userInfo);
    });

    this._socket.on("fill", data => {
      console.log(data, "this is filled socketId");
      var arr = this.state.roomusers.slice();
      var arr2 = [...arr];
      for (var i = 0; i < arr2.length; i++) {
        if (data === arr2[i].socketId) {
          arr2[i].hp = 7;
        }
      }
      this.setState({
        roomusers: arr2
      });
    });

    this._socket.on("hit", data => {
      var arr = this.state.roomusers.slice();
      var arr2 = [...arr];
      for (var i = 0; i < arr2.length; i++) {
        if (data === arr2[i].socketId) {
          arr2[i].hp > 0 ? (arr2[i].hp -= 1) : null;
        }
      }
      this.setState({
        roomusers: arr2
      });
      this.state.roomusers.map(item => {
        if (item.socketId === data && this.props.myUserId === item.userId) {
          this._muteControl(data);
        }
      });
    });

    this._socket.on("timeOut", () => {
      this.setState({
        chatOver: true
      });
    });

    this._socket.on("typing", data => {
      this.setState({
        typing: data.nickname + "is typing"
      });
    });

    this._socket.on("leftTime", leftTime => {
      this.setState({ leftTime });
    });

    // <-------------------           socket            -------------------> //

    //새로 들어온 채팅을 추가해 messages라는 state에 저장하기 위함
    this._storemessage = chat => {
      const arr = this.state.messages;
      arr.push(chat);
      this.setState({
        messages: arr
      });
      if (chat.nickname + "is typing" === this.state.typing) {
        this.setState({
          typing: "Typing을 기다리는 중"
        });
      }
    };

    this._getUserInfo = async userInfo => {
      try {
        const myInfo = {
          userId: userInfo.userId,
          catId: userInfo.catImage,
          nickname: userInfo.nickname
        };
        await AsyncStorage.setItem("myUserId", JSON.stringify(myInfo));
        await this.setState({
          myUserId: userInfo.userId
        });
      } catch (err) {
        console.log(err);
      }
    };

    this._resetchat = () => {
      this.setState({
        roomusers: [],
        messages: []
      });
    };

    this._disconnectControl = () => {
      this.setState({
        disconnectornot: false
      });
    };

    this._muteControl = socketId => {
      Vibration.vibrate(100);
      for (var i = 0; i < this.state.roomusers.length; i++) {
        if (
          this.state.roomusers[i].userId === this.props.myUserId &&
          this.state.roomusers[i].hp <= 0
        ) {
          this.setState({
            muteornot: true
          });
          if (this.state.mutepushcount < 1) {
            this.setState({
              mutepushcount: 1
            });
          }
          setTimeout(() => {
            this.setState({
              muteornot: false,
              mutepushcount: 0
            });
            this._socket.emit("fill", socketId);
          }, 10000);
        }
      }
    };

    this.state = {
      fontLoaded: false,
      socket: this._socket,
      roomusers: [],
      myInfo: {},
      messages: [],
      leftTime: 600,
      resetchat: this._resetchat,
      muteornot: false,
      mutecontrol: this._muteControl,
      test: this._test,
      mutepushcount: 0,
      disconnectornot: false,
      disconnectcontrol: this._disconnectControl,
      chatOver: false,
      typing: thisroomcats
    };
  }

  async componentDidMount() {
    // console.log(this.props.token);
    await Font.loadAsync({
      Goyang: require("./assets/fonts/Goyang.otf"),
      Arial: require("./assets/fonts/arial.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return this.state.disconnectornot ? (
      <Store.Provider value={this.state}>
        <Disconnect />
      </Store.Provider>
    ) : this.state.fontLoaded ? (
      <Store.Provider value={this.state}>
        <AppNavigator />
      </Store.Provider>
    ) : null;
  }
}
