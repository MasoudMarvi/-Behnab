import React, { Component } from "react";
import { Navigation } from "react-native-navigation";

import {
  Image,View,AsyncStorage,ImageBackground,Alert,Text} from "react-native";
import styles from "../../StyleSheet.js";
class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSplash: true,
      hasToken: false
    };
  }
  componentDidMount() {
    this.checkLogin();
  }
  navigate() {
      let page = "Login";
      if (this.state.hasToken === true) {
          page = "Home";
      } else {
          page = "Login";
      }
      setTimeout(() => {
        // this.props.navigation.navigate(page);
          let name = 'navigation.behnab.' + page;
          Navigation.push(this.props.componentId, {
              component: {
                  name: name,
              }
          });
      }, 3000);
  };
  async checkLogin() {
    try {
      let ft = await AsyncStorage.getItem("firstTime");
      let firstTime = ft == null || ft === "" || ft === "true";
      let tk = await AsyncStorage.getItem("token");
      let token = tk === null ? "" : tk;
      // await AsyncStorage.setItem('firstTime', 'false');
      if (firstTime === true) {
        this.setState({ showSplash: true });
      } else {
        if (token === "") {
          this.setState({ hasToken: false });
        } else {
          this.setState({ hasToken: true });
        }
        this.setState({ showSplash: false });
      }
    } catch (error) {}
    this.navigate();
  }
  render() {
    return (
      <ImageBackground
        source={require("../../img/background-01.png")}
        style={[styles.imageSplash]}
      >
        <View style={[styles.welcomeScreen, styles.borderLayout]}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image style={styles.logo1} source={require("../../img/logo.png")} />
            <Text style={{ fontFamily: "IRANSans(FaNum)_Bold", fontSize: 20 }}>
              به سامانه بهناب خوش آمدید
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
export { Welcome };
