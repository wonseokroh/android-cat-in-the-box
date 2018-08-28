import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import Images from "../../assets/img/catindex";
import Store from "./store";

const { width, height } = Dimensions.get("window");

export default class CatsState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // chatroomcats: this.props.chatRoomCats,
      attackmode: false,
      healingmode: false,
      mychatroomnum: this.props.myChatRoomNum,
      myattacknum: 5,
      chatroomcats: {
        //cat1: { userId: 123, catId: 1, hp: 7 },
        cat2: { userId: 87, catId: 2, hp: 7, socketId: "" },
        cat3: { userId: 10, catId: 4, hp: 7, socketId: "" }
      }
    };
    this.socket = this.props.socket;
    // this.socket.on("findRoom", usinfo => {
    //   //console.log(usinfo, "====================================");
    //   // this._storeUser({
    //   //   userId: data.userId,
    //   //   catId: data.catImage,
    //   //   hp: data.hp,
    //   //   socketId: data.socketId
    //   // });
    // });
  }

  componentDidMount = async () => {
    //Alert.alert(this.props.myChatRoomNum);
    //Alert.alert(this.props.socket);
    //this.socket.on("", attackedinfo => {});
    // await setTimeout(() => {
    //   this._storeUser({ userId: 123, catId: 1, hp: 7, socketId: "" });
    //   console.log(this.state.chatroomcats);
    // }, 1000);
    this.socket.on("leaveRoom", data => {
      this._deleteUser(data.userId);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Store.Consumer>
          {store => {
            console.log(store.roomusers, "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            return ( */}
        <View style={styles.state}>
          <View style={styles.uppercat}>
            <View
              style={
                this.state.mychatroomnum === "cat1" ? styles.mycat : styles.cat1
              }
            >
              {this.state.chatroomcats.cat1 ? (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    disabled={
                      this.state.mychatroomnum === "cat1" ||
                      (this.state.myattacknum <= 0 &&
                        this.state.chatroomcats[this.state.mychatroomnum].hp <=
                          0)
                        ? true
                        : this.state.attackmode || this.state.healingmode
                          ? false
                          : true
                    }
                    onPress={
                      this.state.attackmode && !this.state.healingmode
                        ? () => {
                            this._thiscatattacked(
                              this.state.chatroomcats.cat1.catId
                            );
                            this.setState({
                              myattacknum: this.state.myattacknum - 1
                            });
                          }
                        : !this.state.attackmode && this.state.healingmode
                          ? () => {
                              this._thiscathealed(
                                this.state.chatroomcats.cat1.catId
                              );
                            }
                          : null
                    }
                  >
                    <Image
                      source={Images[this.state.chatroomcats.cat1.catId]}
                      style={{
                        marginTop: 8,
                        marginLeft: 10,
                        width: 50,
                        height: 50
                      }}
                    />
                  </TouchableOpacity>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.subtitle}>
                      ID : {this.state.chatroomcats.cat1.userId}
                    </Text>
                    <Text style={styles.subtitle}>
                      HP : {this.state.chatroomcats.cat1.hp} / 7
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={styles.waiting}>고양이를 기다리는 중..</Text>
                </View>
              )}
            </View>
            <View
              style={
                this.state.mychatroomnum === "cat2" ? styles.mycat : styles.cat2
              }
            >
              {this.state.chatroomcats.cat2 ? (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    disabled={
                      this.state.mychatroomnum === "cat2" ||
                      (this.state.myattacknum <= 0 &&
                        this.state.chatroomcats[this.state.mychatroomnum].hp <=
                          0)
                        ? true
                        : this.state.attackmode || this.state.healingmode
                          ? false
                          : true
                    }
                    onPress={
                      this.state.attackmode && !this.state.healingmode
                        ? () => {
                            this._thiscatattacked(
                              this.state.chatroomcats.cat2.catId
                            );
                            this.setState({
                              myattacknum: this.state.myattacknum - 1
                            });
                          }
                        : !this.state.attackmode && this.state.healingmode
                          ? () => {
                              this._thiscathealed(
                                this.state.chatroomcats.cat2.catId
                              );
                            }
                          : null
                    }
                  >
                    <Image
                      source={Images[this.state.chatroomcats.cat2.catId]}
                      style={{
                        marginTop: 8,
                        marginLeft: 10,
                        width: 50,
                        height: 50
                      }}
                    />
                  </TouchableOpacity>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.subtitle}>
                      ID : {this.state.chatroomcats.cat2.userId}
                    </Text>
                    <Text style={styles.subtitle}>
                      HP : {this.state.chatroomcats.cat2.hp} / 7
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={styles.waiting}>고양이를 기다리는 중..</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.lowercat}>
            <View
              style={
                this.state.mychatroomnum === "cat3" ? styles.mycat : styles.cat3
              }
            >
              {this.state.chatroomcats.cat3 ? (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    disabled={
                      this.state.mychatroomnum === "cat3" ||
                      (this.state.myattacknum <= 0 &&
                        this.state.chatroomcats[this.state.mychatroomnum].hp <=
                          0)
                        ? true
                        : this.state.attackmode || this.state.healingmode
                          ? false
                          : true
                    }
                    onPress={
                      this.state.attackmode && !this.state.healingmode
                        ? () => {
                            this._thiscatattacked(
                              this.state.chatroomcats.cat3.catId
                            );
                            this.setState({
                              myattacknum: this.state.myattacknum - 1
                            });
                          }
                        : !this.state.attackmode && this.state.healingmode
                          ? () => {
                              this._thiscathealed(
                                this.state.chatroomcats.cat3.catId
                              );
                            }
                          : null
                    }
                  >
                    <Image
                      source={Images[this.state.chatroomcats.cat3.catId]}
                      style={{
                        marginTop: 8,
                        marginLeft: 10,
                        width: 50,
                        height: 50
                      }}
                    />
                  </TouchableOpacity>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.subtitle}>
                      ID : {this.state.chatroomcats.cat3.userId}
                    </Text>
                    <Text style={styles.subtitle}>
                      HP : {this.state.chatroomcats.cat3.hp} / 7
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={styles.waiting}>고양이를 기다리는 중..</Text>
                </View>
              )}
            </View>
            <View
              style={
                this.state.mychatroomnum === "cat4" ? styles.mycat : styles.cat4
              }
            >
              {this.state.chatroomcats.cat4 ? (
                <View>
                  <TouchableOpacity
                    disabled={
                      this.state.mychatroomnum === "cat4" ||
                      (this.state.myattacknum <= 0 &&
                        this.state.chatroomcats[this.state.mychatroomnum].hp <=
                          0)
                        ? true
                        : this.state.attackmode || this.state.healingmode
                          ? false
                          : true
                    }
                    onPress={
                      this.state.attackmode && !this.state.healingmode
                        ? () => {
                            this._thiscatattacked(
                              this.state.chatroomcats.cat4.catId
                            );
                            this.setState({
                              myattacknum: this.state.myattacknum - 1
                            });
                          }
                        : !this.state.attackmode && this.state.healingmode
                          ? () => {
                              this._thiscathealed(
                                this.state.chatroomcats.cat4.catId
                              );
                            }
                          : null
                    }
                  >
                    <Image
                      source={Images[this.state.chatroomcats.cat4.catId]}
                      style={{
                        marginTop: 8,
                        marginLeft: 10,
                        width: 50,
                        height: 50
                      }}
                    />
                  </TouchableOpacity>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.subtitle}>
                      ID : {this.state.chatroomcats.cat4.userId}
                    </Text>
                    <Text style={styles.subtitle}>
                      HP : {this.state.chatroomcats.cat4.hp} / 7
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={styles.waiting}>고양이를 기다리는 중..</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        );
        {/* }}
        </Store.Consumer> */}
        <View style={styles.attackspace}>
          {this.state.myattacknum > 0 ? (
            this.state.attackmode ? (
              <View style={styles.attack}>
                <TouchableOpacity
                  disabled={this.state.attackmode ? false : true}
                  onPress={() => {
                    this.setState({ attackmode: false });
                    console.log("공격 모드");
                  }}
                >
                  <Image
                    source={require("../../assets/img/pawprint5.png")}
                    style={{
                      marginBottom: 1
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.subtitle}>
                  공 격 중 ( {this.state.myattacknum} / 5 )
                </Text>
              </View>
            ) : (
              <View style={styles.attack}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ attackmode: true, healingmode: false });
                    console.log("공격 모드 해제");
                  }}
                >
                  <Image
                    source={require("../../assets/img/pawprint4.png")}
                    style={{
                      marginBottom: 1
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.subtitle}>
                  공 격 력 ( {this.state.myattacknum} / 5 )
                </Text>
              </View>
            )
          ) : (
            <View style={styles.attack}>
              <Image
                source={require("../../assets/img/catcup.png")}
                style={{
                  marginBottom: 1
                }}
              />
              <Text style={styles.subtitle}>공 격 력 0</Text>
            </View>
          )}
          {/* ----------------------------- Healing Button ---------------------------------------- */}
          {this.state.chatroomcats.cat3.hp > 0 ? (
            this.state.healingmode ? (
              <View style={styles.attack}>
                <TouchableOpacity
                  disabled={this.state.healingmode ? false : true}
                  onPress={() => {
                    this.setState({ healingmode: false });
                    console.log("힐링 모드");
                  }}
                >
                  <Image
                    source={require("../../assets/img/catfood.png")}
                    style={{
                      marginBottom: 1
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.subtitle}>힐 ~ 링</Text>
              </View>
            ) : (
              <View style={styles.attack}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ healingmode: true, attackmode: false });
                    console.log("힐링 모드 해제");
                  }}
                >
                  <Image
                    source={require("../../assets/img/catfood2.png")}
                    style={{
                      marginBottom: 1
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.subtitle}>힐 ~ 러</Text>
              </View>
            )
          ) : (
            <View style={styles.attack}>
              <Image
                source={require("../../assets/img/plaster.png")}
                style={{
                  marginBottom: 1
                }}
              />
              <Text style={styles.subtitle}>H P 0</Text>
            </View>
          )}
          {/* </View> */}
        </View>
      </View>
    );
  }
  _thiscatattacked = catnum => {
    //this.socket.emit("", {});
  };
  _thiscathealed = catnum => {
    //this.socket.emit("", {});
  };
  _storeUser = userobj => {
    //console.log(userobj, "====================================");
    for (var i = 1; i <= 4; i++) {
      if (!this.state.chatroomcats.hasOwnProperty("cat" + i)) {
        this.state.chatroomcats["cat" + i] = userobj;
        return;
      }
    }
  };
  _deleteUser = leaveuser => {
    for (var key in this.state.chatroomcats) {
      if (this.state.chatroomcats[key]["userId"] === this.state.myuserid) {
        this.setState({
          mychatroomnum: key
        });
      }
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center"
  },
  state: {
    flex: 0.65,
    width: width * 0.96,
    //flexDirection: "column",
    //backgroundColor: "red",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10
  },
  attackspace: {
    flex: 0.4,
    //backgroundColor: "skyblue",
    width: width,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  uppercat: {
    flex: 1,
    //backgroundColor: "pink",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black"
  },
  attack: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    //backgroundColor: "red",
    flex: 1
  },
  lowercat: {
    flex: 1,
    //backgroundColor: "skyblue",
    flexDirection: "row"
  },
  cat1: {
    flex: 1,
    //backgroundColor: "red",
    flexDirection: "row",
    borderRightWidth: 1,
    borderRightColor: "black"
  },
  mycat: {
    flex: 1,
    backgroundColor: "pink",
    flexDirection: "row",
    borderRightWidth: 1,
    borderRightColor: "black",
    borderBottomLeftRadius: 10
  },
  cat2: {
    flex: 1,
    //backgroundColor: "blue",
    flexDirection: "row"
  },
  cat3: {
    flex: 1,
    //backgroundColor: "yellow",
    flexDirection: "row",
    borderRightWidth: 1,
    borderRightColor: "black"
  },
  cat4: {
    flex: 1,
    //backgroundColor: "green",
    flexDirection: "row"
  },
  subtitle: {
    color: "black",
    fontSize: 15,
    marginTop: 7,
    marginLeft: 10,
    fontWeight: "500",
    fontWeight: "bold",
    fontFamily: "Goyang"
    //marginBottom: 10
  },
  waiting: {
    color: "black",
    fontSize: 15,
    fontWeight: "500",
    fontWeight: "bold",
    marginLeft: 10,
    fontFamily: "Goyang"
    //marginBottom: 10
  }
});
