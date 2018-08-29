import React from "react";
import { Text, View, Image, Dimensions, BackHandler } from "react-native";
import Store from "../store";
import { Icon } from "react-native-elements";
import styles from "./styles";
import ElevatedView from "react-native-elevated-view";

const { width, height } = Dimensions.get("window");

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
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
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ fontFamily: "Goyang", fontSize: 17, color: "white" }}>
            고양이 프로필
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: "#f4da6c",
        height: height * 0.07
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 17
      },
      headerRightContainerStyle: { marginRight: 5 },
      headerRight: (
        <Store.Consumer>
          {store => {
            return (
              <Icon
                name="pencil"
                type="font-awesome"
                color="white"
                iconStyle={{
                  paddingRight: 10,
                  paddingLeft: 20,
                  paddingTop: 10,
                  paddingBottom: 10
                }}
                onPress={() =>
                  params.navigation.navigate("EditProfileScreen", {
                    socket: store.socket
                  })
                }
              />
            );
          }}
        </Store.Consumer>
      )
    };
  };
  _handleBackPress = () => {
    this.props.navigation.navigate("OpenBoxScreen");
  };
  componentDidMount() {
    this.props.navigation.setParams({ navigation: this.props.navigation });
    BackHandler.addEventListener("hardwareBackPress", this._handleBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this._handleBackPress);
  }

  render() {
    return (
      <View style={styles.container}>
        <Store.Consumer>
          {store => {
            return (
              <View style={styles.card}>
                <View style={styles.profilecat}>
                  <Image
                    source={this.images[store.myInfo.catImage]}
                    style={{ width: 42, height: 42 }}
                  />
                </View>
                <ElevatedView style={styles.userinfo} elevation={2}>
                  <Text style={styles.subtitle}>
                    이름 : {store.myInfo.nickname}
                  </Text>
                  <Text style={styles.subtitle}>
                    ID : {store.myInfo.userId}
                  </Text>
                  <Text style={styles.subtitle}>
                    맞은 횟수 : {store.myInfo._hittenCount}
                  </Text>
                  <Text style={styles.subtitle}>
                    채팅 입장 횟수 : {store.myInfo._enterCount}
                  </Text>
                  <Text style={styles.subtitle}>
                    뮤트된 횟수 : {store.myInfo._muteCount}
                  </Text>
                </ElevatedView>
              </View>
            );
          }}
        </Store.Consumer>
      </View>
    );
  }
}
