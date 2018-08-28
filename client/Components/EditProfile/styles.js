import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default (styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FCFCFC"
  },
  container: {
    flex: 1,
    width: width * 0.8,
    height: height * 0.8
  },
  title: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50
  },
  text: {
    fontFamily: "Goyang",
    fontSize: 30
  },
  catContainer: {
    flex: 0.7
  },
  cats: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "space-around"
  }
}));
