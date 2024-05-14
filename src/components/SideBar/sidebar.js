import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  BackAndroid,
  Alert,
  Dimensions,
  AsyncStorage
} from "react-native";
import { Container, Content, Text, Button, Icon } from "native-base";
const { Navigation } = require('react-native-navigation');
class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  async exitAccount() {
    await AsyncStorage.setItem("token", "");
      Navigation.push(this.props.componentId, {component: {name: 'navigation.behnab.Login'}});
  }
  exitApp = () => {
    Alert.alert(
      "خروج از حساب کاربری",
      "آیا واقعا می خواهید از حساب کاربری خود خارج شوید؟",
      [
        {
          text: "نه",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "بله",
          onPress: () => this.exitAccount()
        }
      ],
      {
        cancelable: false
      }
    );
    return true;
  };
  render() {
    return (
      <Container style={styles.SideBarStyle}>
        <Image
          source={require("../../img/logo.png")}
          style={{
            width: Dimensions.get("window").width * 0.6 * 0.6,
            height: Dimensions.get("window").width * 0.6 * 0.6,
            resizeMode: "contain",
            marginLeft: Dimensions.get("window").width * 0.2 * 0.6,
            alignSelf: "flex-start",
            marginTop: 20
          }}
          resizeMode="contain"
        />
        <Content
          style={{
            marginTop: 50,
            marginLeft: 5,
            paddingRight: 15
          }}
        >
          <Button
            full
            iconLeft
            transparent
            style={{
              justifyContent: "space-between"
            }}
            onPress={() => Navigation.push(this.props.componentId, {component: {name: 'navigation.behnab.Home'}})}
          >
            <Text style={[styles.ListItemTextStyle, styles.mainColor2]}>
              صفحه اصلی
            </Text>
            <Icon type="FontAwesome" name="home" style={styles.mainColor} />
          </Button>
          <Button
            full
            iconLeft
            transparent
            style={{
              justifyContent: "space-between"
            }}
            //onPress={() => Navigation.push(this.props.componentId, {component: {name: 'navigation.behnab.Profile'}})}
          >
            <Text style={[styles.ListItemTextStyle, styles.mainColor2]}>
              پروفایل
            </Text>
            <Icon type="FontAwesome" name="user" style={styles.mainColor} />
          </Button>
          <Button
            full
            iconLeft
            transparent
            style={{
              justifyContent: "space-between"
            }}
            //onPress={() => this.props.navigate("OrderHistory")}
          >
            <Text style={[styles.ListItemTextStyle, styles.mainColor2]}>
              آرشیو سفارشات
            </Text>
            <Icon type="FontAwesome" name="user" style={styles.mainColor} />
          </Button>
          <Button
            full
            iconLeft
            transparent
            style={{
              justifyContent: "space-between"
            }}
            //onPress={() => this.props.navigate("Gallery")}
          >
            <Text style={[styles.ListItemTextStyle, styles.mainColor2]}>
              گالری تصاویر
            </Text>
            <Icon type="FontAwesome" name="user" style={styles.mainColor} />
          </Button>
          <Button
            full
            iconLeft
            transparent
            style={{
              justifyContent: "space-between"
            }}
            //onPress={() => this.props.navigate("AboutUs")}
          >
            <Text style={[styles.ListItemTextStyle, styles.mainColor2]}>
              درباره ما
            </Text>
            <Icon type="FontAwesome" name="user" style={styles.mainColor} />
          </Button>
          <Button
            full
            iconLeft
            transparent
            style={{
              justifyContent: "space-between"
            }}
            //onPress={() => this.props.navigate("ContactUs")}
          >
            <Text style={[styles.ListItemTextStyle, styles.mainColor2]}>
              ارتباط با ما
            </Text>
            <Icon type="FontAwesome" name="user" style={styles.mainColor} />
          </Button>
          <Button
            full
            iconLeft
            transparent
            style={{
              justifyContent: "space-between"
            }}
            onPress={() => this.exitApp()}
          >
            <Text style={[styles.ListItemTextStyle, styles.mainColor2]}>
              خروج از حساب کاربری
            </Text>
            <Icon type="FontAwesome" name="user" style={styles.mainColor} />
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  SideBarStyle: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: "IRANSans(FaNum)"
  },
  ListItemTextStyle: {
    color: "#424242",
    alignSelf: "center",
    fontFamily: "IRANSans(FaNum)"
  },
  noPaddingLeft: {
    paddingLeft: 0
  },
  mainColor: {
    color: "#bed73c"
  },
  mainColor2: {
    color: "#01a4c5"
  }
});

export { Sidebar };
