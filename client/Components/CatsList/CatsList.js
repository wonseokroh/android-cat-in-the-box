import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Vibration,
  TouchableWithoutFeedback,
  Animated
} from "react-native";
import Images from "../../assets/img/catindex";
import Store from "../store";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";

const { width } = Dimensions.get("window");

export default class CatsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muteornot: false,
      attackmode: false,
      healingmode: false,
      myattacknum: 5,
      animatePress: new Animated.Value(1)
    };
  }

  animateIn = () => {
    Animated.spring(this.state.animatePress, {
      toValue: 0.8
    }).start();
  };

  animateOut = () => {
    Animated.spring(this.state.animatePress, {
      toValue: 1,
      friction: 3,
      tension: 40
    }).start();
  };

  render() {
    return (
      <Store.Consumer>
        {store => {
          return (
            <View style={styles.container}>
              {!this.state.attackmode ? (
                <View style={{ flex: 0.15 }} />
              ) : this.state.myattacknum === 0 ? (
                <View style={{ flex: 0.15 }}>
                  <Text style={{ fontFamily: "Goyang", fontSize: 15 }}>
                    펀치할 힘이 없습니다.
                  </Text>
                </View>
              ) : (
                <View style={{ flex: 0.15 }}>
                  <Text style={{ fontFamily: "Goyang", fontSize: 15 }}>
                    고양이 얼굴을 펀치하세요
                  </Text>
                </View>
              )}
              <View style={styles.state}>
                {store.roomusers.map((item, i) => {
                  return (
                    <View key={i} style={styles.eachcat}>
                      <TouchableWithoutFeedback
                        onPressIn={() => this.animateIn()}
                        onPressOut={() => this.animateOut()}
                        disabled={
                          item.hp === 0
                            ? true
                            : !!(
                                this.props.myuserid === item.userId ||
                                this.state.myattacknum <= 0
                              )
                              ? // && (this.props.myuserid === item.userId && item.hp <= 0)
                                true
                              : !!(
                                  this.state.attackmode ||
                                  this.state.healingmode
                                )
                                ? false
                                : true
                        }
                        onPress={
                          !!(this.state.attackmode && !this.state.healingmode)
                            ? () => {
                                Vibration.vibrate(100);
                                console.log(item.userId);
                                store.socket.emit("hit", item.socketId);
                                this.setState({
                                  myattacknum: this.state.myattacknum - 1,
                                  changeImage: item.userId
                                });
                                setTimeout(() => {
                                  this.setState({
                                    changeImage: ""
                                  });
                                }, 200);
                              }
                            : !!(
                                !this.state.attackmode && this.state.healingmode
                              )
                              ? () => {
                                  console.log(item.userId);
                                }
                              : null
                        }
                      >
                        <View>
                          <Animated.View
                            style={[
                              {
                                transform: [
                                  {
                                    scale: this.state.animatePress
                                  }
                                ]
                              },
                              this.props.myuserid === item.userId
                                ? styles.mycatBorder
                                : styles.catBorder
                            ]}
                          >
                            <Image
                              source={
                                this.state.changeImage === item.userId
                                  ? Images["punch"]
                                  : item.hp === 0
                                    ? Images["mute"]
                                    : Images[item.catImage]
                              }
                              style={styles.catImage}
                            />
                          </Animated.View>
                        </View>
                      </TouchableWithoutFeedback>
                      <View style={{ flexDirection: "column" }}>
                        <Text style={styles.nickname}>{item.nickname}</Text>
                        {/* <Text style={styles.subtitle}>ID : {item.userId}</Text> */}
                        <View style={{ flexDirection: "row", marginTop: 3 }}>
                          <Text style={styles.subtitle}>HP : </Text>
                          <Image
                            source={Images["b" + (8 - item.hp)]}
                            style={{
                              //marginTop: 10,
                              width: 50,
                              height: 30
                            }}
                          />
                          <Text style={styles.subtitle}>{item.hp} / 7</Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
              <View style={styles.attackspace}>
                {!store.muteornot ? (
                  this.state.myattacknum > 0 ? (
                    this.state.attackmode ? (
                      <View style={styles.attackBtn}>
                        <AwesomeButtonRick
                          type="secondary"
                          backgroundDarker="#DA472F"
                          backgroundColor="#ef6f6f"
                          backgroundActive="#DA472F"
                          borderColor="#ef6f6f"
                          height={40}
                          onPress={() => {
                            this.setState({ attackmode: false });
                            console.log("공격 모드");
                          }}
                        >
                          <Text style={styles.punchtext}>
                            뚜 쉬 뚜 쉬 펀 치 중 ( {this.state.myattacknum} / 5
                            )
                          </Text>
                        </AwesomeButtonRick>
                      </View>
                    ) : (
                      <View style={styles.attackBtn}>
                        <AwesomeButtonRick
                          type="secondary"
                          backgroundDarker="#FFB511"
                          backgroundColor="#f4da6c"
                          backgroundActive="#FFB511"
                          borderColor="#f4da6c"
                          textColor="#ef6f6f"
                          height={40}
                          onPress={() => {
                            this.setState({
                              attackmode: true,
                              healingmode: false
                            });
                            console.log("공격 모드 해제");
                          }}
                        >
                          <Text style={styles.attacktext}>
                            냥 냥 펀 치 (click) ( {this.state.myattacknum} / 5 )
                          </Text>
                        </AwesomeButtonRick>
                      </View>
                    )
                  ) : (
                    <View style={styles.attackBtn}>
                      <AwesomeButtonRick
                        type="secondary"
                        disabled={true}
                        backgroundDarker="#968F8B"
                        backgroundColor="#e5dfdf"
                        borderColor="#e5dfdf"
                        height={40}
                      >
                        <Text style={styles.noenergytext}>공 격 력 0</Text>
                      </AwesomeButtonRick>
                    </View>
                  )
                ) : (
                  <View style={styles.attack}>
                    <Text>뮤트 시 공격 불가</Text>
                  </View>
                )}
              </View>
            </View>
          );
        }}
      </Store.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  state: {
    flex: 1,
    width: width * 0.99,
    flexDirection: "row",
    borderRadius: 10,
    flexWrap: "wrap"
  },
  attackspace: {
    flex: 0.25,
    width: width
    //backgroundColor: "#f4da6c"
  },
  eachcat: {
    width: "50%",
    height: "50%",
    // borderColor: "black",
    // borderWidth: 0.5,
    // borderRadius: 40,
    flexDirection: "row",
    alignItems: "center"
  },
  attacktext: {
    color: "#ef6f6f",
    fontSize: 15,
    fontFamily: "Goyang"
  },
  punchtext: {
    color: "white",
    fontSize: 15,
    fontFamily: "Goyang"
  },
  noenergytext: {
    color: "black",
    fontSize: 15,
    fontFamily: "Goyang"
  },
  subtitle: {
    color: "black",
    fontSize: 13,
    marginTop: 5,
    marginLeft: 1,
    fontFamily: "Goyang"
  },
  catImage: {
    // marginTop: 6,
    // marginLeft: 10,
    width: 50,
    height: 50,
    shadowColor: "black",
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3
  },
  catBorder: {
    borderColor: "#6dd3fe",
    borderRadius: 40,
    borderWidth: 5,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center"
  },
  mycatBorder: {
    borderColor: "#f4da6c",
    borderRadius: 40,
    borderWidth: 5,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center"
  },
  nickname: {
    color: "black",
    fontSize: 13,
    marginTop: 5,
    marginLeft: 2,
    fontWeight: "500",
    fontWeight: "bold"
    //fontFamily: "Goyang"
  },
  attack: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#f4da6c",
    borderColor: "#f4da6c",
    borderRadius: 40,
    borderWidth: 3,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 10
  },
  attackBtn: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 5
  }
});
